import axios from 'axios'
import {nodeURL} from '../config.js'

export const fetchTA= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH TA",
            payload: []
        })
        axios.get(nodeURL+'/ta').then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH TA",
                payload: data.data

            })
        })

    }
}