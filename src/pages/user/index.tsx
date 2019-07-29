import * as React from 'react'
import { Card } from 'antd'
import Login from './Login'
import Register from './Register'
import './index.less'

interface enumMap<T> {
  [key: string]: T
}

const contentList: enumMap<any> = {
  login: <Login />,
  register: <Register />
}
const tabList = [
  { key: 'login', tab: '登录' },
  { key: 'register', tab: '注册' }
]

export default class User extends React.Component {
  state = {
    key: 'login'
  }
  render() {
    return (
      <div className="login-container">
        <Card
          title="让我们开始探索吧"
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.setState({ key })
          }}
        >
          {contentList[this.state.key]}
        </Card>
      </div>
    )
  }
}
