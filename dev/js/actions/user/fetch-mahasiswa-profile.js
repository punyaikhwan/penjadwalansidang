import axios from 'axios'
import {nodeURL} from '../config.js'

export const fetchProfile= () => {
    return function(dispatch) {
        axios.get(nodeURL+'/mahasiswa').then(function (data) {
            dispatch({
                type: "DONE PROFILE",
                payload: data

            })
        })

    }
}