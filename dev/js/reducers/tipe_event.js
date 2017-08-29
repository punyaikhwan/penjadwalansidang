export default function (state = 0, action) {
    switch (action.type) {
        case 'TIPE EVENT':
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;
}
