import axios from 'axios'
import {nodeURL} from '../config.js'

export const fetchUser= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH USER",
            payload: []
        })
        axios.get(nodeURL+'/user').then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH USER",
                payload: data.data

            })
        })

    }
}