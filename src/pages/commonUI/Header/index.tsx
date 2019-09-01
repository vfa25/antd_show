import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.less'
import { UserLogout, setUserInfo } from '@/actions/userActions'

interface HeaderProps {
    children?: React.ReactNode
}

interface StoreProps {
    userInfo?: any
    UserLogout: any
    setUserInfo: () => {}
}

const Header: React.ComponentType<any> = (props: HeaderProps & StoreProps) => {
    const {
        children,
        userInfo: { username = '' } = {},
        UserLogout,
        setUserInfo
    } = props
    useEffect(() => {
        setUserInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username])
    return (
        <div className="header">
            <Row className="header-top">
                <Col span={4} className="logo">
                    <NavLink to="/home/components">
                        <h2>Contrast</h2>
                        <img src="/assets/logo-antd.svg" alt="" />
                        <h2>And</h2>
                        <img
                            className="logo-element"
                            src="/assets/logo-element.svg"
                            alt=""
                        />
                    </NavLink>
                </Col>
                <Col span={6} offset={2}>
                    {children}
                </Col>
                <Col span={12} className="user-handle">
                    {username ? (
                        <div>
                            <span>欢迎你，{username} </span>
                            <span className="enable-click" onClick={UserLogout}>
                                登出
                            </span>
                        </div>
                    ) : (
                        <NavLink to="/login">登录或注册请点击这儿→</NavLink>
                    )}
                </Col>
            </Row>
        </div>
    )
}

Header.propTypes = {
    children: PropTypes.element
}

const mapStateTpProps = (state: any) => ({
    userInfo: state.getIn(['user', 'userInfo']).toJS()
})

const mapDispatchToProps = {
    setUserInfo,
    UserLogout
}

export default connect(
    mapStateTpProps,
    mapDispatchToProps
)(Header)
