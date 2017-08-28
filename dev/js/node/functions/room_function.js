let Room = require('../db/models/ruangan.js')
let Event = require('../db/models/event_ruangan.js')
let Promise = require('bluebird')


//===============================================================================
var DeleteRoom = function(id){
	return new Room.model({"id": id}).destroy()
}
//===============================================================================
var NewRoom = function(obj){
	return new Room.model(obj).save()
}
//===============================================================================
var EditRoom = async function(ids, objs){
	try{
		var task = []
		for(var i=0; i<ids.length; i++){
			//delete event lama
			var old = await Event.model.where({room_id: ids[i]}).fetchAll()
			old = old.toJSON();
			if(old){ //if old defined/found
				for(var j=0; j<old.length; j++){
					task.push(
						new Event.model({"id": old[j].id}).destroy()
					)
				}
			}
			
			//new event
			for(var k=0; k<objs[i].length; k++){
				task.push(
					new Event.model({
						title: objs[i][k].title,
						start: objs[i][k].start,
						end: objs[i][k].end,
						room_id: ids[i]
					}).save()
				)
			}

		}
		return Promise.each(task, function(){})
	}catch(err){
		console.log(err)
	}
}
//===============================================================================
var FetchRoom = function(){
	return Room.model.fetchAll({withRelated: 'event'})
}
//===============================================================================
var test = async function(){
	try{
		console.log("NEW=================")
		await NewRoom({
			"nama": "76012"
		})

		var result = await FetchRoom()
		console.log(JSON.stringify(result))
		var lasti = result.pop().id

		console.log("Edit=================")
		await EditRoom([lasti], [[{
			"title": "makan-makan",
			"start": "2017-08-08T07:00:00+07:00",
			"end": "2017-08-08T10:00:00+07:00"
		},
		{
			"title": "makan-makan2",
			"start": "2017-08-08T07:00:00+07:00",
			"end": "2017-08-08T10:00:00+07:00"
		}]])

		var result = await FetchRoom()
		console.log(JSON.stringify(result))

		console.log("DELETE=================")
		await DeleteRoom(lasti)

		var result = await FetchRoom()
		console.log(JSON.stringify(result))

	}catch(err){
		console.log(err)
	}
}
//===============================================================================
//main program
// test()

module.exports = {
  DeleteRoom, 
  NewRoom,
  EditRoom,
  FetchRoom,
}



