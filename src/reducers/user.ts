import { fromJS } from 'immutable'
import { USER } from '../constants'

export interface UserType {
    userInfo?: object
    type: string
}

const initState = fromJS({
    userInfo: {}
})

export default function user(state = initState, action: UserType) {
    switch (action.type) {
        case USER.SET_USERINFO:
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return state.set('userInfo', action.userInfo!)
        case USER.LOGOUT:
            return state.set('userInfo', fromJS({}))
        default:
            return state
    }
}
