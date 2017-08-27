export const fetchEvent= (item) => {
    return function(dispatch) {

        dispatch({
            type: "FETCH EVENT",
            payload: [
                {
                    idEvent: "ytfvhgnhyvgfghhv",
                    title: "Seminar KP Kelompok 1",
                    id: 1,
                    anggota: [
                        {nim: "13514020", nama: 'Ikhwanul Muslimin'},
                        {nim: "13514xxx", nama: 'Febi Agil Ifdillah'},
                        {nim: "13514xxx", nama: 'Hasna Nur Karimah'}
                    ],
                    topik: "Implementasi X pada YYYY",
                    dosen: [
                        {id: "ffdttb", nama: 'Rinaldi Munir'},
                        {id:"yvhjuyi", nama: 'Dessi Puji Lestari'}
                    ],
                    end: new Date("2017-05-01T10:20:00"),
                    room:"7602",
                    start: new Date("2017-05-01T09:40:00"),
                },
                {
                    "idEvent":"59073e7f6f23e457b45319ab",
                    title: "Seminar KP Kelompok 2",
                    "end": new Date("2017-05-22T11:40:00"),
                    room:"7606",
                    "start": new Date("2017-05-22T11:00:00"),
                    id: 2,
                    anggota: [
                        {nim: "13514xxx", nama: 'Dani Sirait'},
                        {nim: "13514xxx", nama: 'Hendrikus Bimawan'},
                        {nim: "13514xxx", nama:'Naufal Malik Rabbani'},
                    ],
                    topik: "Penggunaan Sistem X pada Komputer",
                    dosen: [
                        {id: "ffdttb", nama: 'Masayu'}
                    ],
                },
                {
                    "idStudent":"59073e7f8e9b83bcf82aabb8",
                    "end":new Date("2017-05-24T11:40:00"),
                    "room":"590740f3ae5d1d7bf5f32468",
                    "start": new Date("2017-05-24T11:00:00"),
                    title: "Seminar KP Kelompok 3",
                    id: 1,
                    anggota: [
                        {nim: "13514xxx", nama:'Ikhwanul Muslimin'},
                        {nim: "13514xxx", nama:'Febi Agil Ifdillah'},
                        {nim: "13514xxx", nama:'Hasna Nur Karimah'}
                    ],
                    topik: "Implementasi X pada YYYY",
                    dosen: [
                        {id: "ffdttb", nama: 'Rinaldi Munir'}
                    ],
                }
            ]
        })

    }
}