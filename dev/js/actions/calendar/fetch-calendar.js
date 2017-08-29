import axios from 'axios'

export const fetchCalendar= (id) => {
    return function(dispatch) {

        dispatch({
            type: "FETCH CALENDAR",
            payload: []
        })
        axios.get('http://localhost:3001/calendars/'+id).then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH CALENDAR",
                payload: data.data.calendarList

            })
        })

    }
}