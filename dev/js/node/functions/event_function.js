let Event = require('../db/models/event.js')
let User = require('../db/models/user.js')
let TA = require('../db/models/pasangan_ta.js')
let KP = require('../db/models/pasangan_kp.js')
let Room = require('../db/models/ruangan.js')
let Anggota = require('../db/models/anggota_pasangan_event.js')
let axios = require('axios')
let Promise = require('bluebird')
let knex = require('../db/models/db.js')
let schedulerURL = require('../config.js')
let moment = require('moment')

let shared_email = 'ruang.labtek5@gmail.com'
let shared_token = '1/QPHqu2Xu2VSvUZVoQXc8F9BMC6F7eAqEzROWIyfphyQ'
//===============================================================================
var GetRawEvent = function(start, end){
	return User.model.fetchAll().then(function(result){
		result = result.toJSON()

		var request_param = {
			"data":{
				"period":{
					"start":start,
					"end":end
				},
				"accounts":[]
			}
		}

		for(var i=0; i<result.length; i++){
			request_param.data.accounts.push({
				"email": result[i].id,
				"refreshToken": result[i].token,
				"calendarList": ['primary']
			})
		}
		
		//request to python
		return axios.post(schedulerURL+'/events', request_param)
		.catch(function (error) {
			console.log(error);
			return error
		});
	}).catch(function(error){
		return error
	})
}	
//===============================================================================
var PreEventToReady = function(pre, rooms, pasangan, event_type){
	pasangan = pasangan.toJSON()
	rooms = rooms.toJSON()
	var length

	pre.data.listStudent = []
	for(var i=0; i<pasangan.length; i++){
		pre.data.listStudent.push({})

		pre.data.listStudent[i].idPembimbing = []
		length = pasangan[i].pembimbing? pasangan[i].pembimbing.length: 0  
		for(var j=0; j<length; j++){
			pre.data.listStudent[i].idPembimbing.push(
				pasangan[i].pembimbing[j].user_id
			)	
		}

		length = pasangan[i].akhir? pasangan[i].akhir.length: 0  
		for(var j=0; j<length; j++){
			pre.data.listStudent[i].idPembimbing.push(
				pasangan[i].akhir[j].user_id
			)	
		}

		pre.data.listStudent[i].idPenguji = []
		length = pasangan[i].penguji? pasangan[i].penguji.length: 0  
		for(var j=0; j<length; j++){
			pre.data.listStudent[i].idPenguji.push(
				pasangan[i].penguji[j].user_id
			)
		}

		if(event_type == 1){
			pre.data.listStudent[i].id = pasangan[i].mahasiswa[0].user_id
		}

		if(event_type == 2 || event_type == 3 || event_type == 4 ){
			pre.data.listStudent[i].id = pasangan[i].mahasiswa.id
		}
		
	}

	pre.data.listRoom = []
	for(var i=0; i<rooms.length; i++){
		pre.data.listRoom.push({})
		pre.data.listRoom[i].id = rooms[i].id

		pre.data.listRoom[i].events = []
		for(var j=0; j<rooms[i].event.length; j++){

			pre.data.listRoom[i].events.push({
				"start": rooms[i].event[j].start,
				"end": rooms[i].event[j].end
			})
		}
		
	}


	return pre
}
//===============================================================================
var RawEventToPre = function(raw, start, end){
	var temp = {
		"data":{
			listLecturer: [],
			period:{}
		}
	}

	for(var i=0; i<raw.length; i++){
		temp.data.listLecturer.push({
			"id": raw[i].email,
			"events": raw[i].events
		})
	}

	temp.data.period.start = start
	temp.data.period.end = end

	return temp
}
//===============================================================================
var RequestScheduling = function(body){
	return axios.post(schedulerURL+'/schedule', body)
	.catch(function (error) {
		console.log(error);
		return error
	});
}
//===============================================================================
var GetPasanganFromMahasiswa = function(tipe_pasangan, id_mahasiswa, pasangan){
	if(tipe_pasangan == 1){
		pasangan = pasangan.toJSON()
		for(var i=0; i<pasangan.length; i++){
			if(pasangan[i].mahasiswa[0].user_id == id_mahasiswa){
				return pasangan[i]
			}
		}
	}
	else if(tipe_pasangan == 2 || tipe_pasangan == 3 || tipe_pasangan == 4 ){
		pasangan = pasangan.toJSON()
		for(var i=0; i<pasangan.length; i++){
			if(pasangan[i].mahasiswa.id == id_mahasiswa){
				return pasangan[i]
			}
		}
	}

	return 0
}
//===============================================================================
var FormatForSave = function(events, event_type, pasangan){
	var result = []
	for(var i=0; i<events.length; i++){
		var additionalInfo = GetPasanganFromMahasiswa(event_type, events[i].idStudent, pasangan)
		var temp = {}
		temp.event_id = i
		temp.tipe_event = 99

		if(event_type == 1){
			temp.title = ("Seminar KP "+additionalInfo.mahasiswa[0].user.nama)
		} else
		if(event_type == 2){
			temp.title = ("Seminar TA1 "+additionalInfo.mahasiswa.nama)
		} else
		if(event_type == 3){
			temp.title = ("Seminar TA2 "+additionalInfo.mahasiswa.nama)
		} else
		if(event_type == 4){
			temp.title = ("Sidang Akhir "+additionalInfo.mahasiswa.nama)
		}
			
		temp.topik = additionalInfo.topik
		temp.room_id = events[i].idRoom
		temp.start = events[i].start
		temp.end = events[i].end

		result.push(temp)
	}

	return result
}
//===============================================================================
var ScheduleEvent = async function(event_type, start, end, pasangans){
	try{
		var pasangan
		var events
		var rooms

		//fetch pasangan
		console.log("preparing to schedule================")
		//KP
		if(event_type == 1){
			pasangan = await KP.model.where('id','IN', pasangans).fetchAll({withRelated: ['pembimbing', 'mahasiswa.user']})
			rooms = await Room.model.fetchAll({withRelated: 'event'})
		}

		//seminar TA-I
		if(event_type == 2){
			pasangan = await TA.model.where('id','IN', pasangans).fetchAll({withRelated: ['pembimbing', 'penguji', 'mahasiswa']})
			rooms = await Room.model.fetchAll({withRelated: 'event'})
		}

		//seminar TA-II
		if(event_type == 3){
			pasangan = await TA.model.where('id','IN', pasangans).fetchAll({withRelated: ['pembimbing', 'mahasiswa']})
			rooms = await Room.model.fetchAll({withRelated: 'event'})
		}

		//sidang TA
		if(event_type == 4){
			pasangan = await TA.model.where('id','IN', pasangans).fetchAll({withRelated: ['pembimbing', 'akhir', 'mahasiswa']})
			rooms = await Room.model.fetchAll({withRelated: 'event'})
		}

		await TA.model.where('id','IN', pasangans).save({status_penjadwalan: 0},{patch: true})

		//getRaw
		console.log("collecting calendar data================")
		events = await GetRawEvent(start, end)

		//process event for scheduling
		events = RawEventToPre(events.data.result, start, end)
		events = PreEventToReady(events, rooms, pasangan, event_type)

		//request scheduling
		console.log("scheduling===================")
		console.log("events to schedule:", JSON.stringify(events));
		events = await RequestScheduling(events)

		//delete events
		await Event.model.where('tipe_event', 99).destroy()

		//save events
		console.log("saving schedule===================")
		console.log("Event log:", events.data.log);
		var temp = FormatForSave(events.data.result, event_type, pasangan)
		await NewEvent(temp, events.data.result)
		//await NewAnggotaEvent(events.data.result)
		console.log("done===================")

		let preResult = await Event.model.where({"tipe_event": 99}).fetchAll({withRelated: ['dosen.user', 'mahasiswa.user', 'ruangan']})
		preResult = preResult.toJSON()

		console.log("events====================")
		console.log(events.data.result)
		console.log("temp====================")
		console.log(temp)
		console.log("preResult====================")
		console.log(preResult)

		//return event
		var result = []

		for(var i=0; i<temp.length; i++){
			result.push({
				"idEvent": preResult[i].event_id,
				"title": preResult[i].title,
				"id": preResult[i].i,
				"topik": preResult[i].topik,
				"room_id": preResult[i].ruangan.id,
				"ruangan": preResult[i].ruangan,
				"start": preResult[i].start,
				"end": preResult[i].end,
				"anggota": preResult[i].mahasiswa,
				"dosen": preResult[i].dosen
			})
		}

		result = {"events": result}
		console.log(result)
		return result
	}
	catch(err){
		console.log(err)
	}
}
//===============================================================================
var FinalizeEvent = async function(events, event_type){
	try{
		//bikin record kosong
		await Event.model.where('tipe_event', 99).destroy()

		//format json
		let objs = []
		let anggotas = []
		for(var i=0; i<events.length; i++){
			objs.push({
				"event_id": events[i].idEvent,
				"tipe_event": event_type,
				"topik": events[i].topik,
				"title": events[i].title,
				"room_id": events[i].room_id,
				"start": new Date(events[i].start),
				"end": new Date(events[i].end)
			})

			anggotas.push({
				idStudent: [],
				idPembimbing: [],
				idPenguji: []
			})

			//dosen
			for(var j=0; j<events[i].dosen.length; j++){
				if(events[i].dosen[j].peran_pasangan == 1){
					anggotas[i].idPembimbing.push(events[i].dosen[j].user_id)
				}
				else if(events[i].dosen[j].peran_pasangan == 2){
					anggotas[i].idPenguji.push(events[i].dosen[j].user_id)
				}
			}

			//mahasiswa
			for(var j=0; j<events[i].anggota.length; j++){
				anggotas[i].idStudent.push(events[i].anggota[j].user_id)
			}
		}


		//insert new record
		var task = []
		let gloi = 0 //index for promise insert event

		for(var i=0; i<objs.length; i++){
			task.push(new Event.model(objs[i]).save().then(function(result){
				var id = result.get('id')
				//masukin mahasiswa
				task.push(new Anggota.model({
					"user_id": anggotas[gloi].idStudent,
					"peran_pasangan": 0,
					"pasangan_id": id
				}).save())

				//masukin pembimbing
				for(var j=0; j<anggotas[gloi].idPembimbing.length; j++){
					task.push(new Anggota.model({
						"user_id": anggotas[gloi].idPembimbing[j],
						"peran_pasangan": 1,
						"pasangan_id": id
					}).save())
				}

				//masukin penguji
				for(var j=0; j<anggotas[gloi].idPenguji.length; j++){

					task.push(new Anggota.model({
						"user_id": anggotas[gloi].idPenguji[j],
						"peran_pasangan": 2,
						"pasangan_id": id
					}).save())
				}

				gloi++

			}))

			//ubah status
			
			if(event_type == 1){
				await KP.model.where({'status_penjadwalan': 0}).save({status_penjadwalan: event_type},{method: 'update', patch: true}).catch(function(err){

				})
				
			}
			else{
				await TA.model.where({'status_penjadwalan': 0}).save({status_penjadwalan: event_type},{method: 'update', patch: true}).catch(function(err){
					
				})
			}
			
		}

		NotifyEvent(event_type, shared_email, shared_token)
		
		
		
	}catch(err){
		console.log(err)
	}
	

	return Promise.each(task, function(){})
}

