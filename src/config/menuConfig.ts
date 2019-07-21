const menuList = [
  {
    title: '首页',
    key: '/home/index'
  },
  {
    title: 'UI',
    key: '/home/ui',
    children: [
      {
        title: '按钮',
        key: '/home/ui/buttons',
      },
      {
        title: '弹框',
        key: '/home/ui/modals',
      },
      {
        title: 'Loading',
        key: '/home/ui/loadings',
      },
      {
        title: '通知提醒',
        key: '/home/ui/notification',
      },
      {
        title: '全局Message',
        key: '/home/ui/messages',
      },
      {
        title: 'Tab页签',
        key: '/home/ui/tabs',
      },
      {
        title: '图片画廊',
        key: '/home/ui/gallery',
      },
      {
        title: '轮播图',
        key: '/home/ui/carousel',
      }
    ]
  },
  {
    title: '表单',
    key: '/home/form',
    children: [
      {
        title: '登录',
        key: '/home/form/login',
      },
      {
        title: '注册',
        key: '/home/form/reg',
      }
    ]
  },
  {
    title: '表格',
    key: '/home/table',
    children: [
      {
        title: '基础表格',
        key: '/home/table/basic',
      },
      {
        title: '高级表格',
        key: '/home/table/high',
      }
    ]
  },
  {
    title: '富文本',
    key: '/home/rich'
  },
  {
    title: '城市管理',
    key: '/home/city'
  },
  {
    title: '订单管理',
    key: '/home/order',
    btnList: [
      {
        title: '订单详情',
        key: 'detail'
      },
      {
        title: '结束订单',
        key: 'finish'
      }
    ]
  },
  {
    title: '员工管理',
    key: '/home/user'
  },
  {
    title: '车辆地图',
    key: '/home/bikeMap'
  },
  {
    title: '图标',
    key: '/home/charts',
    children: [
      {
        title: '柱形图',
        key: '/home/charts/bar'
      },
      {
        title: '饼图',
        key: '/home/charts/pie'
      },
      {
        title: '折线图',
        key: '/home/charts/line'
      },
    ]
  },
  {
    title: '权限设置',
    key: '/home/permission'
  },
];
export default menuList;
