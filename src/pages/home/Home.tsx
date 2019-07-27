import * as React from 'react'
import { Row, Col } from 'antd'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AsideNav from '@/components/AsideNav'
import Search from './Search'
import './index.less'

class Home extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col span={24}>
          <Header>
            <Search />
          </Header>
        </Col>
        <Col span={4} className="nav-left">
          <AsideNav />
        </Col>
        <Col span={20} className="main">
          <Row className="content">{this.props.children}</Row>
          <Footer />
        </Col>
      </Row>
    )
  }
}

export default Home
