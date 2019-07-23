import * as React from 'react'
import { Row, Col } from 'antd'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AsideNav from '@/components/AsideNav'
import './index.less'

class Home extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col span={4} className="nav-left">
          <AsideNav />
        </Col>
        <Col span={20} className="main">
          <Header />
          <Row className="content">{this.props.children}</Row>
          <Footer />
        </Col>
      </Row>
    )
  }
}

export default Home
