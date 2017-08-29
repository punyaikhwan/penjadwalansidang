export const login= (id) => {
    return function(dispatch) {

        dispatch({
            type: "USER",
            payload: {
                id: 2,
                nama: "Hasna Nur Karimah",
                email: "hasnurk@gmail.com",
                peran: "Dosen"
            }
        })

    }

}