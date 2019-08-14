import { USER } from '../constants'

export interface UserType {
    userInfo?: object
    type: string
}

const initState = {
    userInfo: {}
}

export default function user(state = initState, action: UserType) {
    switch (action.type) {
        case USER.SET_USERINFO:
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return { ...state, userInfo: action.userInfo! }
        default:
            return state
    }
}
