import axios from 'axios'
import {nodeURL} from '../config.js'

export const deleteUser= (id) => {
    return function(dispatch) {

        dispatch({
            type: "DELETE USER"
        })
        axios.post(nodeURL+'/user/delete', {
            "id":id
        }).then(function (data) {

            dispatch({
                type: "DONE DELETE USER"

            })
            axios.get(nodeURL+'/user').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH USER",
                    payload: data.data

                })
            })
        })

    }
}