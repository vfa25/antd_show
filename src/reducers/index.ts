import { combineReducers } from 'redux-immutable'

import component from './component'
import user from './user'

export default combineReducers({ component, user })
