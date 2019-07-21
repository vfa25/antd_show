import React from 'react';
import { Row, Col } from 'antd';
import './index.less';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎你,userName</span>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            面包屑
          </Col>
        </Row>
      </div>
    )
  }
}
