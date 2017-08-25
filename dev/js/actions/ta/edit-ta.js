import axios from 'axios'

export const editTA= (item) => {
    return function(dispatch) {

        dispatch({
            type: "EDIT TA"
        })
        axios.post('http://localhost:3001/ta/edit', {
            ids : [item.id],
            objs : [{
                topik: item.topik,
                mahasiswa_id: item.idmhs,
                pembimbings: item.dosbing,
                pengujis: item.dosji,
                akhirs: item.akhir
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