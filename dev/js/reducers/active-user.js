export default function (state = {}, action) {
    switch (action.type) {
        case 'USER':
            console.log(action.payload)
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;

}