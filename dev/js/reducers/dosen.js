export default function (state = [], action) {
    switch (action.type) {
        case 'DONE FETCH DOSEN':
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;
}
