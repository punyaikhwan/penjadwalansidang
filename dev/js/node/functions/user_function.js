let User = require('../db/models/user.js')
let Promise = require('bluebird')

//===============================================================================
var DeleteUser = function(id){
	return new User.model({"id": id}).destroy()
}
//===============================================================================
var NewUser = function(obj){
	return new User.model(obj).save()
}
//===============================================================================
var EditUser = function(ids, objs){
	var task = []
	for(var i=0; i<ids.length; i++){
		task.push(
			new User.model({id: ids[i]})
		 	.save(objs[i], {patch: true})
		)
	}
	return Promise.each(task, function(){})
}
//===============================================================================
var FetchUser = function(){
	return User.model.fetchAll()
}
//===============================================================================
var CreateUserObj = function(nama, email, peran, NIM=null){
	var obj = {
		"nama": nama,
		"email": email,
		"peran": peran,
		"NIM": NIM
	}

	return obj
}
//===============================================================================
var test = async function(){
	try{
		var myobj = CreateUserObj("mama", "mama@mama.com", 1, "098654")

		//test fetch
		console.log("FETCH===============================")
		var result = await FetchUser()
		console.log(result.toJSON())

		//test new
		console.log("NEW===============================")
		await NewUser(myobj)
		var result = await FetchUser()
		console.log(result.toJSON())
		var lasti = result.pop().id
		console.log(lasti)

		//test edit
		console.log("EDIT===============================")
		var ids = [lasti]
		myobj.nama = "mami"
		var objs = [myobj]
		await EditUser(ids, objs)
		var result = await FetchUser()
		console.log(result.toJSON())

		//test delete
		console.log("DELETE===============================")
		await DeleteUser(lasti)
		var result = await FetchUser()
		console.log(result.toJSON())

	}catch(err){
		console.log(err)
	}
}
//===============================================================================
//main program
test()