//===============================================================================
var OverwriteEvent = async function(events){
	try{
		await knex.emptyTable('event')
		console.log("events", JSON.stringify(events))
		console.log(moment(events[0].start).toString())
		//format json
		let objs = []
		let anggotas = []
		for(var i=0; i<events.length; i++){
			objs.push({
				"event_id": i,
				"tipe_event": events[i].tipe_event,
				"topik": events[i].topik,
				"title": events[i].title,
				"room_id": events[i].ruangan.id,
				"start": moment(new Date(events[i].start)).format("YYYY-MM-DD HH:mm:ss"),
				"end": moment(new Date(events[i].end)).format("YYYY-MM-DD HH:mm:ss")
			})

			anggotas.push({
				idStudent: [],
				idPembimbing: [],
				idPenguji: []
			})

			//dosen
			for(var j=0; j<events[i].dosen.length; j++){
				if(events[i].dosen[j].peran_pasangan == 1){
					anggotas[i].idPembimbing.push(events[i].dosen[j].user_id)
				}
				else if(events[i].dosen[j].peran_pasangan == 2){
					anggotas[i].idPenguji.push(events[i].dosen[j].user_id)
				}
			}

			//mahasiswa
			for(var j=0; j<events[i].mahasiswa.length; j++){
				anggotas[i].idStudent.push(events[i].mahasiswa[j].user.id)
			}
		}

		//insert new record
		var task = []
		let gloi = 0 //index for promise insert event

		for(var i=0; i<objs.length; i++){
			task.push(new Event.model(objs[i]).save().then(function(result){
				var id = result.get('id')
				//masukin mahasiswa
				task.push(new Anggota.model({
					"user_id": anggotas[gloi].idStudent,
					"peran_pasangan": 0,
					"pasangan_id": id
				}).save())

				//masukin pembimbing
				for(var j=0; j<anggotas[gloi].idPembimbing.length; j++){
					task.push(new Anggota.model({
						"user_id": anggotas[gloi].idPembimbing[j],
						"peran_pasangan": 1,
						"pasangan_id": id
					}).save())
				}

				//masukin penguji
				for(var j=0; j<anggotas[gloi].idPenguji.length; j++){

					task.push(new Anggota.model({
						"user_id": anggotas[gloi].idPenguji[j],
						"peran_pasangan": 2,
						"pasangan_id": id
					}).save())
				}

			}))
		}
	}catch(err){
		console.log(err)
	}

	return Promise.each(task, function(){})
}
//===============================================================================
var NotifyEvent = async function(event_type, shared_email, shared_token){
	try{
		let events = await Event.model.where("tipe_event", event_type ).fetchAll({withRelated: ['mahasiswa.user', 'dosen.user']})
		events = events.toJSON();
		console.log("event to notif ", JSON.stringify(events));
		let notifRequest = {
			data: []
		}

		for(var i=0; i<events.length; i++){
			let accounts = []

			accounts.push({
				email: shared_email,
				refreshToken: shared_token
			})
			
			//notif dosen
			let tempEmail = "";
			let tempToken = "";
			for (var j=0; j<events[i].dosen.length; j++) {
				tempEmail = events[i].dosen[j].user.email;
				tempToken = events[i].dosen[j].user.token;
				if ( tempEmail!= "" && tempToken !="") {
					accounts.push({
						email: tempEmail,
						refreshToken: tempToken,
					})
				}
			}

			//notif mahasiswa
			tempEmail = events[i].mahasiswa[0].user.email;
			tempToken = events[i].mahasiswa[0].user.token;
			if ( tempEmail!= "" && tempToken !="") {
				accounts.push({
					email: tempEmail,
					refreshToken: tempToken,
				})
			}

			notifRequest.data.push({
				period:{
					start: events[i].start,
					end: events[i].end,
					name: events[i].title
				},
				accounts: accounts
			})
		}
		

		console.log("notifRequest ", JSON.stringify(notifRequest));
		axios.post(schedulerURL+'/events/create', notifRequest)
		.catch(function (error) {
			console.log(error);
			return error
		});

	}
	catch(err){
		console.log(err)
	}
}

