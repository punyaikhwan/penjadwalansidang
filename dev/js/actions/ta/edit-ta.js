import axios from 'axios'

export const editTA= (item) => {
    return function(dispatch) {
        var id = []
        var obj = []
        item.forEach(function (kelompok) {
            if (kelompok.isEdit == 1){
                id.push(kelompok.id);
                var pembimbing = []
                var penguji = []
                var akhir = []
                kelompok.pembimbing.forEach(function(ang){
                    pembimbing.push(ang.user.id)
                })
                kelompok.penguji.forEach(function(ang){
                    penguji.push(ang.user.id)
                })
                kelompok.pembimbing.forEach(function(ang){
                    akhir.push(ang.user.id)
                })
                var object = {
                    topik: kelompok.topik,
                    mahasiswa_id: kelompok.mahasiswa.id,
                    pembimbings: pembimbing,
                    pengujis: penguji,
                    akhirs: akhir,
                }
                obj.push(object)
            }
        })

        dispatch({
            type: "EDIT TA"
        })
        axios.post('http://localhost:3001/ta/edit', {
            ids : id,
            objs : obj
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