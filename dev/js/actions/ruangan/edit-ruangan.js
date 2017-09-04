import axios from 'axios'
import {nodeURL} from '../config.js'

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
        axios.post(nodeURL+'/ruangan/edit', {
            ids : id,
            objs : obj
        }).then(function (data) {

            dispatch({
                type: "DONE EDIT RUANGAN"

            })
            axios.get(nodeURL+'/ruangan').then(function (data) {
                console.log(data.data)

                dispatch({
                    type: "DONE FETCH RUANGAN",
                    payload: data.data

                })
            })
        })

    }
}