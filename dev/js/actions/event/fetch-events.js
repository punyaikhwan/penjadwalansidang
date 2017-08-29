import axios from 'axios'

export const fetchEvent= (item) => {
    return function(dispatch) {

        dispatch({
            type: "FETCH EVENT",
            payload: []
        })
        axios.get('http://localhost:3001/events').then(function (data) {
            console.log(data.data)

            dispatch({
                type: "DONE FETCH EVENT",
                payload: data.data

            })
        })
    }

}