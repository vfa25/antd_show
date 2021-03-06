import * as React from 'react'
import { Icon, Input, Dropdown, Empty, Menu, Spin } from 'antd'
import _ from 'lodash'
import { NavLink } from 'react-router-dom'
import http, { Canceler } from '@/http/fetch'
import { ItemMenu } from '@/utils/types'

const CancelToken = http.axios.CancelToken

interface SearchState {
    dataSource: React.ReactNode[] | React.ReactNode
    loading: boolean
}

const empty = (
    <Menu.Item>
        <Empty description="暂无数据" />
    </Menu.Item>
)
const spin = (
    <Menu.Item className="spinwrap">
        <Spin size="large" tip="加载中..." />
    </Menu.Item>
)

export default class Search extends React.Component<any, SearchState> {
    private cancel: Canceler | undefined
    private searchInput: any

    constructor(props: any) {
        super(props)
        this.state = {
            dataSource: empty,
            loading: false
        }
    }

    inputChange = () => {
        if (typeof this.cancel === 'function') {
            this.cancel()
        }
        this.setState({ loading: true })
        http.fetch(
            'component.search',
            {
                search: this.searchInput.state.value
            },
            {
                cancelToken: new CancelToken(c => {
                    this.cancel = c
                })
            }
        )
            .then(res => {
                this.renderOptions(res)
            })
            .catch(err => {
                if (!http.axios.isCancel(err)) {
                    this.setState({ loading: false })
                }
            })
    }

    renderOptions(data: any) {
        let dataSource = data.map((group: ItemMenu) => (
            <Menu.SubMenu key={group.id} title={`${group.name} ${group.desc}`}>
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                {group.children!.map(opt => (
                    <Menu.Item key={opt.id}>
                        <NavLink to={`/home${group.key}`}>
                            <Icon type="trophy" />
                            <span className="search-title">{opt.name}</span>
                            <div className="search-brief">
                                {opt.component_brief}
                            </div>
                        </NavLink>
                    </Menu.Item>
                ))}
            </Menu.SubMenu>
        ))
        if (!dataSource || !dataSource.length) {
            dataSource = empty
        }
        this.setState({
            dataSource,
            loading: false
        })
    }

    render() {
        const overlayContent = this.state.loading ? spin : this.state.dataSource
        return (
            <Dropdown
                overlay={<Menu>{overlayContent}</Menu>}
                overlayClassName="dropdown-root"
            >
                <Input
                    ref={ref => {
                        this.searchInput = ref
                    }}
                    width={300}
                    suffix={<Icon type="search" />}
                    className="certain-category-icon"
                    onChange={_.debounce(this.inputChange, 1000)}
                />
            </Dropdown>
        )
    }
}
