import * as Cookies from 'js-cookie'
import { store } from '../index'
import { USER } from '../constants'

export function setUserInfo() {
    const username = Cookies.get('username')
    const token = Cookies.get('token')
    return store.dispatch({
        type: USER.SET_USERINFO,
        userInfo: {
            username,
            token
        }
    })
}
