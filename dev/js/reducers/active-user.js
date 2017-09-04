import { CookiesProvider, withCookies, Cookies } from 'react-cookie'

const cookies = new Cookies()

var initial_state = {}

if(cookies.get('session')){
    initial_state = cookies.get('session')
}


export default function (state = initial_state, action) {
    switch (action.type) {
        case 'USER':
            console.log(action.payload)
            cookies.set('session', action.payload)
            console.log(cookies.get('session'))
            return action.payload;
            break;
    }
    console.log(action.payload)
    return state;

}