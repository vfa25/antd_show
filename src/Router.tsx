import React, { lazy, Suspense } from 'react'
import { Redirect, Switch, Route, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import User from './pages/user'
import Home from './pages/home/Home'
import Detail from './pages/detail/Detail'
import Nomatch from './baseUI/Nomatch'
import Content from './pages/home/Content'
import allComponents from './pages/ui/index.md'

const ui: React.ReactText[] = allComponents.trim().split(/[\t\n]+/)

interface RouterProps {
    categoryList: any
}
interface ConfigItem {
    key: string
    name: React.ReactText
}
class AppRouter extends React.Component<RouterProps> {
    routeComponents() {
        const categoryList = this.props.categoryList || []
        const routes = categoryList.reduce(
            (total: any[], v: { children: any }) =>
                total.concat(v.children || []),
            []
        )
        const result = routes.map((v: ConfigItem) => {
            if (!ui.includes(v.name)) return null
            const Component = lazy(() =>
                import(
                    /* webpackChunkName: "[request]" */
                    `./pages/ui/${v.name}/index`
                )
            )
            const ComponentWrap = (props: RouteProps) => {
                return (
                    <Suspense fallback={null}>
                        <Component {...props} />
                    </Suspense>
                )
            }
            return (
                <Route
                    path={`/home${v.key}`}
                    component={ComponentWrap}
                    key={v.key}
                />
            )
        })
        return result
    }
    render() {
        return (
            <div>
                <Route path="/" exact render={() => <Redirect to="/home" />} />
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
                                {this.routeComponents()}
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
