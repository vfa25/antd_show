import { fromJS } from 'immutable'
import { COMPONENT } from '../constants'

export interface ComponentType {
    categoryList?: any
    type: string
    message: string
}

const initState = fromJS({
    categoryList: null,
    message: ''
})

export default function component(state = initState, action: ComponentType) {
    switch (action.type) {
        case COMPONENT.GET_CATEGORY_LIST_REQUEST:
            return state.set('categoryList', null)
        case COMPONENT.GET_CATEGORY_LIST_SUCCESS:
            return state.set('categoryList', action.categoryList)
        case COMPONENT.GET_CATEGORY_LIST_FAIL:
            return state.set('message', action.message)
        default:
            return state
    }
}
