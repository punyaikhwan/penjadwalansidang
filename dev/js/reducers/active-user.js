export default function (state = {}, action) {
    switch (action.type) {
        case 'USER':
            return action.payload;
            break;
    }
    console.log(action.payload)
    return {
        id: 8,
        nama: "Hasna Nur Karimah",
        email: "hasnurk@gmail.com",
        peran: "Dosen"
    };

}