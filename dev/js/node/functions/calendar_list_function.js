let User = require('../db/models/user.js')
let CalendarList = require('../db/models/calendar_list.js')
let axios = require('axios')
let Promise = require('bluebird')
let knex = require('../db/models/db.js')
//===============================================================================
// ini khusus buat 1 id aja
var GetCalendarList= async function(id){
	return User.model.where({'id': id}).fetchAll().then(function(result){
        result = result.toJSON();


        var request_param = {
            "data":[]
        }
        for(var i=0; i<result.length; i++){
            request_param.data.push({
                "email": result[i].email,
                "refreshToken": result[i].token,
            })
        }

        //request to python
        return axios.post('http://localhost:5000/calendars', request_param)
        .catch(function (error) {
            console.log(error);
            return error
        });
	}).catch(function(error){
		return error
	})
}	

var UpdateCalendarList = async function(instanc, chosen) {
    var user_id = instanc.user_id;
    var calendar_id = instanc.calendar_id
    var calendar_name = instanc.calendar_name

    return CalendarList.model.where({"user_id": user_id, "calendar_id": calendar_id}).fetch().then(function(data) {
        if(data) { // user found
            if (chosen != 'nope') { // kalau ga ada perubahan
                return new CalendarList.model({id: data.get('id')}).save({"user_id": user_id, "calendar_id": calendar_id, "calendar_name": calendar_name, "status": chosen }, {patch: true})
            } else {
                return new CalendarList.model({id: data.get('id')}).save({"user_id": user_id, "calendar_id": calendar_id, "calendar_name": calendar_name}, {patch: true})
            }   
        } else { // buat baru
            return NewCalendar({"user_id": user_id, "calendar_id": calendar_id, "calendar_name": calendar_name, "status": true});
        }
    })
}

// Ini khusus cuma satu id aja
var InsertCalendarList = async function(id, chosen='nope') {
    var res = await GetCalendarList(id); 
    console.log(res.data);
    var temp = res.data.result[0].calendarList;
    console.log(temp);   

    for (var i = 0; i < temp.length; i++) {
        var insert_cal = {user_id: id, calendar_id: temp[i].id, calendar_name: temp[i].name}
        UpdateCalendarList(insert_cal, chosen);
    }
}

var NewCalendar = function(obj){
	return new CalendarList.model(obj).save()
}

var DeleteCalendarList = function(calendar_id){
	return new CalendarList.model({"calendar_id": id}).destroy()
}

// ===================================================================
var test = async function(){
	try{

		console.log("Get Calendar List=========")
        var res = await InsertCalendarList(31);
        // console.log("hehe")
        // console.log(JSON.stringify(res))
		return


	}catch(err){
		console.log(err)
	}
}
//===============================================================================
//main program
test()

module.exports = {
  GetCalendarList,
  InsertCalendarList
}