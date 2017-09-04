import axios from 'axios'
import {nodeURL} from '../config.js'

export const deleteTA= (id) => {
    return function(dispatch) {

        dispatch({
            type: "DELETE TA"
        })
        axios.post(nodeURL+'/ta/delete', {
            id: id
        }).then(function (data) {

            dispatch({
                type: "DONE DELETE TA"

            })
            axios.get(nodeURL+'/ta').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH TA",
                    payload: data.data

                })
            })
        })

    }
}