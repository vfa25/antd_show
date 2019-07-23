import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/home/Home'
import Detail from './pages/detail/Detail'
import Nomatch from './pages/Nomatch'
import Button from './pages/ui/Button'

export default class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Route path="/login" component={Login}></Route>
        <Route
          path="/home"
          render={() => (
            <Home>
              <Switch>
                <Route path="/home/components/button-cn/" component={Button}></Route>
                <Route component={Nomatch}></Route>
              </Switch>
            </Home>
          )}
        ></Route>
        <Route path="/detail" component={Detail}></Route>
      </div>
    )
  }
}
