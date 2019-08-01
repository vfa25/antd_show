import * as React from 'react'
import * as Cookies from 'js-cookie'
import { Form, Input, Button, Icon, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { FormComponentProps } from 'antd/es/form'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import http from '@/http/fetch'
import { setUserInfo } from '@/actions/userActions'
import { formErrHandle } from '@/utils/common'
import './index.less'

const { Item } = Form
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mobileReg = /^1[358]\d{9}$|^147\d{8}$|^176\d{8}$/

type storeProps = {
  setUserInfo: any
}

type FromsPropsType = FormComponentProps & RouteComponentProps & storeProps

class Register extends React.Component<FromsPropsType> {
  getCaptcha = () => {
    this.props.form.validateFields(['mobile'], (err, values) => {
      if (!err) {
        http.fetch('user.smscode', { mobile: values.mobile }).then(res => {
          console.log(res)
        })
      }
    })
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        http
          .fetch('user.register.mobile', values)
          .then(res => {
            Cookies.set('username', res.name!, { expires: 7 })
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
          {getFieldDecorator('mobile', {
            initialValue: '',
            rules: [
              { required: true, message: '手机号不可为空' },
              { pattern: mobileReg, message: '请输入11位格式正确的手机号' }
            ]
          })(
            <Input
              prefix={<Icon type="phone" />}
              placeholder="请输入您的手机号"
            />
          )}
        </Item>
        <Item extra="请获取并输入手机短信验证码后提交注册">
          <Row gutter={8}>
            <Col span={13}>
              {getFieldDecorator('smscode', {
                rules: [
                  { required: true, message: '请输入您收到的短信验证码!' }
                ]
              })(
                <Input
                  prefix={<Icon type="code" />}
                  placeholder="请输入手机验证码"
                />
              )}
            </Col>
            <Col span={11} onClick={this.getCaptcha}>
              <Button>免费获取验证码</Button>
            </Col>
          </Row>
        </Item>
        <Item>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [
              { required: true, message: '密码不能为空' },
              { pattern: /^\w+$/g, message: '密码仅能包含字母或数字' },
              { min: 6, max: 20, message: '请输入6-20位长度的密码' }
            ]
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="请输入6-20位由字母或数字组成的密码"
            />
          )}
        </Item>
        <Item>
          <Button type="primary" block onClick={this.submit}>
            注册并登陆
          </Button>
        </Item>
      </Form>
    )
  }
}

const mapDispatchToProps = {
  setUserInfo
}

const FormRegister: React.ComponentType<any> = Form.create()(Register)

const connectRegister: React.ComponentType<any> = connect(
  undefined,
  mapDispatchToProps
)(FormRegister)

export default withRouter(connectRegister)
