import axios from 'axios'

export const schedule= (id) => {
    return function(dispatch) {

        dispatch({
            type: "SCHEDULING",
            payload: []
        })
        axios.post('http://localhost:3001/calendars', {
            id: id
        }).then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE SELECT CALENDAR",
                payload: data.data

            })
        })

    }
}