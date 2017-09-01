import axios from 'axios'

export const schedule= (event_type, start, end, pasangans) => {
    return function(dispatch) {

        dispatch({
            type: "SCHEDULING",
            payload: []
        })
        axios.post('http://localhost:3001/schedule', {
            event_type: event_type,
            start: start,
            end: end,
            pasangans: pasangans
        }).then(function (data) {
            console.log("SCHEDULE:", data.data)

            dispatch({
                type: "DONE SCHEDULING",
                payload: data.data

            })
        })

    }
}