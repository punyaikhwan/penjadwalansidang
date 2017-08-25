var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var user = require('./functions/user_function.js')
var KP = require('./functions/kp_function.js')
var TA = require('./functions/ta_function.js')


app.use(bodyParser.json()); // for parsing application/json
//GOOGLE====================================================================

//USER====================================================================
app.get('/user', function(request, response){
	user.FetchUser().then(function(result){
		response.send(result)
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})

/*
{
	"obj":{
		"nama": "test1",
		"email": "email@1.com",
		"peran": 2,
		"NIM": "09875"
	}
}
*/
app.post('/user/new', function(request, response){
	user.NewUser(request.body.obj).then(function(result){
		response.send('success')
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})
/*
{
	"ids": [3],
	"objs":[{
		"nama": "test2",
		"email": "email@2.com",
		"peran": 1,
		"NIM": "09875111"
	}]
}
*/
app.post('/user/edit', function(request, response){
	user.EditUser(request.body.ids, request.body.objs).then(function(result){
		response.send('success')
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})
/*
{
	"id": 1
}
*/
app.post('/user/delete', function(request, response){
	user.DeleteUser(request.body.id).then(function(result){
		response.send('success')
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})
//KP====================================================================
app.get('/kp', function(request, response){
	KP.FetchKP().then(function(result){
		response.send(result)
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})

app.post('/kp/new', function(request, response){
	KP.NewKP().then(function(result){
		response.send('success')
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})

app.post('/kp/edit', function(request, response){
	KP.EditKP(request.body.ids, request.body.objs).then(function(result){
		response.send('success')
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})

app.post('/kp/delete', function(request, response){
	KP.DeleteKP(request.body.id).then(function(result){
		response.send('success')
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})
//TA====================================================================
app.get('/ta', function(request, response){
	TA.FetchTA().then(function(result){
		response.send(result)
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})

/*
{
	"mahasiswa_id": 1
}
*/
app.post('/ta/new', function(request, response){
	TA.NewTA(request.body.mahasiswa_id).then(function(result){
		response.send('success')
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})

app.post('/ta/edit', function(request, response){
	TA.EditTA(request.body.ids, request.body.objs).then(function(result){
		response.send('success')
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})

app.post('/ta/delete', function(request, response){
	TA.DeleteTA(request.body.id).then(function(result){
		response.send('success')
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})



app.post('/', function(request, response){
	response.send('hello world')
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})