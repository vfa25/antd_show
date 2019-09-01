import * as React from 'react'
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import './index.less'

const { Item } = Form

type FromsPropsType = FormComponentProps

class Forms extends React.Component<FromsPropsType> {
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
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <Item>
                            <Input placeholder="请输入用户名" />
                        </Item>
                        <Item>
                            <Input placeholder="请输入密码" />
                        </Item>
                        <Item>
                            <Button type="primary">登录</Button>
                        </Item>
                    </Form>
                </Card>
                <Card title="登录水平表单" className="margin-top-5">
                    <Form layout="horizontal" className="width-300">
                        <Item>
                            {getFieldDecorator('username', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        message: '用户名不能为空'
                                    },
                                    {
                                        pattern: /^\w+$/g,
                                        message: '用户名仅能是字母或数字'
                                    }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="user" />}
                                    placeholder="请输入用户名"
                                />
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
                                登录
                            </Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(Forms)
