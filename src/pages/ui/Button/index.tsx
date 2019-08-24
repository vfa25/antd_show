import React, { useState, useEffect } from 'react'
import { Card, Icon, Radio } from 'antd'
import { default as Button, ButtonSize } from 'enterprise-antd/es/button'
import button from './button.md'
// import Markdown from '@/components/Markdown'
import './index.less'

function Buttons() {
    const [loadingFirst, setLoadingFirst] = useState(false)
    const [loadingSecond, setLoadingSecond] = useState(false)
    const sizeType: ButtonSize = 'default'
    const [size, setSize] = useState(sizeType)

    const handleSizeChange = (e: any) => {
        setSize(e.target.value)
    }
    return (
        <div>
            <Card className="content-margin">
                <Markdown.render source={button} />
            </Card>
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
                    loading={loadingFirst}
                    onClick={() => {
                        setLoadingFirst(true)
                        setLoadingSecond(false)
                    }}
                >
                    Click me!
                </Button>
                <Button
                    type="primary"
                    icon="poweroff"
                    loading={loadingSecond}
                    onClick={() => {
                        setLoadingFirst(false)
                        setLoadingSecond(true)
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
                <Radio.Group value={size} onChange={handleSizeChange}>
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

export default React.memo(Buttons)
