import axios from 'axios'

export const checkToken= (token) => {
    return function(dispatch) {
        axios.post('http://localhost:3001/getUserInfo', {
            "token": token
        }).then(function(result){
            console.log("masuk gan")
            dispatch({
                type: "DONE CHECK TOKEN"
            })
        }).catch(function(err){
            console.log("wawawa")
            console.log(err)
        })


    }

}
