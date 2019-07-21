import * as React from 'react';
import { Menu } from 'antd';
import http from '@/http/fetch';
import './index.less';

const { SubMenu, Item } = Menu;

interface ItemMenu {
  id: number,
  category_type: number,
  name: string,
  key?: string,
  children?: ItemMenu[]
}

interface AsideNavState {
  menuTreeNode?: React.ReactNode[] | React.ReactNode
}

export default class AsideNav extends React.Component<any, AsideNavState> {
  constructor(props: any) {
    super(props)
    this.state = {
      menuTreeNode: null
    }
  }

  componentDidMount() {
    http.fetch('component.categorys').then(res => {
      let menuConfig = res.data
      const menuTreeNode = this.renderMenu(menuConfig);
      this.setState({
        menuTreeNode
      })
    })
  }

  renderMenu = (data: ItemMenu[]) => {
    return data.map((item) => {
      if (item.children && item.category_type === 1) {
        return (
          <SubMenu title={item.name} key={item.id}>
            { this.renderMenu(item.children) }
          </SubMenu>
        )
      }
      return <Item key={item.id}>{item.name}</Item>;
    })
  }

  render() {
    return (
      <div>
        <div className="logo">
          <h2>Contrast</h2>
          <img src="/assets/logo-antd.svg" alt=""/>
          <h2>And</h2>
          <img className="logo-element" src="/assets/logo-element.svg" alt=""/>
        </div>
        <Menu mode="inline">
          { this.state.menuTreeNode }
        </Menu>
      </div>
    )
  }
}
