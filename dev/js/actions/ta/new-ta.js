import axios from 'axios'

export const newTA= (id) => {
    return function(dispatch) {

        dispatch({
            type: "NEW TA"
        })
        axios.post('http://localhost:3001/node/ta/new', {
            mahasiswa_id: id
        }).then(function (data) {

            dispatch({
                type: "DONE NEW TA"

            })
            axios.get('http://localhost:3001/node/ta').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH TA",
                    payload: data.data

                })
            })
        })

    }
}