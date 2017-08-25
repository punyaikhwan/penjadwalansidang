import axios from 'axios'

export const fetchKP= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH KP",
            payload: []
        })
        axios.get('http://localhost:3001/kp').then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH KP",
                payload: data.data

            })
        })

    }
}