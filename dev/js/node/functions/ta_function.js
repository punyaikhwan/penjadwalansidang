let TA = require('../db/models/pasangan_ta.js')
let Anggota = require('../db/models/anggota_pasangan_ta.js')
let Promise = require('bluebird')
//===============================================================================
var DeleteTA = async function(id){
	try{
		var task = []

		//delete pasangan ta
		task.push(new TA.model({"id": id}).destroy())
		
		
	}catch(err){
		console.log(err)
	}
	

	return Promise.each(task, function(){})
}
//===============================================================================
var NewTA = function(){
	//bikin record kosong
	return new TA.model().save()
}
//===============================================================================
var EditTA = async function(ids, objs){
	try{
		var task = []
		for(var i=0; i<ids.length; i++){
			//change topik & mahasiswaid
			task.push(
				new TA.model({id: ids[i]})
			 	.save({
			 		topik: objs[i].topik,
			 		mahasiswa_id: objs[i].mahasiswa_id
			 	}, {patch: true})
			)

			//delete anggota lama
			var old = await Anggota.model.where({pasangan_id: ids[i]}).fetchAll()
			old = old.toJSON();
			if(old){ //if old defined/found
				for(var j=0; j<old.length; j++){
					task.push(
						new Anggota.model({"id": old[j].id}).destroy()
					)
				}
			}
			

			//new pembimbings
			for(var k=0; k<objs[i].pembimbings.length; k++){
				task.push(
					new Anggota.model({
						user_id: objs[i].pembimbings[k],
						peran_pasangan: 1,
						pasangan_id: ids[i]
					}).save()
				)
			}

			//new pengujis
			for(var l=0; l<objs[i].pengujis.length; l++){
				task.push(
					new Anggota.model({
						user_id: objs[i].pengujis[l],
						peran_pasangan: 2,
						pasangan_id: ids[i]
					}).save()
				)
			}

			//new akhirs
			for(var m=0; m<objs[i].akhirs.length; m++){
				task.push(
					new Anggota.model({
						user_id: objs[i].akhirs[m],
						peran_pasangan: 3,
						pasangan_id: ids[i]
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
var FetchTA = function(){
	return TA.model.fetchAll({withRelated:['pembimbing.user', 'penguji.user', 'akhir.user']})
}
//===============================================================================
var CreateTAObj = function(mahasiswa_id, topik, pembimbings, pengujis, akhirs){
	var obj = {
		"mahasiswa_id": mahasiswa_id,
		"topik": topik,
		"pembimbings": pembimbings,
		"pengujis": pengujis,
		"akhirs": akhirs,
	}

	return obj
}
//===============================================================================
var test = async function(){
	try{
		var mahasiswa_id = 1
		var topik = "makan mie"
		var pembimbings = [1,2]
		var pengujis = [1,2]
		var akhirs = [1,2]
		var obj = CreateTAObj(mahasiswa_id, topik, pembimbings, pengujis, akhirs)

		var mahasiswa_id2 = 2
		var topik2 = "makan cilok"
		var pembimbings2 = [1]
		var pengujis2 = [1]
		var akhirs2 = [1]
		var obj2 = CreateTAObj(mahasiswa_id2, topik2, pembimbings2, pengujis2, akhirs2)

		//test fetch
		console.log("FETCH===============================")
		var result = await FetchTA()
		console.log(result.toJSON())

		//test new
		console.log("NEW===============================")
		await NewTA()
		var result = await FetchTA()
		console.log(result.toJSON())
		var lasti = result.pop().id
		console.log(lasti)

		//test edit
		console.log("EDIT===============================")
		var ids = [lasti]
		var objs = [obj]
		await EditTA(ids, objs)
		var result = await FetchTA()
		console.log(result.toJSON())

		console.log("EDIT2===============================")
		var ids = [lasti]
		var objs = [obj2]
		await EditTA(ids, objs)
		var result = await FetchTA()
		console.log(result.toJSON())

		//test delete
		console.log("DELETE===============================")
		await DeleteTA(lasti)
		var result = await FetchTA()
		console.log(result.toJSON())

	}catch(err){
		console.log(err)
	}
}
//===============================================================================
//main program
test()
