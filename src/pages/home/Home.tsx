import * as React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AsideNav from '@/components/AsideNav'
import { getCategoryList } from '@/actions/componentAction'
import Search from './Search'
import './index.less'

interface HomeProps {
    getCategoryList: any
}
class Home extends React.Component<HomeProps> {
    componentDidMount() {
        this.props.getCategoryList()
    }
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

const mapDispatchToProps = {
    getCategoryList
}

export default connect(
    undefined,
    mapDispatchToProps
)(Home)