//===============================================================================
var DeleteEvent = async function(id){
	try{
		var task = []

		//delete pasangan ta
		task.push(new Event.model({"id": id}).destroy())
		
		
	}catch(err){
		console.log(err)
	}
	

	return Promise.each(task, function(){})
}
//===============================================================================
var NewEvent = async function(objs, anggotas){
	try{
		//bikin record kosong
		var task = []
		let gloi = 0 //index for promise insert event

		for(var i=0; i<objs.length; i++){
			task.push(new Event.model(objs[i]).save().then(function(result){
				var id = result.get('id')
				//masukin mahasiswa
				task.push(new Anggota.model({
					"user_id": anggotas[gloi].idStudent,
					"peran_pasangan": 0,
					"pasangan_id": id
				}).save())

				//masukin pembimbing
				for(var j=0; j<anggotas[gloi].idPembimbing.length; j++){
					task.push(new Anggota.model({
						"user_id": anggotas[gloi].idPembimbing[j],
						"peran_pasangan": 1,
						"pasangan_id": id
					}).save())
				}

				//masukin pembimbing
				for(var j=0; j<anggotas[gloi].idPenguji.length; j++){
					task.push(new Anggota.model({
						"user_id": anggotas[gloi].idPenguji[j],
						"peran_pasangan": 2,
						"pasangan_id": id
					}).save())
				}

				gloi++

			}))
		}
		
		
		
	}catch(err){
		console.log(err)
	}
	

	return Promise.each(task, function(){})
}
//===============================================================================
var NewAnggotaEvent = function(objs){
	try{
		console.log(objs)

		//bikin record kosong
		var task = []

		for(var i=0; i<objs.length; i++){
			//masukin mahasiswa
			task.push(new Anggota.model({
				"user_id": objs[i].idStudent,
				"peran_pasangan": 0,
				"pasangan_id": i+1
			}).save())

			//masukin pembimbing
			for(var j=0; j<objs[i].idPembimbing.length; j++){
				task.push(new Anggota.model({
					"user_id": objs[i].idPembimbing[j],
					"peran_pasangan": 1,
					"pasangan_id": i+1
				}).save())
			}

			//masukin pembimbing
			for(var j=0; j<objs[i].idPenguji.length; j++){
				task.push(new Anggota.model({
					"user_id": objs[i].idPenguji[j],
					"peran_pasangan": 2,
					"pasangan_id": i+1
				}).save())
			}
		}
		
		
		
	}catch(err){
		console.log(err)
	}
	

	return Promise.each(task, function(){})
}
//===============================================================================
var FetchTAEvent = function(){
	return Event.model.fetchAll({withRelated:['kelompok_TA.anggota.user', 'kelompok_TA.mahasiswa']})
}
//===============================================================================
var FetchKPEvent = function(){
	return Event.model.fetchAll({withRelated:['kelompok_KP.anggota.user']})
}
//===============================================================================
var FetchEvent = function(){
	return Event.model.fetchAll({withRelated:['mahasiswa.user', 'dosen.user', 'ruangan']})
}//===============================================================================
var FetchEventMahasiswa = function(id){
	return Event.model.fetchAll({withRelated:['mahasiswa.user', 'dosen.user']}).then(function(result){
		result = result.toJSON()
		let events = []

		for(var i=0; i<result.length; i++){
			for(var j=0; j<result[i].mahasiswa.length; j++){
				if(result[i].mahasiswa[j].user.id == id){
					events.push(result[i])
				}
			}	
		}

		return events
	})
}
//===============================================================================
var FormatEvent = function(events){
	var formatted = []

	for(var i=0; i<events.length; i++){
		formatted[i] = {
			idEvent: events[i].event_id,
			title: events[i].title,
			id: events[i].id,
			topik: events[i].topik,
			room: events[i].room_id,
			start: events[i].start,
			end: events[i].end
		}

		formatted[i].anggota = [] //list mahasiswa
		formatted[i].dosen = [] //list dosen

		if(events[i].kelompok_KP){
			for(var j=0; j<events[i].kelompok_KP.anggota.length; j++ ){
				//masukin dosen
				if(events[i].kelompok_KP.anggota[j].peran_pasangan == 1){
					formatted[i].dosen.push(events[i].kelompok_KP.anggota[j].user)
				}
			}

			//masukin mahasiswa
			formatted[i].anggota.push(events[i].kelompok_KP.mahasiswa)
		}

		if(events[i].kelompok_TA){
			for(var j=0; j<events[i].kelompok_TA.anggota.length; j++ ){
				//masukin mahasiswa
				if(events[i].kelompok_TA.anggota[j].peran_pasangan == 0){
					formatted[i].anggota.push(events[i].kelompok_TA.anggota[j].user)
				}
				
				//masukin dosen
				if(events[i].kelompok_TA.anggota[j].peran_pasangan == 1){
					formatted[i].dosen.push(events[i].kelompok_TA.anggota[j].user)
				}
			}
		}
		
	}

	return formatted
}
//===============================================================================
var test = async function(){
	try{

		var newStuff = {
			event_id: 'yyyyyy',
			tipe_event: 1,
			pasangan_id: 13,
			topik: 'everyday BRO',
			room_id: 3,
		}

		let testJSON = 
[
  {
    "idEvent": "0",
    "title": "Event mahasiswa1",
    "topik": "If we parse the protocol, we can get to the COM feed through the solid state AI bus!",
    "room": 1,
    "start": "2017-08-28T09:22:28.000Z",
    "end": "2017-08-28T10:02:28.000Z",
    tipe_event: 1,
    "anggota": [
      {
        "id": 41,
        "user_id": 8,
        "peran_pasangan": 0,
        "created_at": "2017-08-28T14:22:48.000Z",
        "updated_at": "2017-08-28T14:22:48.000Z",
        "pasangan_id": 21,
        "user": {
          "id": 8,
          "nama": "mahasiswa1",
          "email": "",
          "token": null,
          "peran": 0,
          "NIM": "435-799-2642",
          "created_at": null,
          "updated_at": null,
          "status_kalender": null
        }
      }
    ],
    "dosen": [
      {
        "id": 42,
        "user_id": 2,
        "peran_pasangan": 1,
        "created_at": "2017-08-28T14:22:48.000Z",
        "updated_at": "2017-08-28T14:22:48.000Z",
        "pasangan_id": 21,
        "user": {
          "id": 2,
          "nama": "dosen2",
          "email": "hasnurk@gmail.com",
          "token": "1\/wHT6b6vzDptKG3RpYgJS0IRWjPI1vdyGBVp3Y37ALgQ",
          "peran": 1,
          "NIM": "273-364-2661",
          "created_at": null,
          "updated_at": "2017-08-28T13:47:44.000Z",
          "status_kalender": null
        }
      }
    ]
  },
  {
    "idEvent": "1",
    "title": "Event mahasiswa2",
    "topik": "Try to back up the HTTP sensor, maybe it will synthesize the 1080p firewall!",
    "room": 2,
    "start": "2017-08-28T10:02:28.000Z",
    "end": "2017-08-28T10:42:28.000Z",
    tipe_event: 2,
    "anggota": [
      {
        "id": 45,
        "user_id": 7,
        "peran_pasangan": 0,
        "created_at": "2017-08-28T14:22:48.000Z",
        "updated_at": "2017-08-28T14:22:48.000Z",
        "pasangan_id": 22,
        "user": {
          "id": 7,
          "nama": "dosen7",
          "email": "bimawansatrianto@gmail.com",
          "token": "1\/1_CATwHqO4ef8OtemdVy_R-B9LjjGejRLpLZCuwRcwk",
          "peran": 1,
          "NIM": "616-259-6389",
          "created_at": null,
          "updated_at": "2017-08-28T13:53:43.000Z",
          "status_kalender": null
        }
      }
    ],
    "dosen": [
      {
        "id": 46,
        "user_id": 1,
        "peran_pasangan": 1,
        "created_at": "2017-08-28T14:22:48.000Z",
        "updated_at": "2017-08-28T14:22:48.000Z",
        "pasangan_id": 22,
        "user": {
          "id": 1,
          "nama": "dosen1",
          "email": "imathenoor@gmail.com",
          "token": "1\/L8SlUq5jfDvdkkXaa-9KYoGNiCnF_9YiaRQurYQ0smU",
          "peran": 1,
          "NIM": "181-193-9416",
          "created_at": null,
          "updated_at": "2017-08-28T13:56:14.000Z",
          "status_kalender": null
        }
      }
    ]
  },
  {
    "idEvent": "2",
    "title": "Event dosen7",
    "topik": "You can't reboot the capacitor without copying the multi-byte SDD monitor!",
    "room": 1,
    "start": "2017-08-28T14:02:28.000Z",
    "end": "2017-08-28T14:42:28.000Z",
    tipe_event: 3,
    "anggota": [
      {
        "id": 43,
        "user_id": 9,
        "peran_pasangan": 0,
        "created_at": "2017-08-28T14:22:48.000Z",
        "updated_at": "2017-08-28T14:22:48.000Z",
        "pasangan_id": 23,
        "user": {
          "id": 9,
          "nama": "mahasiswa2",
          "email": "",
          "token": null,
          "peran": 0,
          "NIM": "846-066-4078",
          "created_at": null,
          "updated_at": null,
          "status_kalender": null
        }
      }
    ],
    "dosen": [
      {
        "id": 44,
        "user_id": 3,
        "peran_pasangan": 1,
        "created_at": "2017-08-28T14:22:48.000Z",
        "updated_at": "2017-08-28T14:22:48.000Z",
        "pasangan_id": 23,
        "user": {
          "id": 3,
          "nama": "dosen3",
          "email": "13514106@std.stei.itb.ac.id",
          "token": "1\/RZ4jXAx5rGIuINunnyiJBAM9q8rfqudDgE7kEeQ2Njg",
          "peran": 1,
          "NIM": "556-331-2419",
          "created_at": null,
          "updated_at": "2017-08-28T13:49:14.000Z",
          "status_kalender": null
        }
      }
    ]
  }
]
		console.log("start")
		await OverwriteEvent(testJSON)
		console.log("done")
		return


		console.log("ScheduleEvent=========")
		ScheduleEvent(1, "2017-08-08T00:00:00+07:00", "2017-10-10T23:59:59+07:00", [1])
		return
		console.log("GETEVENT=========")
		GetRawEvent("2017-08-08T00:00:00+07:00", "2017-10-10T23:59:59+07:00")
	
		console.log("FETCH=========")
		var result = await FetchTAEvent()
		console.log(result.toJSON())
		console.log("===============================")
		console.log(JSON.stringify(FormatEvent(result.toJSON())))
		


	}catch(err){
		console.log(err)
	}
}
//===============================================================================
//main program
//test()

module.exports = {
  DeleteEvent, 
  NewEvent,
  FetchTAEvent,
  FetchKPEvent,
  ScheduleEvent,
  FetchEvent,
  FetchEventMahasiswa,
  FinalizeEvent,
  OverwriteEvent
}
