export default function (state = false, action) {
    switch (action.type) {
        case 'DONE CHECK TOKEN':
            return true;
            break;
    }
    console.log(action.payload)
    return state;
}
