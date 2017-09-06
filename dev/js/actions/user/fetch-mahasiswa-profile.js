import axios from 'axios'
import {nodeURL} from '../config.js'

export const fetchProfile = (NIM) => {
    return function(dispatch) {
        axios.post(nodeURL+'/mahasiswa', {"NIM": NIM}).then(function (data) {
            dispatch({
                type: "DONE PROFILE",
                payload: data.data

            })
        })

    }
}
