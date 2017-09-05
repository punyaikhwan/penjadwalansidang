import axios from 'axios'
import {nodeURL} from '../config.js'

export const newRuangan= (nama) => {
    return function(dispatch) {

        dispatch({
            type: "NEW RUANGAN"
        })
        axios.post(nodeURL+'/ruangan/new', {
            nama: nama
        }).then(function (data) {

            dispatch({
                type: "DONE NEW RUANGAN"

            })
            axios.get(nodeURL+'/ruangan').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH RUANGAN",
                    payload: data.data

                })
            })
        })

    }
}