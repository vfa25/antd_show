import * as React from 'react'
import { Form, Input, Button, message, Icon, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import './index.less'

const { Item } = Form

type FromsPropsType = FormComponentProps

class Register extends React.Component<FromsPropsType> {
  submit = () => {
    // const userInfo = this.props.form.getFieldsValue()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${values.username}`)
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
            rules: [
              { required: true, message: '用户名不能为空' },
              { pattern: /^\w+$/g, message: '用户名仅能是字母或数字' }
            ]
          })(
            <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
          )}
        </Item>
        <Item>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [
              { required: true, message: '密码不能为空' },
              { min: 6, message: '密码长度应不小于6' }
            ]
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="请输入密码"
            />
          )}
        </Item>
        <Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>记住密码</Checkbox>)}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="float-right">
            {' '}
            忘记密码
          </a>
        </Item>
        <Item>
          <Button type="primary" onClick={this.submit}>
            注册
          </Button>
        </Item>
      </Form>
    )
  }
}

export default Form.create()(Register)
