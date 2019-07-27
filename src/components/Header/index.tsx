import React from 'react'
import { Row, Col } from 'antd'
import './index.less'

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={4} className="logo">
            <h2>Contrast</h2>
            <img src="/assets/logo-antd.svg" alt="" />
            <h2>And</h2>
            <img className="logo-element" src="/assets/logo-element.svg" alt="" />
          </Col>
          <Col span={6} offset={2}>
            {this.props.children}
          </Col>
          <Col span={12}>
            <span>欢迎你,userName</span>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">退出</a>
          </Col>
        </Row>
      </div>
    )
  }
}
