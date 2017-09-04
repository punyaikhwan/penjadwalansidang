import axios from 'axios'
import {nodeURL} from '../config.js'

export const save= (events) => {
    return function(dispatch) {

        dispatch({
            type: "SAVE",
            payload: []
        })
        axios.post(nodeURL+'/overwrite', {
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