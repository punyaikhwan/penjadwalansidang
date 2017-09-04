let User = require('../db/models/user.js')
let CalendarList = require('../db/models/calendar_list.js')
let axios = require('axios')
let Promise = require('bluebird')
let knex = require('../db/models/db.js')
import {schedulerURL} from '../config.js'
//===============================================================================
// ini khusus buat 1 id aja
var GetCalendarListGoogle = async function(id){
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
        // now we have ensure that user ada di db

        //request to pythone
        // we need to update the database periodically

        let res
        axios.post(schedulerURL+'/calendars', request_param).then(
            function(temp_result) {
                res = temp_result.data.result[0];
                // console.log(res);
                let status = InsertCalendarList(id, res.calendarList, 1);
            }
        ).catch(function(error) {
            console.log(error);
            return error
        })


    }).catch(function(error){
        return error
    })
}

var GetCalendarList = function(id) {
    var update = GetCalendarListGoogle(id);

    return CalendarList.model.where({"user_id": id}).fetchAll({columns: ["calendar_id", "calendar_name", "status"]}).then(function(result){
        result = result.toJSON();
        var temp = {
            calendarList: []
        }
        for (var i = 0; i < result.length; i++) {
            temp.calendarList.push(result[i]);
        }

        return temp;

    }).catch(function(error){
        return error
    })
}

var UpdateCalendarList = async function(insert_cal, mode) {
    // mode 1 update dari server google
    // mode 2 update checklist user

    var user_id = insert_cal.user_id;
    var calendar_id = insert_cal.calendar_id;
    var calendar_name = insert_cal.calendar_name;
    var status = insert_cal.status;

    return CalendarList.model.where({"user_id": user_id, "calendar_id": calendar_id}).fetch().then(function(data) {
        if(mode == 2) { // calendar status is shared / active
            console.log("ini status" + status);
            return new CalendarList.model({id: data.get('id')}).save({"calendar_id": calendar_id, "calendar_name": calendar_name, "status": status}, {patch: true}) // cuma update yg dibutuhkan saja
        } else {
            return new CalendarList.model({id: data.get('id')}).save({"calendar_id": calendar_id, "calendar_name": calendar_name}, {patch: true})
        }
    }).catch(function(err) {
        console.log("new calendarlist");
        return NewCalendar({"user_id": user_id, "calendar_id": calendar_id, "calendar_name": calendar_name, "status": true});

        console.log(err);
        return err;
    })
}

// Ini khusus cuma satu id aja
var InsertCalendarList = async function(user_id, calendarList, mode) {

    var temp = calendarList;

    for (var i = 0; i < temp.length; i++) {
        var insert_cal = {user_id: user_id, calendar_id: temp[i].id, calendar_name: temp[i].name, status: temp[i].status}
        var update = UpdateCalendarList(insert_cal, mode).then(function(result){
            // console.log(result);
            console.log( {"status": "SUCCESS"});
        }).catch(function(err) {
            // console.log(err);
            console.log({"status": "ERROR"});
            return ({"status": "ERROR"});
        })
    }

    return ({"status": "SUCCESS"});

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
// test()

module.exports = {
    GetCalendarList,
    GetCalendarListGoogle,
    InsertCalendarList
}