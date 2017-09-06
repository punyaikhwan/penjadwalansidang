let User = require('../db/models/user.js')
let Promise = require('bluebird')


//==============================================================================
var UpdateEmail = function(email, token) {
	return User.model.where({"email": email}).fetch().then(function(data){
		if(data){ //if user found
			return new User.model({id: data.get('id')}).save({"token": token}, {patch: true})
		}
		else{
			return 'gagal'
		}
	})
}

//===============================================================================
var FetchOneUser = function(email){
    return User.model.where('email', email).fetch()
}
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
var FetchMahasiswa = function(NIM){
	return User.model.where('NIM', '=', NIM).fetch({withRelated: ['TA.pembimbing.user', 'TA.penguji.user', 'TA.akhir.user']}).then(function(data){
		if(data.TA === {}){
			data = data.toJSON()
			data.TA = {
				"pembimbing": [],
				"penguji": [],
				"akhir": [],
				"topik": ""
			}
		}
		else{
			
		}
		console.log(JSON.stringify(data))
		return data
		
	})
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

		var result = await FetchMahasiswa("846-066-4078")
		//var result = await FetchMahasiswa("435-799-2642")
		console.log(JSON.stringify(result))
		return
		//test updateEmail
		console.log("EMAILTOKEN===============================")
		await UpdateEmail('Carmel.Cronin90@hotmail.com', 'awawawawaw')
		var result = await FetchUser()
		console.log(result.toJSON())

		return


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
//test()

module.exports = {
  DeleteUser, 
  NewUser,
  EditUser,
  FetchUser,
  FetchOneUser,
  UpdateEmail,
  FetchMahasiswa
}



