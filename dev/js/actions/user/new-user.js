import axios from 'axios'
import {nodeURL} from '../config.js'

export const newUser= (nama, email, peran, nim) => {
    return function(dispatch) {

        dispatch({
            type: "NEW USER"
        })
        axios.post(nodeURL+'/user/new', {
            "obj":{
                "nama": nama,
                "email": email,
                "peran": peran,
                "NIM": nim
            }
        }).then(function (data) {

            dispatch({
                type: "DONE NEW USER"

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