---
title: 写给自己的JavaScript系列之一步步写个 JavaScript 解释器
date: 2019-03-11 22:20:21
updated: 2019-04-23 22:20:21
tags:
categories: 编程
---

为了更好的理解 JavaScript 的各种语言特性，更好的掌握 JavaScript 的底层原理 😄。我想动手写一个 JavaScript 版的 JavaScript 解释器。简单来说，就是能够运行 JavaScript（以下简称 js ） 代码。我们平时写的 js 代码一般由浏览器或者 Nodejs 的解释器来解释并执行，本文的目标就是写一个能够解释 js 代码的解释器 🚀。

写一个解释器的工程，想一想就感觉好大。咱们可以拆解一下，一步步来。每实现一个小目标都会很有成就感，不至于望而却步 🐶。

## 第一阶段的目标

✅ 1、首先实现打印值

```js
const x = 'Hello World!';
console.log(x);
```

2、然后实现加减乘除四则运算

```js
const x = 1, y = 2;
console.log(x + y);
```

3、然后我们实现函数

```js
function add(x, y) {
  return x + y;
}
console.log(add(1,2));
```

4、趁热打铁实现闭包。

> 实现闭包其实我想写一个 js 解释器的初始动机，我本来在写一篇解释什么是 js 闭包的文章，但是我写着写着感觉有点无聊，没什么意思，就想实现个 js 解释器。 从另一个角度理解这个问题。

6、实现 if 条件表达式

7、实现 for 循环

8、打包 js 可以在其他文件内使用

> 将执行结果输出到外部

上面是我的玩具计划。

😌 ------------------------ 这是一条分割线 ---------------------- 😌

下面是我的开发过程。

## 参考资料

我找到的一些用 js 实现 js 解释器的文章：

* [微信小程序也要强行热更代码，鹅厂不服你来肛我呀](https://zhuanlan.zhihu.com/p/34191831)
* [从零开始写一个Javascript解析器](https://juejin.im/post/5aa25be1518825557b4c5720#heading-11)
* [前端与编译原理——用JS写一个JavaScript解释器](https://segmentfault.com/a/1190000017241258)

和上面文章相关的 Github 上的 JavaScript 解释器源码

> 前三个是 TypeScript 项目，最后一个是 JavaScript 项目

* [jsjs](https://github.com/bramblex/jsjs)
* [evil-eval](https://github.com/jkeylu/evil-eval)
* [vm.js](https://github.com/axetroy/vm.js)
* [canjs](https://github.com/jrainlau/canjs)

## 热身

JavaScript 代码转化成抽象语法树（AST）这一步，直接用现成的库实现。这里我们使用 [`acorn`](https://github.com/acornjs/acorn) 库。这是一个 js 的解析器，可以将 js 代码解析成 AST，`Babel` 最开始也使用了 `acorn`。

如果你想了解整个编译器的开发（包括 AST 的生成），可以看这个项目[微型编译器](https://github.com/jamiebuilds/the-super-tiny-compiler)

### 抽象语法树（AST）

大体解释一下。🐵

> 在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。比如，嵌套括号被隐含在树的结构中，并没有以节点的形式呈现；而类似于 if-condition-then 这样的条件跳转语句，可以使用带有两个分支的节点来表示。  -- 维基百科

AST 的作用：

* 代码风格检测(eslint等)
* 代码的格式化，自动补全
* 代码高亮
* 代码错误检查
* 代码的混淆压缩
* 转换代码的工具。如 webpack，rollup。各种代码规范之间的转换，TypeScript JSX 等转换为原生 js

实际项目中对 AST 的应用：

我在网上找到的三个案例：🌏

[分析统计微信小程序代码使用的 api](https://segmentfault.com/a/1190000013423155)

[支付宝和微信小程序的代码转换](https://qianduan.group/posts/5a0fe3cc44aec04413ec3d7d)


[美团的模块依赖关系检测工具](https://tech.meituan.com/2014/10/08/the-practice-of-abstract-syntax-trees-in-javascript.html)

## 正文

1、使用 acorn 将 js 转换成 ast 抽象语法树

```js
const { Parser } = require('acorn');

class Runjs {
  constructor(code = '') {
    this.ast = Parser.parse(code);
  }
  run() {
    console.log(this.ast);
  }
}

module.exports = Runjs;

new Runjs(`
  let x = 'Hello World!';
  console.log(x);
`).run();
```

我们可以使用这个工具看一下，解析出来的抽象语法树。😉

[Esprima 在线工具](http://esprima.org/demo/parse.html)

[ast](https://astexplorer.net/)

2、解析出来的 AST 每个节点都有个 type 属性，要做一个节点遍历器，处理每一个节点。

有哪些节点那？可以从这里[查看](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API)

```js
let x = 'Hello World!';
console.log(x);
```

⬇️ 上面的代码生成的 AST 如下：

```json
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "x"
          },
          "init": {
            "type": "Literal",
            "value": "Hello World!"
          }
        }
      ],
      "kind": "const"
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "console"
          },
          "property": {
            "type": "Identifier",
            "name": "log"
          }
        },
        "arguments": [
          {
            "type": "Identifier",
            "name": "x"
          }
        ]
      }
    }
  ]
}
```

如何实现节点遍历器？

先定义一个节点控制器 nodeHandler，分别处理每一个节点

下面是上面用到的节点类型：

```js
const nodeHandler = {
  Program(nodeIterator) {
    /*处理 Program 类型的代码 */
  },
  VariableDeclaration(nodeIterator) {
    /*处理 VariableDeclaration 类型的代码 */
  },
  Identifier(nodeIterator) {},
  Literal(nodeIterator) {},
  ExpressionStatement(nodeIterator) {},
  CallExpression(nodeIterator) {},
  MemberExpression(nodeIterator) {},
};
```

然后实现一个节点遍历器 🆗

```js
class NodeIterator {
  constructor(node) {
    this.node = node;
    this.nodeHandler = nodeHandler;
  }

  traverse(node) {
    const nodeIterator = new NodeIterator(node);
    const parse = this.nodeHandler[node.type];
    if (!parse) {
      throw new Error(`canjs: Unknown node type "${node.type}".`);
    }
    return parse(nodeIterator);
  }
}
```

（未完待续~~~）🎈