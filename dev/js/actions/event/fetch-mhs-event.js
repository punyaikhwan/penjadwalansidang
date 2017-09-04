import axios from 'axios'
import {nodeURL} from '../config.js'

export const fetchMhsEvent= (item) => {
    return function(dispatch) {

        dispatch({
            type: "FETCH MHS EVENT",
            payload: []
        })
        axios.post(nodeURL+'/eventmahasiswa/',{
            id: item
        }).then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH MHS EVENT",
                payload: data.data

            })
        })
    }

}