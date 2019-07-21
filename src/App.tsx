import React from 'react';
import { Row, Col } from 'antd';
import { hot } from 'react-hot-loader/root';
import Header from '@/pages/Header';
import Footer from '@/pages/Footer';
import AsideNav from '@/pages/AsideNav';
import Home from '@/pages/home/Home';
import './style/layout.less';


class App extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col span={4} className="nav-left">
          <AsideNav />
        </Col>
        <Col span={20} className="main">
          <Header />
          <Row className="content">
            <Home />
            {/* {this.props.children} */}
          </Row>
          <Footer />
        </Col>
      </Row>
    )
  }
}

export default hot(App);
