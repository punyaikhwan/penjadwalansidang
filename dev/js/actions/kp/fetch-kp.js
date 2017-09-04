import axios from 'axios'
import {nodeURL} from '../config.js'

export const fetchKP= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH KP",
            payload: []
        })
        axios.get(nodeURL+'/kp').then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH KP",
                payload: data.data

            })
        })

    }
}