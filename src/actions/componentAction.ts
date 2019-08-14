import { store, Dispatch } from '../index'
import http from '../http/fetch'
import { COMPONENT } from '../constants'

export function getCategoryList() {
    store.dispatch({
        type: COMPONENT.GET_CATEGORY_LIST_REQUEST
    })
    return (dispatch: Dispatch) => {
        http.fetch('component.categorys')
            .then(res => {
                dispatch({
                    type: COMPONENT.GET_CATEGORY_LIST_SUCCESS,
                    categoryList: res
                })
            })
            .catch(err => {
                dispatch({
                    type: COMPONENT.GET_CATEGORY_LIST_FAIL,
                    message: err.message
                })
            })
    }
}
