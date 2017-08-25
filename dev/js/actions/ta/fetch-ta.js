import axios from 'axios'

export const fetchTA= () => {
    return function(dispatch) {

        dispatch({
            type: "FETCH TA",
            payload: []
        })
        axios.get('http://localhost:3001/ta').then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH TA",
                payload: data.data

            })
        })

    }
}