import * as React from 'react'
import { Menu } from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ItemMenu } from '@/types'
import './index.less'

const { SubMenu, Item } = Menu

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
      if (item.children) {
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
        <Menu mode="inline">{this.state.menuTreeNode}</Menu>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  categoryList: state.components.categoryList
})

export default connect(mapStateToProps)(AsideNav)
