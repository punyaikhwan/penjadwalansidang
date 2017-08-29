import axios from 'axios'

export const selectCalendar= (id) => {
    return function(dispatch) {

        dispatch({
            type: "SELECT CALENDAR",
            payload: []
        })
        console.log(JSON.stringify(id))
        axios.post('http://localhost:3001/calendars', {
            calendarList: id.calendarList,
            user_id: id.user_id
        }).then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE SELECT CALENDAR",
                payload: data.data

            })
        })

    }
}