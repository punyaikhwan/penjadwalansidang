import axios from 'axios'

export const editTA= (id, idmhs, topik, dosbing, dosji, akhir) => {
    return function(dispatch) {

        dispatch({
            type: "EDIT TA"
        })
        axios.post('http://localhost:3001/ta/edit', {
            ids : [id],
            objs : [{
                topik: topik,
                mahasiswa_id: idmhs,
                pembimbings: dosbing,
                pengujis: dosji,
                akhirs: akhir
            }]
        }).then(function (data) {

            dispatch({
                type: "DONE EDIT TA"

            })
            axios.get('http://localhost:3001/ta').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH TA",
                    payload: data.data

                })
            })
        })

    }
}