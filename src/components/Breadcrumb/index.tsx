import React from 'react'
import { Row, Col } from 'antd'
import './index.less'

export default class Header extends React.Component {
  render() {
    return (
      <Row className="breadcrumb">
        <Col span={4} className="breadcrumb-title">
          面包屑
        </Col>
      </Row>
    )
  }
}
