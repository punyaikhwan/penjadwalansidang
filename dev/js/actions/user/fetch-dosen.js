import axios from 'axios'
import {nodeURL} from '../config.js'

export const fetchDosen= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH DOSEN",
            payload: []
        })
        axios.get(nodeURL+'/user').then(function (data) {
            var dosen = []
            data.data.forEach(function(item) {
                if (item.peran == 1) {
                    dosen.push(item);
                }
            })
            dispatch({
                type: "DONE FETCH DOSEN",
                payload: dosen

            })
        })

    }
}