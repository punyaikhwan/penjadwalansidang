import axios from 'axios'

export const newRuangan= (nama) => {
    return function(dispatch) {

        dispatch({
            type: "NEW RUANGAN"
        })
        axios.post('http://localhost:3001/ruangan/new', {
            nama: nama
        }).then(function (data) {

            dispatch({
                type: "DONE NEW RUANGAN"

            })
            axios.get('http://localhost:3001/ruangan').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH RUANGAN",
                    payload: data.data

                })
            })
        })

    }
}