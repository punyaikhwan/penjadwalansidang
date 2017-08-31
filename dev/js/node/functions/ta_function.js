let TA = require('../db/models/pasangan_ta.js')
let User = require('../db/models/user.js')
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
var NewTA = function(mahasiswa_id){
	//bikin record kosong
	return new TA.model({
		'mahasiswa_id': mahasiswa_id
	}).save()
}
//===============================================================================
var EditTA = async function(ids, objs){
	try{
		console.log("EDITED:", objs);
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
	return TA.model.fetchAll({withRelated:['pembimbing.user', 'penguji.user', 'akhir.user', 'mahasiswa']})
}
//===============================================================================
var FetchSpecificStudentTA = function(mahasiswa){
	return User.model.where({'nama': mahasiswa}).fetch().then(function(data){
		console.log(data.toJSON())
		var id = data.id
		return TA.model.where({'id': id}).fetchAll({withRelated:['pembimbing.user', 'penguji.user', 'akhir.user', 'mahasiswa']})
	})
	
}
//===============================================================================
var FetchSpecificTeacherTA = async function(nama){
	try{
		let temp = await TA.model.fetchAll({withRelated:['pembimbing.user', 'penguji.user', 'akhir.user', 'mahasiswa']})
		temp = temp.toJSON()

		//loop ilangin yang ngga sesuai nama
		var n = nama
		var mark = []
		for(var i=0; i<temp.length; i++){
			//check pembimbing
			for(var j1=0; j1<temp[i].pembimbing.length; j1++){
				if(temp[i].pembimbing[j1].user.nama == n){
					mark.push(i)
					break
				}
			}

			//check penguji
			for(var j2=0; j2<temp[i].penguji.length; j2++){
				if(temp[i].penguji[j2].user.nama == n){
					mark.push(i)
					break
				}
			}

			//check akhir
			for(var j3=0; j3<temp[i].akhir.length; j3++){
				if(temp[i].akhir[j3].user.nama == n){
					mark.push(i)
					break
				}
			}
		}

		let result = []

		for(var i=0; i<mark.length; i++){
			result.push(temp[mark[i]])
		}
		return result
		
		
	}catch(err){
		console.log(err)
	}
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
		
		var result = await FetchSpecificStudentTA('Madison')
		console.log("FETCH===============================")
		console.log(result.toJSON())

		return 

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
// test()

module.exports = {
  DeleteTA, 
  NewTA,
  EditTA,
  FetchTA
}