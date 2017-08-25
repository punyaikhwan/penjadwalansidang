let Event = require('../db/models/event.js')
let User = require('../db/models/user.js')
let TA = require('../db/models/pasangan_ta.js')
let KP = require('../db/models/pasangan_kp.js')
let axios = require('axios')
let Promise = require('bluebird')
//===============================================================================
var GetRawEvent = function(start, end){
	return User.model.fetchAll().then(function(result){
		result = result.toJSON()
		console.log(result)

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
				"email": result[i].email,
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
var PreEventToReady = function(pre, rooms, pasangan){
	console.log("pre==============================================")
	console.log(JSON.stringify(pre))
	console.log("rooms==============================================")
	console.log(JSON.stringify(rooms))
	console.log("pasangan==============================================")
	console.log(JSON.stringify(pasangan))

	pre.listStudent = []
	for(var i=0; i<pasangan.length; i++){
		pre.listStudent.push({})
		pre.listStudent[i].idPembimbing = []
		pre.listStudent[i].idPembimbing.push({
			
		})
		pre.listStudent[i].idPenguji = []
		pre.listStudent[i].idPenguji.push({
			
		})
		pre.listStudent[i].id = 
	}

	pre.listRoom = []
	for(var i=0; i<rooms.length; i++){
		pre.listRoom.push({})
		pre.listRoom[i].id = 
		pre.listRoom[i].events = []
	}
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
var ScheduleEvent = async function(event_type, start, end){
	try{
		var pasangan
		var events
		var rooms

		//fetch pasangan
		if(event_type == 1){
			pasangan = await TA.model.fetchAll({withRelated: ['pembimbing', 'penguji']})
			rooms = await User.model.where({"peran": 3}).fetchAll()
		}

		//getRaw
		events = await GetRawEvent(start, end)

		//process event for scheduling
		events = RawEventToPre(events.data.result, start, end)
		events = PreEventToReady(events, rooms, pasangan)

		//request scheduling


		//save events
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
var NewEvent = function(objs){
	try{
		//bikin record kosong
		var task = []

		//delete pasangan ta
		for(var i=0; i<objs.length; i++){
			task.push(new Event.model(objs[i]).save())
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

		console.log("ScheduleEvent=========")
		ScheduleEvent(1, "2017-08-08T00:00:00+07:00", "2017-10-10T23:59:59+07:00")
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
test()

module.exports = {
  DeleteEvent, 
  NewEvent,
  FetchTAEvent,
  FetchKPEvent,
}