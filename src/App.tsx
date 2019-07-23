import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { getCategoryList } from '@/actions/componentAction'
import AppRouter from './Router'

type HomeProps = {
  getCategoryList: any
}
class App extends React.Component<HomeProps> {
  componentDidMount() {
    this.props.getCategoryList()
  }
  render() {
    return <AppRouter />
  }
}

const mapDispatchToProps = {
  getCategoryList: getCategoryList
}

export default connect(
  undefined,
  mapDispatchToProps
)(hot(App))
