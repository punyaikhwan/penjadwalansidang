import axios from 'axios'
import {nodeURL} from '../config.js'

export const newKP= () => {
    return function(dispatch) {

        dispatch({
            type: "NEW KP"
        })
        axios.post(nodeURL+'/kp/new').then(function (data) {

            dispatch({
                type: "DONE NEW KP"

            })
            axios.get(nodeURL+'/kp').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH KP",
                    payload: data.data

                })
            })
        })

    }
}