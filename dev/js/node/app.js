var http = require('http');
var express = require('express')
var Session = require('express-session')
var bodyParser = require('body-parser');
var user = require('./functions/user_function.js')
var KP = require('./functions/kp_function.js')
var TA = require('./functions/ta_function.js')
var Event = require('./functions/event_function.js')
// var googleUtil = require('./GoogleLogin.js')
var secretHandler = require('./sessionSecret.js')

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');

// const ClientId = "806339176753-cmb1mv9g8itmir0p4ucqh0ibuhbl6s0k.apps.googleusercontent.com";
// const ClientSecret = "PF6m7fxfIzu8g3AhyMI3VoAz";
const ClientId = "1031302495796-7vb2i3hqj2q5o632ggreuca6cvsuvjn9.apps.googleusercontent.com";
const ClientSecret = "6nN7tlnCMHfqtlmrgn8PP7Cx";
const RedirectionUrl = "http://localhost:3000/"

// Starting the express app
var app = express()

app.use(bodyParser.json()); // for parsing application/json

var generatedSecret = secretHandler.getOrCreate();

// {  
//   "web":{  
//     "client_id":"1031302495796-7vb2i3hqj2q5o632ggreuca6cvsuvjn9.apps.googleusercontent.com",
//     "project_id":"ivory-being-162716",
//     "auth_uri":"https://accounts.google.com/o/oauth2/auth",
//     "token_uri":"https://accounts.google.com/o/oauth2/token",
//     "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
//     "client_secret":"6nN7tlnCMHfqtlmrgn8PP7Cx",
//     "redirect_uris":[  
//       "urn:ietf:wg:oauth:2.0:oob",
//       "http://localhost"
//     ]
//   }
// }
//============================================================================
// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
	'https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/plus.me',
	'https://www.googleapis.com/auth/userinfo.email',
	'https://www.googleapis.com/auth/userinfo.profile'
];

app.use(Session({
	// secret: generatedSecret,
	secret: '0ecef849563661269e02a44a48f5d3ab47496c88f78ab9a606f60899a2e56305d0f0a6411b4659e6db9c297e7004b6fe',
	duration: (30 * 60 * 1000),
	activeDuration: (5 * 60 * 1000),
	resave: true,
	saveUninitialized: true
}))

function getOAuthClient () {
    return new OAuth2(ClientId ,  ClientSecret, RedirectionUrl);
}
 
function getAuthUrl () {
    var oauth2Client = getOAuthClient();
    // generate a url that asks permissions for Google+ and Google Calendar scopes

 
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes // If you only need one scope you can pass it as string
    });
 
    return url;
}

//GOOGLE====================================================================
app.use('/googleLogin', function(request, response){
	var url = getAuthUrl();
	console.log(url);
	response.send(url)
});


app.use('/logout', function(request, response){
	var oauth2Client = getOAuthClient();
	var session = request.session;
	oauth2Client.signOut().then(function() {
		request.session.reset();
		response.redirect('/');
		console.log('User signed out.')
	})
});

app.use('/getUserInfo', function(request, response){
	var oauth2Client = getOAuthClient();
	var session = request.session;
	var code = request.body.token;
	oauth2Client.getToken(code, function(err, tokens) {
		if(!err) {
			console.log(tokens);
			oauth2Client.setCredentials(tokens);
			//saving the token to current session
			session["tokens"] = tokens;
			var p = new Promise(function (resolve, reject) {
				plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
					resolve(response || err);
				});
				// google.oauth("v2").userinfo.v2.me.get({auth: oauth2Client}, (e, profile) => {
				// 	resolve(profile || err);
				// });
			}).then(function (data) {
				let email = data.emails[0].value;
				user.UpdateEmail(email, tokens.refresh_token).then(function(result){
					if (result != 'gagal') {
						// response.status(200).send({status: "SUCCESS", session: session});
						response.status(200).send({status: "SUCCESS"});
					} else {
						// response.status(404).send({status: "FAILED", session: session});
						response.status(404).send({status: "FAILED"});
					}
					
					console.log(data.emails[0].value);	
				});
			})
		} else {
			// response.status(404).send({status: "FAILED", session: session});
			response.status(404).send({status: "FAILED"});
			console.log(err);
		}
	})



  	// response.send(session)
})
//Event====================================================================
app.post('/schedule', function(request, response){
	let event_type = request.body.event_type
	let start = request.body.start
	let end = request.body.end
	Event.ScheduleEvent(event_type, start, end).then(function(result){
		response.send(result)
	}).catch(function(err){
		console.log(err)
		response.send(err)
	})
})

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

app.get('/', function(request, response){
	response.send('hello world')
})


var port = 3001;
var server = http.createServer(app);
server.listen(port);
server.on('listening', function() {
	console.log('Tim Ta app listening to ${port}');
})