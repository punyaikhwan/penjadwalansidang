import axios from 'axios'

export const save= (events) => {
    return function(dispatch) {

        dispatch({
            type: "SAVE",
            payload: []
        })
        axios.post('http://localhost:3001/node/overwrite', {
            events: events
        }).then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE SAVE",
                payload: data.data

            })
        })

    }
}