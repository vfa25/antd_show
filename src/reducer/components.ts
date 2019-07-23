import { COMPONENT } from '../constants'

export type actionType = {
  categoryList?: any
  type: string
  message: string
}

const initState = {
  categoryList: null,
  message: ''
}

export default function components(state = initState, action: actionType) {
  switch (action.type) {
    case COMPONENT.GET_CATEGORY_LIST_REQUEST:
      return { ...state, categoryList: null }
    case COMPONENT.GET_CATEGORY_LIST_SUCCESS:
      return { ...state, categoryList: action.categoryList }
    case COMPONENT.GET_CATEGORY_LIST_FAIL:
      return { ...state, message: action.message }
    default:
      return state
  }
}
