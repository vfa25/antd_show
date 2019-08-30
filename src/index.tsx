import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import Redux, { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducer'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './assets/global-class.less'
import 'highlight.js/styles/vs2015.css'

const isDev = process.env.NODE_ENV === 'development'
declare var window: Window & { __REDUX_DEVTOOLS_EXTENSION__: any }

const allMiddles: Redux.Middleware[] = [thunk]
isDev && allMiddles.push(logger)

export * from 'redux'
export const store = createStore(
    reducers,
    isDev && window
        ? compose(
              applyMiddleware(...allMiddles),
              window.hasOwnProperty('__REDUX_DEVTOOLS_EXTENSION__') &&
                  window.__REDUX_DEVTOOLS_EXTENSION__()
          )
        : applyMiddleware(...allMiddles)
)

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
