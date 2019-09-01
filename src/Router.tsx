import React, { lazy, Suspense } from 'react'
import { Redirect, Switch, Route, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import hljs from 'highlight.js'
import Home from './pages/home/Home'
import allComponents from './components/index.md'

const ui: React.ReactText[] = allComponents.trim().split(/[\t\n]+/)

interface RouterProps {
    categoryList: any
}
interface ConfigItem {
    key: string
    name: React.ReactText
}
class AppRouter extends React.Component<RouterProps> {
    lazyRoute = (relativePath: string) => {
        const Component = lazy(() => {
            const lazyPackage = import(
                /* webpackChunkName: "[request]" */
                `./${relativePath}`
            )
            lazyPackage.then(this.nextTick)
            return lazyPackage
        })
        const ComponentWrap = (props: RouteProps) => {
            return (
                <Suspense fallback={null}>
                    <Component {...props} />
                </Suspense>
            )
        }
        return ComponentWrap
    }
    routeComponents() {
        const categoryList = this.props.categoryList || []
        const routes = categoryList.reduce(
            (total: any[], v: { children: any }) =>
                total.concat(v.children || []),
            []
        )
        const result = routes.map((v: ConfigItem) => {
            if (!ui.includes(v.name)) return null
            return (
                <Route
                    path={`/home${v.key}`}
                    component={this.lazyRoute(`components/${v.name}`)}
                    key={v.key}
                />
            )
        })
        return result
    }

    nextTick = () => {
        setTimeout(() => {
            const blocks = document.querySelectorAll('pre code:not(.hljs)')
            Array.prototype.forEach.call(blocks, hljs.highlightBlock)
        }, 15)
    }

    render() {
        const { lazyRoute } = this
        return (
            <div>
                <Route path="/" exact render={() => <Redirect to="/home" />} />
                <Route path="/login" component={lazyRoute(`pages/user`)} />
                <Route
                    path="/home"
                    render={() => (
                        <Home>
                            <Switch>
                                <Route
                                    path="/home"
                                    component={lazyRoute(`components/Welcome`)}
                                    exact
                                />
                                <Route
                                    path="/home/components"
                                    component={lazyRoute(`components/Welcome`)}
                                    exact
                                />
                                {this.routeComponents()}
                                <Route
                                    component={lazyRoute(`pages/home/Nomatch`)}
                                />
                            </Switch>
                        </Home>
                    )}
                />
                <Route
                    path="/detail"
                    component={lazyRoute(`pages/detail/Detail`)}
                />
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
