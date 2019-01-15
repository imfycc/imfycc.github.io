---
title: css 基础拾遗
date: 2017-08-07 19:58:15
updated: 2017-08-07 19:58:15
tags:
categories: 编程
---

1、css 优先级

`!important > 行内样式 > id > class > tag > * > 继承 > 默认`

2、设置不换行

通过使用 `word-break` 属性，可以让浏览器实现在任意位置的换行。

值|	描述
--|-----
normal	  | 使用浏览器默认的换行规则。
break-all |	允许在单词内换行。
keep-all	| 只能在半角空格或连字符处换行。

`white-space` 属性设置如何处理元素内的空白。


值	       | 描述
---------|-------
normal    |	默认。空白会被浏览器忽略。
pre	      | 空白会被浏览器保留。其行为方式类似 HTML 中的 `<pre>` 标签。
nowrap    |	文本不会换行，文本会在在同一行上继续，直到遇到 `<br>` 标签为止。
pre-wrap  |	保留空白符序列，但是正常地进行换行。
pre-line	| 合并空白符序列，但是保留换行符。
inherit	  | 规定应该从父元素继承 white-space 属性的值。
