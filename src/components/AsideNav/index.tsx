import * as React from 'react'
import { Menu } from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './index.less'

const { SubMenu, Item } = Menu

export interface ItemMenu {
  id: number
  category_type: number
  name?: string
  desc: string
  key?: string
  children?: ItemMenu[]
}

interface AsideNavState {
  menuTreeNode?: React.ReactNode[] | React.ReactNode
}

type AsideProps = {
  categoryList: any
}

type AsideNavProps = Partial<AsideProps>

class AsideNav extends React.Component<AsideNavProps, AsideNavState> {
  static getDerivedStateFromProps(nextProps: AsideNavProps, prevState: AsideNavState) {
    if (prevState.menuTreeNode === null && nextProps.categoryList) {
      let menuList = AsideNav.renderMenu(nextProps.categoryList)
      return {
        ...prevState,
        menuTreeNode: menuList
      }
    }
    return null
  }

  static renderMenu(data: ItemMenu[]) {
    return data.map(item => {
      if (item.children && item.category_type === 1) {
        return (
          <SubMenu title={item.desc} key={item.id}>
            {AsideNav.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Item key={item.id}>
          <NavLink to={`/home${item.key}`}>
            {item.name} {item.desc}
          </NavLink>
        </Item>
      )
    })
  }

  constructor(props: AsideNavProps) {
    super(props)
    this.state = {
      menuTreeNode: null
    }
  }

  render() {
    return (
      <div>
        <div className="logo">
          <h2>Contrast</h2>
          <img src="/assets/logo-antd.svg" alt="" />
          <h2>And</h2>
          <img className="logo-element" src="/assets/logo-element.svg" alt="" />
        </div>
        <Menu mode="inline">{this.state.menuTreeNode}</Menu>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  categoryList: state.components.categoryList
})

export default connect(mapStateToProps)(AsideNav)
