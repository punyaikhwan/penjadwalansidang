import axios from 'axios'

export const newUser= (nama, email, peran, nim) => {
    return function(dispatch) {

        dispatch({
            type: "NEW USER"
        })
        axios.post('http://localhost:3001/node/user/new', {
            "obj":{
                "nama": nama,
                "email": email,
                "peran": peran,
                "NIM": nim
            }
        }).then(function (data) {

            dispatch({
                type: "DONE NEW USER"

            })
            axios.get('http://localhost:3001/node/user').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH USER",
                    payload: data.data

                })
            })
        })

    }
}