import axios from 'axios'
import {nodeURL} from '../config.js'

export const checkToken= (token) => {
    return function(dispatch) {
        axios.post(nodeURL+'/getUserInfo', {
            "token": token
        }).then(function(result){
            console.log("masuk gan")
            dispatch({
                type: "USER",
                payload: result.data.userInfo
            })
            dispatch({
                type: "DONE CHECK TOKEN"
            })

        }).catch(function(err){
            console.log("wawawa")
            console.log(err)
        })


    }

}
