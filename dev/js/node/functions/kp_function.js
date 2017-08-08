let KP = require('../db/models/pasangan_kp.js')
let Anggota = require('../db/models/anggota_pasangan_kp.js')
let Promise = require('bluebird')
//===============================================================================
var DeleteKP = function(id){
	return new KP.model({"id": id}).destroy()
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
//===============================================================================
var FetchKP = function(){
	return KP.model.fetchAll({withRelated:['dosen', 'anggota']})
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
var CreateUserList = function(userids, peran){
	var list = []
	for(var i; i<userids.length; i++){
		list.push({
			id: userids[i],
			peran: peran
		})
	}
}
//===============================================================================
var test = async function(){
	try{
		var anggotas = CreateUserList([1,2], 0)
		var pembimbings = CreateUserList([1,2], 1)
		var topik = "makan siang"
		var obj = CreateKPObj(anggotas, pembimbings, topik)

		//test fetch
		console.log("FETCH===============================")
		var result = await FetchKP()
		console.log(result.toJSON())

		//test new
		console.log("NEW===============================")
		await NewUser()
		var result = await FetchUser()
		console.log(result.toJSON())
		var lasti = result.pop().id
		console.log(lasti)

	}catch(err){
		console.log(err)
	}
}
//===============================================================================
//main program
test()
