import axios from 'axios'
import {nodeURL} from '../config.js'

export const fetchEvent= (item) => {
    return function(dispatch) {

        dispatch({
            type: "FETCH EVENT",
            payload: []
        })
        axios.get(nodeURL+'/events').then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH EVENT",
                payload: data.data

            })
        })
    }

}