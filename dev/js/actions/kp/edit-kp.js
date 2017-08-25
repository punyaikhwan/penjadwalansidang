import axios from 'axios'

export const editKP= (item) => {
    return function(dispatch) {
        var id = []
        var obj = []
        item.forEach(function (kelompok) {
            if (kelompok.isEdit == 1){
                id.push(kelompok.id);
                var anggota = []
                var pembimbing = []
                kelompok.anggota.forEach(function(ang){
                    anggota.push(ang.user.id)
                })
                kelompok.dosen.forEach(function(ang){
                    pembimbing.push(ang.user.id)
                })
                var object = {
                    topik: kelompok.topik,
                    anggotas: anggota,
                    pembimbings: pembimbing
                }
                obj.push(object)
            }
        })
        dispatch({
            type: "EDIT KP"
        })
        axios.post('http://localhost:3001/kp/edit', {
            ids : id,
            objs : obj
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