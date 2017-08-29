import axios from 'axios'

export const fetchMhsEvent= (item) => {
    return function(dispatch) {

        dispatch({
            type: "FETCH MHS EVENT",
            payload: []
        })
        axios.post('http://localhost:3001/eventmahasiswa/',{
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