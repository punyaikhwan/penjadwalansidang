import axios from 'axios'
import {nodeURL} from '../config.js'

export const newTA= (id) => {
    return function(dispatch) {

        dispatch({
            type: "NEW TA"
        })
        axios.post(nodeURL+'/ta/new', {
            mahasiswa_id: id
        }).then(function (data) {

            dispatch({
                type: "DONE NEW TA"

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