export default function (state = {}, action) {
    switch (action.type) {
        case 'USER':
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;

}