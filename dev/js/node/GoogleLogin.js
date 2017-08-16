// var google = require('googleapis');
// var OAuth2 = google.auth.OAuth2;
// var plus = google.plus('v1');

// const ClientId = "806339176753-cmb1mv9g8itmir0p4ucqh0ibuhbl6s0k.apps.googleusercontent.com";
// const ClientSecret = "PF6m7fxfIzu8g3AhyMI3VoAz";
// const RedirectionUrl = "http://localhost:3000/timta_mng_user"

// Setting a global auth option
var oauth2Client = new OAuth2(
  ClientId, ClientSecret, RedirectionUrl
);


// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

var url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,

  // Optional property that passes state parameters to redirect URI
  // state: { foo: 'bar' }
});


var getUserInfo = function() {
  console.log("batas");

  google.oauth2("v2").userinfo.v2.me.get({auth: oauth2Client}, (e, profile) => {
    if (e) {
      console.log(e);
    } else {
        console.log(profile);
    }
  });
}


var getToken = function(code, session){
  var sess = session;
  oauth2Client.getToken(code, function (err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if (!err) {
      console.log("===============================")
      console.log(tokens)
      oauth2Client.setCredentials(tokens);
      session["tokens"] = tokens;
    }
    else{
      console.log(err)
    }
  });
  console.log("ini sess" + sess);

  return sess;

  // console.log(oauth2Client.options.)


  
  
  // console.log("test test " + google.options.auth);
  // return new Promise((resolve, reject) => {
  //   oauth2_options.userinfo.get({
  //   }, (err, data) => (err ? reject(err) : resolve(data)));
  // });

};

let saveToken = function(email, token){
  //cek email

  //if belum ada new user

  //else update email
  return null;
}

// let getUserInfo = function() {
//   return new Promise((resolve, reject) => {
//     oauth2_options.userinfo.get({
//       auth: oauth2Client,
//     }, (err, data) => (err ? reject(err) : resolve(data)));
//   });
// };

console.log(url)


module.exports = {
  oauth2Client,
  url,
  getToken,
  getUserInfo
}