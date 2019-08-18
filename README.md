# Antd 主页展示

## 简介

这是一个学习项目。fork from [ant-design](https://github.com/ant-design/ant-design) 。

## 搭建

该项目使用了[Create React App](https://github.com/facebook/create-react-app)以快速搭建。

且不再额外定制TsLint规则，参考[#6871](https://github.com/facebook/create-react-app/issues/6871)。

⚠️ TSLint will be deprecated some time in 2019. See this issue for more details: [Roadmap: TSLint → ESLint](https://github.com/palantir/tslint/issues/4534)。

## 本地调试

我希望在该项目目录下引入其他项目`JS文件`目录（如Hooks基础组件目录）

1. 包引入

    - 修改访问路径方式。修改webpack配置：`注释掉模块作用域插件：react-dev-utils/ModuleScopePlugin`，`增加resolve别名resolve.alias`，`修改TS配置字段baseUrl和paths`。
    - 拷贝到node_modules方式。[拷贝脚本](https://github.com/vfa25/ts_hooks_antd/blob/master/copyDirToHomepage.sh)
2. 解决配置1带来的`You might have mismatching versions of React and the renderer (such as React DOM)`多包共存冲突（`node_modules`模块寻址原因，module.paths）。

    `resolve.modules数组最前加入：path.resolve(__dirname, '../node_modules')`，参考官网[resolve.modules](https://webpack.js.org/configuration/resolve/#resolvemodules)。
