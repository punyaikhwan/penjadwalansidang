export default function (state = [], action) {
    switch (action.type) {
        case 'DONE FETCHING USER':
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;
}
