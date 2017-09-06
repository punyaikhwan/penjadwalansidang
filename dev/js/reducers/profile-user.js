import { CookiesProvider, withCookies, Cookies } from 'react-cookie'

const cookies = new Cookies()

var initial_state = {}


export default function (state = initial_state, action) {
    switch (action.type) {
        case 'DONE PROFILE':
            console.log(action.payload)
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;

}