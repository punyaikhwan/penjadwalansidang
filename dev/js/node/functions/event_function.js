let Event = require('../db/models/event.js')
let Promise = require('bluebird')
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