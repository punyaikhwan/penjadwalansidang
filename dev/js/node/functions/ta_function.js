let TA = require('../db/models/pasangan_ta.js')
let Anggota = require('../db/models/anggota_pasangan_ta.js')
let Promise = require('bluebird')

var DeleteTA = function(id){
	return new KP.model({"id": id}).destroy()
}

var NewTA = function(){
	return new User.model().save()
}

var EditTA = function(ids, objs){
	try{
		var task = []
		for(var i=0; i<ids.length; i++){
			//change topik
			task.push(
				new KP.model({id: ids[i]})
			 	.save({topik: objs[i].topik}, {patch: true})
			)

			//delete anggota lama
			var old = await Anggota.model({pasangan_id: ids[i]}).fetchAll()
			old = old.toJSON();
			for(var j=0; j<old.length; j++){
				task.push(
					new KP.model({"id": old[j].id}).destroy()
				)
			}

			//new anggota
			for(var k=0; k<objs[i].anggotas.length; k++){
				task.push(
					new Anggota.model(objs[i].anggotas[k]).save()
				)
			}

			//new dosen
			for(var l=0; l<objs[i].pembimbings.length; l++){
				task.push(
					new Anggota.model(objs[i].pembimbings[k]).save()
				)
			}

		}
		return Promise.each(tasks, function(t)
	}catch(err){
		console.log(err)
	}
}

var FetchTA = function(){
	return KP.model.fetchAll({withRelated:['dosen', 'anggota']})
}

var CreateTAObj = function(nama, topik, pembimbings, pengujis, akhirs){
	var obj = {
		"nama": nama,
		"topik": topik,
		"pembimbings": pembimbings,
		"pengujis": pengujis,
		"akhirs": akhirs,
	}

	return obj
}

var test = async function(){
	try{


	}catch(err){
		console.log(err)
	}
}
//===============================================================================
//main program
test()