import React from 'react';
import { Row, Col } from 'antd';
import Header from '@/pages/Header';
import Footer from '@/pages/Footer';
import AsideNav from '@/pages/AsideNav';
import './style/common.less';


export default class Home extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col span={4} className="nav-left">
          <AsideNav />
        </Col>
        <Col span={20} className="main">
          <Header />
          <Row className="content">
            content
            {this.props.children}
          </Row>
          <Footer />
        </Col>
      </Row>
    )
  }
}
