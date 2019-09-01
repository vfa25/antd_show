# 按钮组件

作为最基础的组件，有着优势的使用广度和易用度。

## 特点

- 正则匹配两个汉字的情况，对按钮做了空格处理

```js
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
```

- 如果有`href`属性，则会做`a标签`处理
- loading的状态同时由内外部共同维护，出发点是loading可以延迟执行，`loading?: boolean | { delay?: number };`。
