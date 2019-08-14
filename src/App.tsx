import React from 'react'
import { hot } from 'react-hot-loader/root'
import AppRouter from './Router'

class App extends React.Component {
    render() {
        return <AppRouter />
    }
}

export default hot(App)
