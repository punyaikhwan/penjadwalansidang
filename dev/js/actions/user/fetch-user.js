import axios from 'axios'

export const fetchUser= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH USER",
            payload: []
        })
        axios.get('http://localhost:3001/node/user').then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH USER",
                payload: data.data

            })
        })

    }
}