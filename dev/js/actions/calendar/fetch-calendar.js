import axios from 'axios'
import {nodeURL} from '../config.js'


export const fetchCalendar= (id) => {
    return function(dispatch) {

        dispatch({
            type: "FETCH CALENDAR",
            payload: []
        })
        axios.get(nodeURL+'/calendars/'+id).then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH CALENDAR",
                payload: data.data.calendarList

            })
        })

    }
}