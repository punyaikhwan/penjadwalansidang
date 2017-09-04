import { CookiesProvider, withCookies, Cookies } from 'react-cookie'

const cookies = new Cookies()

export const logout = () => {
    return function(dispatch){
        dispatch({
            type: 'USER',
            payload: {}
        })


        cookies.remove('sessionId')
    }
};


