import axios from 'axios'

import {nodeURL} from '../config.js'
export const selectCalendar= (calendar, id) => {
    return function(dispatch) {

        dispatch({
            type: "SELECT CALENDAR",
            payload: []
        })
        console.log(JSON.stringify(id))
        axios.post(nodeURL+'/calendars', {
            calendarList: calendar,
            user_id: id
        }).then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE SELECT CALENDAR",
                payload: data.data

            })
        })

    }
}