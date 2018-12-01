---
title: 写给自己的CSS系列（一）基础概念
date: 2018-11-21 08:54:47
updated: 2018-11-21 08:54:47
tags:
categories: 编程
---

## 长度单位

### 相对长度单位

> 相对长度单位又分为相对字体长度单位和相对视区长度单位。

* 相对字体长度单位，如 `em` 和 `ex`，还有 `CSS3` 新世界的 `rem` 和 `ch`(字符 0 的宽度)。

* 相对视区长度单位，如 `vh`、`vw`、`vmin` 和 `vmax`。 

### 绝对长度单位

最常见的就是 `px`，还有 `pt`、`cm`、`mm`、`pc` 等了解一下就可以。（在我
看来，它们实用性近乎零，至少我这么多年一次都没用过。-- 张鑫旭 《CSS世界》）

## 选择器和关系选择器

### 选择器

> 选择器是用来瞄准目标元素的东西

* 类选择器: 指以 `.` 这个点号开头的选择器。

* `ID` 选择器: `#` 打头，权重相当高。`ID` 一般指向唯一元素。但是，在 `CSS` 中，`ID`
样式出现在多个不同的元素上并不会只渲染第一个，而是雨露均沾。但显然不推荐
这么做。

* 属性选择器: 指含有 `[]` 的选择器，形如 `[title]{}`、`[title= "css-world"]{}`、
`[title~="css-world"]{}` 、 `[title^= "css-world"]{}` 和 `[title$="css-
world"]{}` 等。

* 伪类选择器: 一般指前面有个英文冒号 `:` 的选择器，如 `:first-child` 或`:last-
child` 等。

* 伪元素选择器: 就是有连续两个冒号的选择器，如 `::first-line`、`::first-
letter`、`::before` 和 `::after`。

### 关系选择器

> 关系选择器是指根据与其他元素的关系选择元素的选择器，常见的符号有空格、`>`、`~`，还有 `+` 等，这些都是非常常用的选择器。

* 后代选择器: 选择所有合乎规则的后代元素。空格连接。

* 相邻后代选择器: 仅仅选择合乎规则的儿子元素，孙子、重孙元素忽略，因此又称“子
选择器”。`>` 连接。适用于 `IE7` 以上版本。

* 兄弟选择器: 选择当前元素后面的所有合乎规则的兄弟元素。`~` 连接。适用于 `IE7` 以上版本。

* 相邻兄弟选择器: 仅仅选择当前元素相邻的那个合乎规则的兄弟元素。`+` 连接。适用于 `IE7` 以上版本。

## 块级元素

『块级元素』对应的英文是 `block-level element`，常见的块级元素有 `<div>`、`<li>` 和 `<table>`、`<p>`、`<section>`、`<ul>`、`<h1>` ~ `<h6>`、 `<from>`、`<canvas>` 等。

[点击查看](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements#%E5%85%83%E7%B4%A0%E5%88%97%E8%A1%A8)所有的块级元素清单。

⚠️ 需要注意是，『块级元素』 和 `display` 为 `block` 的元素不是一个概念。例如，`<li>` 元素默认的 `display` 值是 `list-item`，`<table>` 元素默认的 `display` 值是 `table`，但是它们均是 『块级元素』，因为它们都符合块级元素的基本特征，也就是一个水平流上只能单独显示一个元素，多个块级元素则换行显示。

正是由于『块级元素』具有换行特性，因此理论上它都可以配合 `clear` 属性来清除浮动带来的影响。例如:

```css
.clear:after {
  content: '';
  display: table; // 也可以是 block，或者是 list-item
  clear: both;
}
```

`inline-block ` 的实现方式，外在盒子负责元素是可以一行显示，还是只能换行显示;内在盒子负责宽高、内容呈现什么的。`width/height` 作用在内在盒子上。

按照 `display` 的属性值不同，值为 `block` 的元素的盒子实际由外在的 “块级盒子”和内在的“块级容器盒子”组成，值为 `inline-block` 的元素则由外在的“内联盒子”和内在的“块级容器盒子”组成，值为 `inline` 的元素则内外均是“内联盒子”。

## width/height

width 的默认值是 auto，会有以下 4种宽度表现：

(1)充分利用可用空间。比方说，`<div>`、`<p>` 这些元素的宽度默认是 100% 于父级容器的。 像水流充满容器。

(2)收缩与包裹。典型代表就是浮动、绝对定位、inline-block 元素或 table 元素，

(3)收缩到最小。这个最容易出现在 table-layout 为 auto 的表格中

(4) 超出容器限制。除非有明确的 width 相关设置，否则上面 3 种情况尺寸都不会主动超过父级容器宽度的，但是存在一些特殊情况。例如，内容很长的连续的英文和数字，或者内联元素被设置了 `white-space:nowrap`。

一般会终止于空格(普通空格)、短横线、问号以及其他非英文字符等。例如，“display:inline-block”这几个字符以连接符“-”作为分隔符，形成了“display:inline”和“block”两个连续单元。

`<button>` 标签按钮才会自动换行，`<input>` 标签按钮，默认 `white-space:pre`，是不会换行的，需要将 `pre` 值重置为默认的 `normal`。

## box-sizing

宽度是作用在 `content box` 上的，而外面围绕的 `padding box` 和 `border box` 又不是摆设。

`box-sizing:border-box` 就是让 100 像素的宽度直接作用在 `border box` 上，从默认的 `content box` 变成 `border box`。

在 CSS 世界中，唯一离不开 `box-sizing:border-box` 的就是原生普通文本框 `<input>` 和文本域 `<textarea>` 的 100% 自适应父容器宽度。

```css
textarea {
width: 100%;
-ms-box-sizing: border-box; /* for IE8 */
box-sizing: border-box;
}
```
`box-sizing` 被发明出来最大的初衷应该是解决替换元素宽度自适应问题。

如果真的如我所言，那 `*{box-sizing:border-box}` 是不是没用在点儿上呢?是不是应该像下面这样 CSS 重置才更合理呢?

```css
  input, textarea, img, video, object {
    box-sizing: border-box;
}
```

## 内联元素

[所有内联元素清单](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Inline_elemente#Elements)

### 幽灵空白节点

“幽灵空白节点”指的是在 HTML5 文档声明中，**内联元素**的所有解析和渲染表现就如同每个行框盒子的前面有一个“空白节点”一样。这个“空白节点”永远透明，不占据任何宽度，看不见也无法通过脚本获取，就好像幽灵一样，但又确确实实地存在，表现如同文本节点一样，因此，我称之为“幽灵空白节点”。

[w3c 幽灵节点相关内容](https://www.w3.org/TR/CSS2/visudet.html#leading)

规范里叫 `strut`

⚠️ 注意，文档声明必须是 HTML5 文档声明，如果还是很多年前的老声明，则不存在“幽灵空白节点”。

我们可以举一个最简单的例子证明“幽灵空白节点”确实存在， CSS 和 HTML 代码如下:

```css
div {
  background-color: #cd0000;
}
span {
  display: inline-block;
}
```
```html
<div><span></span></div>
```


