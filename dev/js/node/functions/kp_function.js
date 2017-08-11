let KP = require('../db/models/pasangan_kp.js')
let Anggota = require('../db/models/anggota_pasangan_kp.js')
let Promise = require('bluebird')
//===============================================================================
var DeleteKP = async function(id){
	try{
		var task = []

		//delete pasangan kp
		task.push(new KP.model({"id": id}).destroy())
		//delete anggota pasangan
		var old = await Anggota.model.where({pasangan_id: id}).fetchAll()
		old = old.toJSON();
		if(old){ //if old defined/found
			for(var j=0; j<old.length; j++){
				task.push(
					new Anggota.model({"id": old[j].id}).destroy()
				)
			}
		}
	}catch(err){
		console.log(err)
	}
	

	return Promise.each(task, function(){})
}
//===============================================================================
var NewKP = function(){
	//bikin record kosong
	return new KP.model().save()
}
//===============================================================================
var EditKP = async function(ids, objs){
	try{
		var task = []
		for(var i=0; i<ids.length; i++){
			//change topik
			task.push(
				new KP.model({id: ids[i]})
			 	.save({topik: objs[i].topik}, {patch: true})
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
			

			//new anggota
			for(var k=0; k<objs[i].anggotas.length; k++){
				task.push(
					new Anggota.model({
						user_id: objs[i].anggotas[k],
						peran_pasangan: 0,
						pasangan_id: ids[i]
					}).save()
				)
			}

			//new dosen
			for(var l=0; l<objs[i].pembimbings.length; l++){
				task.push(
					new Anggota.model({
						user_id: objs[i].pembimbings[l],
						peran_pasangan: 1,
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
var FetchKP = function(){
	return KP.model.fetchAll({withRelated:['dosen.user', 'anggota.user']})
}
//===============================================================================
var CreateKPObj = function(anggotas, topik, pembimbings){
	var obj = {
		"anggotas": anggotas,
		"topik": topik,
		"pembimbings": pembimbings,
	}

	return obj
}
//===============================================================================
var test = async function(){
	try{
		var anggotas = [1,2]
		var pembimbings = [1,2]
		var topik = "makan sate"
		var obj = CreateKPObj(anggotas, topik, pembimbings)

		var anggotas2 = [1]
		var pembimbings2 = [2]
		var topik2 = "makan ayam"
		var obj2 = CreateKPObj(anggotas2, topik2, pembimbings2)

		//test fetch
		console.log("FETCH===============================")
		var result = await FetchKP()
		console.log(JSON.stringify(result))

		//test new
		console.log("NEW===============================")
		await NewKP()
		var result = await FetchKP()
		console.log(result.toJSON())
		var lasti = result.pop().id
		console.log(lasti)

		//test edit
		console.log("EDIT===============================")
		var ids = [lasti]
		var objs = [obj]
		await EditKP(ids, objs)
		var result = await FetchKP()
		console.log(result.toJSON())

		console.log("EDIT2===============================")
		var ids = [lasti]
		var objs = [obj2]
		await EditKP(ids, objs)
		var result = await FetchKP()
		console.log(result.toJSON())

		//test delete
		console.log("DELETE===============================")
		await DeleteKP(lasti)
		var result = await FetchKP()
		console.log(result.toJSON())

	}catch(err){
		console.log(err)
	}
}
//===============================================================================
//main program
// test()

module.exports = {
  DeleteKP, 
  NewKP,
  EditKP,
  FetchKP
}