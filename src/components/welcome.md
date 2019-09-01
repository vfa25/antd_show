# 一起来探索前端组件库

基于ant-design v3.22.1 和 element-ui v2.11.1。

## 来制定一个目标吧

对`AntD`的实现了如执掌，学习到复杂组件的实现思路，提升自己的技术能力。

当我爬了antd官方文档的代码块，竟然有450个之多，加之又有了其他关注重点，对学习组件库感觉有点力有不逮，

幸而 **黄轶老师** 在 **公众号(gh_91cd60807c60)** 开始剖析`element-ui`源码，感觉自己又意志重燃了。

对于每一个组件，会首先分析组件的作用、使用方法，设计思路，然后再去分析它的实现细节和原理，同时里面也会融入自己浅薄的思考。

## 更新计划

以`React Hooks`重写组件，和增加`markdown`注解，会分别提前和滞后于 **黄轶老师** 在公众号的同类内容发文，原由是已计划花更多的精力去学习数据结构和算法。

## 需求分析

- 丰富的feature：丰富的组件，自定义主题，国际化。
- 安装 & 引入：支持 npm 方式和 cdn 方式，并支持按需引入。

## 丰富的feature

### 丰富的组件

`antd`官方目前有 63 个组件，分别有 7 大类，分别是通用、布局、导航、数据录入、数据展示、反馈、其他。

`element-ui`官方目前有 55 个组件，分成了 6 大类，分别是基础组件、表单类组件、数据类组件、提示类组件、导航类组件和其它类型组件。

二者分别满足了 React 或 Vue 技术栈的大部分 PC 端`toB`业务的开发需求。

正向我开头所言，以antd为例，就算我一天开发一个代码块的组件，也需要一年半之久才可以完成，感谢`ant design`和`element-ui`团队提供了这么优秀的开源基础组件。

### 自定义主题

这点`antd`和`element-ui`均支持定制主题，而后者还可即时查看全局和组件的`Design Tokens`（设计词元）修改，如下图：

