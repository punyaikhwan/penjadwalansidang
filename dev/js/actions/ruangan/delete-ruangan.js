import axios from 'axios'
import {nodeURL} from '../config.js'

export const deleteRuangan= (id) => {
    return function(dispatch) {

        dispatch({
            type: "DELETE RUANGAN"
        })
        axios.post(nodeURL+'/ruangan/delete', {
            id: id
        }).then(function (data) {

            dispatch({
                type: "DONE DELETE RUANGAN"

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