import axios from 'axios'

export const editUser= (id, nama, email, peran, nim) => {
    return function(dispatch) {

        dispatch({
            type: "EDIT USER"
        })
        console.log (id, nama, email, peran, nim)
        axios.post('http://localhost:3001/node/user/edit', {

            "ids" : [id],
            "objs":[{
                "nama": nama,
                "email": email,
                "peran": peran,
                "NIM": nim
            }],
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (data) {

            dispatch({
                type: "DONE EDIT USER"

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