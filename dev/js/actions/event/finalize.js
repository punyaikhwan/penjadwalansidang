import axios from 'axios'
import {nodeURL} from '../config.js'

export const finalize= (event_type, events) => {
    return function(dispatch) {

        dispatch({
            type: "FINALIZE",
            payload: []
        })
        axios.post(nodeURL+'/finalize', {
            event_type: event_type,
            events: events
        }).then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FINALIZE",
                payload: data.data

            })
        })

    }
}