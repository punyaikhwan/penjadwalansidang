var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  '806339176753-cmb1mv9g8itmir0p4ucqh0ibuhbl6s0k.apps.googleusercontent.com',
  'PF6m7fxfIzu8g3AhyMI3VoAz',
  'http://localhost:3000/timta_mng_user'
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/calendar'
];

var url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,

  // Optional property that passes state parameters to redirect URI
  // state: { foo: 'bar' }
});
