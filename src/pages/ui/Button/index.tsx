import React from 'react'
import { Card, Icon, Radio } from 'antd'
import { default as Button, ButtonSize } from 'enterprise/es/button'
import './index.less'

interface ButtonsState {
    loadingFirst: boolean
    loadingSecend: boolean
    size?: ButtonSize
}
export default class Buttons extends React.Component<any, ButtonsState> {
    constructor(props: any) {
        super(props)
        this.state = {
            loadingFirst: false,
            loadingSecend: false,
            size: 'default'
        }
    }
    handleSizeChange = (e: any) => {
        this.setState({ size: e.target.value })
    }
    render() {
        const { size } = this.state
        return (
            <div>
                <Card title="基础按钮" className="content-margin">
                    <Button>默认按钮</Button>
                    <Button type="primary">主按钮</Button>
                    <Button type="dashed">虚线按钮</Button>
                    <Button type="danger">Error按钮</Button>
                    <Button disabled>禁用按钮</Button>
                </Card>
                <Card title="图形按钮" className="content-margin">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button type="primary" shape="circle" icon="search" />
                    <Button type="primary" icon="search">
                        Search
                    </Button>
                    <Button type="dashed" shape="circle" icon="search" />
                    <Button type="dashed" icon="search">
                        Search
                    </Button>
                </Card>
                <Card title="加载按钮" className="content-margin">
                    <Button type="primary" loading>
                        Loading
                    </Button>
                    <Button shape="circle" loading />
                    <Button type="primary" shape="circle" loading />
                    <Button
                        type="primary"
                        loading={this.state.loadingFirst}
                        onClick={() => {
                            this.setState({
                                loadingFirst: true,
                                loadingSecend: false
                            })
                        }}
                    >
                        Click me!
                    </Button>
                    <Button
                        type="primary"
                        icon="poweroff"
                        loading={this.state.loadingSecend}
                        onClick={() => {
                            this.setState({
                                loadingFirst: false,
                                loadingSecend: true
                            })
                        }}
                    >
                        Click me!
                    </Button>
                </Card>
                <Card>
                    <Button.Group>
                        <Button type="primary">
                            <Icon type="left" />
                            Go back
                        </Button>
                        <Button type="primary">
                            Go forward
                            <Icon type="right" />
                        </Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="content-margin">
                    <Radio.Group value={size} onChange={this.handleSizeChange}>
                        <Radio.Button value="large">Large</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="small">Small</Radio.Button>
                    </Radio.Group>
                    <br />
                    <br />
                    <Button type="primary" size={size}>
                        Primary
                    </Button>
                    <Button size={size}>Normal</Button>
                    <Button type="dashed" size={size}>
                        Dashed
                    </Button>
                    <Button type="danger" size={size}>
                        Danger
                    </Button>
                    <Button type="link" size={size}>
                        Link
                    </Button>
                    <Button
                        type="primary"
                        shape="circle"
                        icon="download"
                        size={size}
                    />
                    <Button
                        type="primary"
                        shape="round"
                        icon="download"
                        size={size}
                    >
                        Download
                    </Button>
                    <Button type="primary" icon="download" size={size}>
                        Download
                    </Button>
                    <Button.Group size={size}>
                        <Button type="primary">
                            <Icon type="left" />
                            Backward
                        </Button>
                        <Button type="primary">
                            Forward
                            <Icon type="right" />
                        </Button>
                    </Button.Group>
                </Card>
            </div>
        )
    }
}
