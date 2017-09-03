import axios from 'axios'

export const selectCalendar= (calendar, id) => {
    return function(dispatch) {

        dispatch({
            type: "SELECT CALENDAR",
            payload: []
        })
        console.log(JSON.stringify(id))
        axios.post('http://localhost:3001/node/calendars', {
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