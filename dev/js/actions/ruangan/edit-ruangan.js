import axios from 'axios'

export const editRuangan= (item) => {
    return function(dispatch) {
        var id = []
        var obj = []
        item.forEach(function (kelompok) {
            if (kelompok.isEdit == 1){
                id.push(kelompok.id);
                obj.push(kelompok.event)
            }
        })
        dispatch({
            type: "EDIT RUANGAN"
        })
        axios.post('http://localhost:3001/node/ruangan/edit', {
            ids : id,
            objs : obj
        }).then(function (data) {

            dispatch({
                type: "DONE EDIT RUANGAN"

            })
            axios.get('http://localhost:3001/node/ruangan').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH RUANGAN",
                    payload: data.data

                })
            })
        })

    }
}