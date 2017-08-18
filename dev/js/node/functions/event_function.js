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
	return Event.model.fetchAll({withRelated:['kelompok_TA']})
}
//===============================================================================
var FetchKPEvent = function(){
	return Event.model.fetchAll({withRelated:['kelompok_KP']})
}
//===============================================================================
var CreateEventObj = function(){
	var obj = {

	}

	return obj
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
		console.log(JSON.stringify(result))

		console.log("NEW=========")
		await NewEvent([newStuff])
		var result = await FetchTAEvent()
		console.log(JSON.stringify(result))


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
}