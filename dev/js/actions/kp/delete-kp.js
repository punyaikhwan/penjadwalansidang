import axios from 'axios'
import {nodeURL} from '../config.js'

export const deleteKP= (id) => {
    return function(dispatch) {

        dispatch({
            type: "DELETE KP"
        })
        axios.post(nodeURL+'/kp/delete', {
            id: id
        }).then(function (data) {

            dispatch({
                type: "DONE DELETE KP"

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