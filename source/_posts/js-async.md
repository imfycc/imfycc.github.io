---
title: JavaScript 文件的异步加载 async 和 defer
date: 2018-11-05 15:32:06
updated: 2019-03-07 07:32:06
tags:
categories: 编程
---

## 背景
在 webpack 等工具的照料下，我们忘记了很多的东西，比如说 JavaScript 文件的异步加载，异步执行等等内容。唯一能记起是关于 script 的优化可能是把 script 标签放到页面底部。

某次你看到 '<script src="mylib.js" async></script>' 这样的引入语句，请问这 async 到底是什么意义呢？

## 任务

1、学习 async 的作用，使用限制等。

2、有没有其他类似的属性呢？

## 技能

性能优化

## 开始

聊 JavaScript 文件的异步加载之前，我们先来看一段 HTML 文档的加载流程。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://a.com/a.js">
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  这里有很多的 HTML 标签和内容
</body>
</html>
```

对于上面的 HTML 文档，浏览器的解析过程如下：

1、浏览器一边下载 HTML 网页，一边开始解析(并不是下载完之后，才开始开始解析)。

2、解析过程中，浏览器发现 `<script>` 标签就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。

3、如果 `<script>` 标签引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。

4、JavaScript 引擎执行完毕，控制权交还渲染引擎，继续解析 HTML 网页。

加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后再继续渲染。

![](https://ws1.sinaimg.cn/large/006tKfTcgy1g0u4n0mieqj30it04y3yb.jpg)

这就是为什么我们一般建议把 `<script>` 标签放在 `</body>` 之前，而不是放在 `<head></head>` 中，因为加载 `<script>` 中的脚本并执行会阻塞 HTML 页面的渲染，当 JavaScript 文件很大的时候，甚至会长时间出现白屏。

有没有什么办法可以优化 JavaScript 文件的加载执行，提高页面加载的效率？

## 解读 async 和 defer 属性

翻阅 [HTML5 的文档](https://www.w3.org/TR/html51/semantics-scripting.html) 就会发现，`<script>` 还有 `async` 和 `defer` 两个和脚本加载执行有关的属性。

> async - Execute script in parallel //并行执行脚本
>
> defer - Defer script execution // 延迟执行脚本

[HTML4.1](https://www.w3.org/TR/html4/interact/scripts.html#18.2.1)是这么解释 defer 的：

>When set, this boolean attribute provides a hint to the user agent that the script is not going to generate any document content (e.g., no "document.write" in javascript) and thus, the user agent can continue parsing and rendering.

就是说浏览器在遇到设置了 defer 的 `<script>` 时，加载了 JavaScript 文件后，不会立即执行，不会阻塞浏览器解析 HTML，而且如果设置了 defer 不要在 JavaScript 脚本里写 `document.write`。

[HTML5.1](https://www.w3.org/TR/html51/semantics-scripting.html)这么解释 defer 和 async 的：

此处省略将近 1500 字的英文引用，感兴趣点击的 [HTML5.1](https://www.w3.org/TR/html51/semantics-scripting.html) 文档。

对省略的原文总结如下：

1、defer 和 async 只对外部加载的脚本有效果，`<script>` 包含的 JavaScript 代码块无效。

2、必须设置了 `src` 属性，不然 defer 和 async 也无效。

3、defer 和 async 这两个值是布尔类型的。

4、如果设置了 async 属性，会并行加载脚本文件并执行，下载时不会阻塞 HTML 的解析，但是脚本执行的时候会阻塞 HTML 的解析。如果没有设置 async 属性，但是设置了 defer 属性，也会并行加载脚本文件，但是会等到页面完成解析再去执行。如果这两个属性都没有设置，会阻塞页面解析，加载并执行脚本文件。三种方式的对比图如下：

![图片来源：www.w3c.org](https://ws1.sinaimg.cn/large/006tKfTcgy1g0u4yijbn8j315s082q2z.jpg)

[HTML5.3](https://www.w3.org/TR/html53/semantics-scripting.html#element-attrdef-script-defer)的文档把第四条补充了一下。。。

1、defer 对 module 脚本是无效的，但是 async 是有效的

2、如果同时设置了 defer 和 async 为 true， 以 defer 为准

### 小总结

通过给 `<script>` 标签设置 defer 属性，将脚本文件设置为延迟加载，当浏览器遇到带有 defer 属性的 `<script>` 标签时，会再开启一个线程去下载 JavaScript 文件，同时继续解析 HTML 文档，等 HTML 全部解析完毕 DOM 加载完成之后(也就是DOMContentLoaded 事件之后 onload 事件之前)，再去执行加载好的 JavaScript 文件。多个js文件的执行顺序就是它们在页面中出现的顺序。

async 属性和 defer 属性类似，也是会开启一个线程去下载 JavaScript 文件，但和defer 不同的是，它会在下载完成后立刻执行，而不是会等到 DOM 加载完成之后再执行，所以还是有可能会造成阻塞。对多个带有 async 的 JavaScript 文件，它不能像defer 那样保证按顺序执行，它是哪个 JavaScript 文件先下载完就先执行哪个。

### 使用

什么时候用 defer，什么时候用 async 呢？

一般来说，两者之间的选择则是看脚本之间是否有依赖关系，有依赖的话应当要保证执行顺序，应当使用 defer 没有依赖的话使用 async。要注意的是两者都不应该使用 `document.write`，这个导致整个页面被清除。

模块化的代码、测试代码或者监听代码使用 async。

这两个值是布尔类型的，在 HTML 里面只写属性名即可。

```html
<script src="https://a.com/a.js" async>
```

如果不考虑兼容 IE 浏览器，完全可以将 `<script>` 放在 `<head>` 里，同时守设置 defer 属性，这样 HTML 解析的时候，可以并行下载 JavaScript 脚本，等 HTML 页面解析完，JavaScript 脚本在开始执行，充分利用资源。比如查看 gitlab 页面源码。

### 兼容性

defer 是 HTML4 就有的属性，而 async 是 HTML5 新加入的属性。defer 出现的早，IE6 及以上的浏览器基本都支持，可以放心用。 async IE10 就开始支持了，移动端的支持比较好。不考虑 IE 的话，两个属性都可以放心使用。

兼容性可以点击这里查看[caniuse](https://caniuse.com)

### 测试

如果同时设置了 defer 和 async 为 true，浏览器会怎么执行？

我们做个小实验。

新建一个文件夹，文件结构如下：

```
.
├── 1.js
├── 2.js
└── index.html
```

1.js 如下:
```js
alert(1);
```

2.js 如下
```js
alert(2);
```

index.html 的内容如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script defer async src="./1.js"></script>
  <script async defer src="./2.js"></script>
  <title>测试 async 和 defer </title>
</head>
<body>

<script>
  alert(3);
</script>
</body>
</html>
```

设置两个 js 是为了排除 async 和 defer 先后顺序的影响。

FireFox、Chrome、Safari、三个浏览器的执行结构都是 3、1、2，说明同时设置了 defer 和 async 为 true， 以 defer 为准。

## 扩展阅读

[async vs defer attributes](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

## 参考

[网页性能优化之异步加载js文件 - 掘金](https://juejin.im/post/5bcdaed7e51d457a8254e1b7)

[HTML4.1](https://www.w3.org/TR/html4/interact/scripts.html#18.2.1)

[HTML5.1](https://www.w3.org/TR/html51/semantics-scripting.html)

[HTML5.3](https://www.w3.org/TR/html53/semantics-scripting.html#element-attrdef-script-defer)
