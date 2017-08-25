import axios from 'axios'

export const editKP= (item) => {
    return function(dispatch) {

        dispatch({
            type: "EDIT KP"
        })
        axios.post('http://localhost:3001/kp/edit', {
            ids : [item.id],
            objs : [{
                topik: item.topik,
                anggotas: item.anggota,
                pembimbings: item.dosen
            }]
        }).then(function (data) {

            dispatch({
                type: "DONE EDIT KP"

            })
            axios.get('http://localhost:3001/kp').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH KP",
                    payload: data.data

                })
            })
        })

    }
}