![element-ui主题](https://imgs.vfa25.cn/theme-custom.72d0d870.png)

`element-ui`组件的样式、公共样式在`packages/theme-chalk`文件中，
`antd`组件的样式、公共样式在`components/config-provider`。

分别借助`less`和`scss`CSS预处理器，只要修改这些变量，就可以实现组件的主题改变。

而`element-ui`的线上主题更改，原理很简单————请求了个CSS文本，动态插入到`head`标签的底部，来覆盖默认样式；不过这必需要`Node Server`的配合。

![element-ui主题的post请求](https://imgs.vfa25.cn/theme-xhr.ce13bc50.png)

相关代码在`examples/components/theme/loader/index.vue`

```js
export default{
    methods: {
        onAction() {
            this.triggertProgressBar(true);
            const time = +new Date();
            updateVars(this.userConfig)
            .then(res => {
                this.applyStyle(res, time);
            })
            .catch(err => {
                this.onError(err);
            })
            .then(() => {
                this.triggertProgressBar(false);
            });
        },
        applyStyle(res, time) {
            if (time < this.lastApply) return;
            this.updateDocs(() => {
            updateDomHeadStyle('chalk-style', res);
            });
            this.lastApply = time;
        },
    }
}
```

### 国际化

所有的国际化都会用到语言包，语言包通常会返回个`JSON`格式的数据；

- `antd`组件库的语言包在`components/locale`目录下

    以英文`en_US`为例，对于某一国际化字段

    ```js
    export default {
        locale: 'en',
        Upload: {
            uploading: 'Uploading...',
        },
        // ...
    }
    ```

    来看一下使用方法，倒序。

    ```js
    // 渲染国际化字段的位置，在/components/upload/UploadList.tsx中
    const { locale, ... } = this.props;
    {locale.uploading} // jsx语法
    // UploadList渲染位置，也就是说this.props.locale哪儿来的呢，在/components/upload/Upload.tsx中
    <LocaleReceiver componentName="Upload" defaultLocale={defaultLocale.Upload}>
        {this.renderUploadList}
    </LocaleReceiver>
    // 查看易知renderUploadList就是个函数，返回React.ReactNode：<UploadList upload={...} />
    // 有必要过一下LocaleReceiver组件的实现，在components/locale-provider/LocaleReceiver.jsx中
    render() {
        return this.props.children(this.getLocale(), this.getLocaleCode(), this.context.antLocale);
    }
    // 其中this.context.antLocale，在components/locale-provider/index.jsx中，没错，这里是Context API（不过getChildContext将废弃）
    class LocaleProvider {
        // ...
        static childContextTypes = {
            antLocale: PropTypes.object,
        };
        getChildContext() {
            return {
                antLocale: {
                    ...this.props.locale,
                    exist: true,
                },
            };
        }
        render() {
            return this.props.children;
        }
        // ...
    }
    // 至此，结构很清晰，LocaleProvider 组件使用了 Context API，用户传入 locale 这个JSON，即可实现国际化
    ```

    通过`defaultLocale.Upload`进行`props传入`且`this.props.locale.uploading`使用语言包。
- `element-ui`组件库的语言包在`src/locale/lang`目录下

    ```js
    export default {
        el: {
            colorpicker: {
            confirm: 'OK',
            clear: 'Clear'
            }
            // ...
        }
    }

    // 通过模板方法使用 packages/color-picker/src/components/picker-dropdown.vue
    <el-button
        size="mini"
        type="text"
        class="el-color-dropdown__link-btn"
        @click="$emit('clear')">
        {{ t('el.colorpicker.clear') }}
    </el-button>
    // t 函数，定义在 src/mixins/locale.js 中
    import { t } from 'element-ui/src/locale';

    export default {
        methods: {
            t(...args) {
                return t.apply(this, args);
            }
        }
    };
    // 实际上是在 src/locale/index.js 中定义的 t 函数：

    // 辅助函数：i18nHandler 是一个 i18n 的处理函数，用来兼容外部的 i18n 方案如 vue-i18n。
    let i18nHandler = function() {
        const vuei18n = Object.getPrototypeOf(this || Vue).$t; // Vue.protoType.$t函数，这是 vue-i18@5.x 的实现
        if (typeof vuei18n === 'function' && !!Vue.locale) {
            if (!merged) {
                merged = true;
                Vue.locale(
                    Vue.config.lang,
                    deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
                );
            }
            return vuei18n.apply(this, arguments);
        }
    };
    // 即通过path路径，如el.colorpicker.confirm找到对应文案。
    export const t = function(path, options) {
        let value = i18nHandler.apply(this, arguments);
        if (value !== null && value !== undefined) return value;

        const array = path.split('.');
        let current = lang; // 当前语言

        for (let i = 0, j = array.length; i < j; i++) {
        // 从语言包对象中 根据解析的path路径 读到对应的字符串值，如果字符串需要格式化则调用 format 函数
            const property = array[i];
            value = current[property];
            if (i === j - 1) return format(value, options);
            if (!value) return '';
            current = value;
        }
        return '';
    };
    // 暴露 i18n 方法，可以外部传入其它的 i18n 方法，覆盖 i18nHandler
    export const i18n = function(fn) {
        i18nHandler = fn || i18nHandler;
    };

    let lang = defaultLang; // 默认中文
    export const use = function(l) {
        lang = l || lang;
    };

    // 因此使用很简单
    import lang from 'element-ui/lib/locale/lang/en'
    import locale from 'element-ui/lib/locale'
    // 必须要设置语言
    locale.use(lang)
    ```

## 安装 & 引入

### 按需引入

- `antd`使用了`babel-plugin-import`

    等有时间会分析一波[babel-plugin-import源码](http://doc.vfa25.cn/doc/frontEnd/babel/plugin.html#reference)，babelrc配置如下：

    ```js
    {
        "plugins": [
            ["import", {
                "libraryName": "antd",
                "style": true,   // or 'css'
            }]
        ]
    }

    ```

- `element-ui`使用了`babel-plugin-component`

    ```js
    {
        "presets": [["es2015", { "modules": false }]], // plugins会先于presets执行，这个false是babel不转换ESModule，但会走webpack的模块化规则
        "plugins": [
            [
                "component",
                {
                    "libraryName": "element-ui",
                    "styleLibraryName": "theme-chalk"
                }
            ]
        ]
    }
    ```

按需引入+babel编译带来的问题：由于每个包都需要经过 babel 编译发布后才能被主应用使用，而这个编译过程往往会附加很多“编译代码”。

场景：Table 组件依赖了 CheckBox 组件，那么当我同时引入了 Table 组件和 CheckBox 组件的时候，会不会产生代码冗余。

会！

故`element-ui`在`build/config.js`做了这些配置

```js
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`element-ui/packages/${key}`] = `element-ui/lib/${key}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;
```

将其赋值给 webpack 配置中的 config.externals，

那么可以防止将这些 import 的包打包到 bundle 中，并在运行时再去从外部获取这些扩展依赖。

`npm run dist`，来看一下打包后的 lib/table.js，我们可以看到编译后的 table.js 对 CheckBox 组件的依赖引入：

```js
module.exports = require("element-ui/lib/checkbox");
```

这样，确实处理了JS部分的冗余情况，但是对于 CSS 部分，element-ui 并未处理冗余情况，

可以看到 lib/theme-chalk/checkbox.css 和  lib/theme-chalk/table.css 中都会有 CheckBox 组件的 CSS 样式。

**解决之道**：
[webpack 应用编译优化之路————后编译](https://juejin.im/post/59dc57f2f265da431d3ba2ef)
