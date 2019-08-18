import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Redirect, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import User from './pages/user'
import Home from './pages/home/Home'
import Detail from './pages/detail/Detail'
import Nomatch from './pages/Nomatch'
import Content from './pages/ui/Content'
import * as UIComponents from './pages/ui'

interface UiType<T> {
    [key: string]: T
}
const ui: UiType<any> = UIComponents

interface RouterProps {
    categoryList: any
}
class AppRouter extends React.Component<RouterProps> {
    render() {
        const categoryList = this.props.categoryList || []
        const routes = categoryList.reduce(
            (total: any[], v: { children: any }) =>
                total.concat(v.children || []),
            []
        )
        return (
            <div>
                <Route
                    path="/"
                    exact
                    render={() => <Redirect to="/home" />}
                    key="/"
                />
                ,
                <Route path="/login" component={User} />
                <Route
                    path="/home"
                    render={() => (
                        <Home>
                            <Switch>
                                <Route path="/home" component={Content} exact />
                                <Route
                                    path="/home/components"
                                    component={Content}
                                    exact
                                />
                                {routes.map(
                                    (v: {
                                        key: string
                                        name: React.ReactText
                                    }) =>
                                        ({}.hasOwnProperty.call(ui, v.name) ? (
                                            <Route
                                                path={`/home${v.key}`}
                                                component={ui[v.name]}
                                                key={v.key}
                                            />
                                        ) : null)
                                )}
                                <Route component={Nomatch} />
                            </Switch>
                        </Home>
                    )}
                />
                <Route path="/detail" component={Detail} />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    categoryList:
        state.getIn(['component', 'categoryList']) &&
        state.getIn(['component', 'categoryList']).toJS()
})

export default connect(mapStateToProps)(AppRouter)
