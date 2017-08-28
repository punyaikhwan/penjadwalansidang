import axios from 'axios'

export const schedule= (event_type, start, end, pasangans) => {
    return function(dispatch) {

        dispatch({
            type: "FINALIZE",
            payload: []
        })
        axios.post('http://localhost:3001/schedule', {
            event_type: event_type,
            start: start,
            end: end,
            pasangans: pasangans
        }).then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FINALIZE",
                payload: data.data

            })
        })

    }
}