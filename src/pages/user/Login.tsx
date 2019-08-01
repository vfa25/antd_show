import * as React from 'react'
import * as Cookies from 'js-cookie'
import { Form, Input, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import { FormComponentProps } from 'antd/es/form'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import http from '@/http/fetch'
import { setUserInfo } from '@/actions/userActions'
import { formErrHandle } from '@/utils/common'
import './index.less'

const { Item } = Form

type storeProps = {
  setUserInfo: any
}

type FromsPropsType = FormComponentProps & RouteComponentProps & storeProps

class Login extends React.Component<FromsPropsType> {
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        http
          .fetch('user.login', values)
          .then(res => {
            Cookies.set('username', values.username, { expires: 7 })
            Cookies.set('token', res.token, { expires: 7 })
            this.props.setUserInfo()
            this.props.history.replace('/home')
          })
          .catch(err => {
            if (String(err.data) === '[object Object]') {
              this.props.form.setFields(formErrHandle(values, err.data))
            }
          })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="horizontal" className="width-300">
        <Item>
          {getFieldDecorator('username', {
            initialValue: '',
            rules: [{ required: true, message: '用户名不能为空' }]
          })(
            <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
          )}
        </Item>
        <Item>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [{ required: true, message: '密码不能为空' }]
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="请输入密码"
            />
          )}
        </Item>
        <Item>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="float-right">
            {' '}
            忘记密码
          </a>
        </Item>
        <Item>
          <Button type="primary" block onClick={this.submit}>
            登录
          </Button>
        </Item>
      </Form>
    )
  }
}

const mapDispatchToProps = {
  setUserInfo
}

const FormLogin: React.ComponentType<any> = Form.create()(Login)

const connectLogin: React.ComponentType<any> = connect(
  undefined,
  mapDispatchToProps
)(FormLogin)

export default withRouter(connectLogin)
