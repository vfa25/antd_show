import { USER } from '../constants'

export type userType = {
  userInfo?: object
  type: string
}

const initState = {
  userInfo: {}
}

export default function user(state = initState, action: userType) {
  switch (action.type) {
    case USER.SET_USERINFO:
      return { ...state, userInfo: action.userInfo! }
    default:
      return state
  }
}
