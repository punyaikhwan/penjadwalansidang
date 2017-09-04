import axios from 'axios'
import {nodeURL} from '../config.js'

export const fetchRuangan= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH RUANGAN",
            payload: []
        })
        let url = nodeURL+'/ruangan'
        console.log("url ", url)
        axios.get(url).then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH RUANGAN",
                payload: data.data

            })
        })

    }
}