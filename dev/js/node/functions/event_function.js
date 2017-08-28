let Event = require('../db/models/event.js')
let User = require('../db/models/user.js')
let TA = require('../db/models/pasangan_ta.js')
let KP = require('../db/models/pasangan_kp.js')
let Room = require('../db/models/ruangan.js')
let Anggota = require('../db/models/anggota_pasangan_event.js')
let axios = require('axios')
let Promise = require('bluebird')
let knex = require('../db/models/db.js')
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
		return axios.post('http://localhost:5000/events', request_param)
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

		pre.data.listStudent[i].idPenguji = []
		length = pasangan[i].penguji? pasangan[i].penguji.length: 0  
		for(var j=0; j<length; j++){
			pre.data.listStudent[i].idPenguji.push(
				pasangan[i].penguji[j].user_id
			)
		}

		if(event_type == 1){
			pre.data.listStudent[i].id = pasangan[i].mahasiswa.id
		}

		if(event_type == 2){
			pre.data.listStudent[i].id = pasangan[i].mahasiswa[0].user_id
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
	return axios.post('http://localhost:5000/schedule', body)
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
			if(pasangan[i].mahasiswa.id == id_mahasiswa){
				return pasangan[i]
			}
		}
	}
	else if(tipe_pasangan == 2){
		pasangan = pasangan.toJSON()
		for(var i=0; i<pasangan.length; i++){
			if(pasangan[i].mahasiswa[0].user_id == id_mahasiswa){
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
		temp.tipe_event = event_type

		if(event_type == 1){
			temp.title = ("Event "+additionalInfo.mahasiswa.nama)
		}

		if(event_type == 2){
			temp.title = ("Event "+additionalInfo.mahasiswa[0].user.nama)
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
		if(event_type == 1){
			pasangan = await TA.model.where('id','IN', pasangans).fetchAll({withRelated: ['pembimbing', 'penguji', 'mahasiswa']})
			rooms = await Room.model.fetchAll({withRelated: 'event'})
		}

		if(event_type == 2){
			pasangan = await KP.model.where('id','IN', pasangans).fetchAll({withRelated: ['pembimbing', 'mahasiswa.user']})
			rooms = await Room.model.fetchAll({withRelated: 'event'})
		}

		//getRaw
		console.log("collecting calendar data================")
		events = await GetRawEvent(start, end)

		//process event for scheduling
		events = RawEventToPre(events.data.result, start, end)
		events = PreEventToReady(events, rooms, pasangan, event_type)

		//request scheduling
		console.log("scheduling===================")
		events = await RequestScheduling(events)

		//delete events
		await knex.emptyTable('event')

		//save events
		console.log("saving schedule===================")
		var temp = FormatForSave(events.data.result, event_type, pasangan)
		console.log(temp)
		await NewEvent(temp, events.data.result)
		//await NewAnggotaEvent(events.data.result)
		console.log("done===================")

		let preResult = await Event.model.fetchAll({withRelated: ['dosen.user', 'mahasiswa.user']})
		preResult = preResult.toJSON()

		//return event
		var result = []

		for(var i=0; i<temp.length; i++){
			result.push({
				"idEvent": preResult[i].event_id,
				"title": preResult[i].title,
				"id": preResult[i].i,
				"topik": preResult[i].topik,
				"room": preResult[i].room_id,
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
	return Event.model.fetchAll({withRelated:['mahasiswa.user', 'dosen.user']})
}//===============================================================================
var FetchEventMahasiswa = function(id){
	return Event.model.fetchAll({withRelated:['mahasiswa.user', 'dosen.user']}).then(function(result){
		result = result.toJSON()
		let events = []

		for(var i=0; i<result.length; i++){
			for(var j=0; j<result[i].mahasiswa.length; j++){
				if(result[i].mahasiswa[j].id == id){
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

		var result = await FetchEventMahasiswa(49)
		console.log(JSON.stringify(result))

		return

		var newStuff = {
			event_id: 'yyyyyy',
			tipe_event: 1,
			pasangan_id: 13,
			topik: 'everyday BRO',
			room_id: 3,
		}

		console.log("ScheduleEvent=========")
		ScheduleEvent(2, "2017-08-08T00:00:00+07:00", "2017-10-10T23:59:59+07:00", [1])
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
// test()

module.exports = {
  DeleteEvent, 
  NewEvent,
  FetchTAEvent,
  FetchKPEvent,
  ScheduleEvent,
  FetchEvent,
  FetchEventMahasiswa
}