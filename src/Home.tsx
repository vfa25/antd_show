import React from 'react';
import { Row, Col } from 'antd';
import Header from '@/pages/Header';
import Footer from '@/pages/Footer';
import AsideNav from '@/pages/AsideNav';

export default class Home extends React.Component {
  render() {
    return (
      <Row>
        <Col span={3}>
          <AsideNav />
        </Col>
        <Col span={21}>
          <Header />
          <Row>
            Content
          </Row>
          <Footer />
        </Col>
      </Row>
    )
  }
}
