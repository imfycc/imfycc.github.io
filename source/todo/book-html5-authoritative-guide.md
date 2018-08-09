---
title: 《HTML5权威指南》读书笔记
date: 2018-08-01 12:35:15
updated: 2018-08-01 12:35:15
tags:
categories: 编程
---

> 阅读本书时的笔记。技术发展太快，有些内容有点过时，面向谷歌补充了一下。

1、HTML entity 

> 原来这个叫 `entity` 实体

|Result|Entity Name|Entity Number
|------|------------|------------|
|space|`&nbsp;`|	`&#160;`|
|<	|`&lt;`|`&#60;`|
|>	|`&gt;`|`&#62;`|
|&	|`&amp;`|`&#38;`|
|¥	|`&yen;`|`&#165;`|
|©	|`&copy;`|`&#169;`|
|®	|`&reg;`|`&#174;`|

2、HTML 全局属性 每个 HTML 标签，都具有的属性

* `accesskey`

    设置元素的快捷键。
    不同的浏览器快捷键可能不同，`chrome` 是 `Alt + key`
    ```
    <input type="submit" accesskey="s">
    ```
* `autocapitalize`

    自动大写
* `class`
* `contenteditable`
    
    内容是否可编辑。编辑后的内容应该要结合 JavaScript 保存吧？
* `contextmenu`
  
    生成右键菜单
* `dir`

    规定文字方向，实际效果和字面意思不一样。。。
* `draggable`

    是否可拖放
* `dropzone`

    和拖放有关，生产环境暂时不能用（2018.8.1）
* `hidden`
   
    隐藏
* `id`
* `lang`

    残障辅助技术
    特殊处理指定语言
* `spellcheck`

    拼写检查。只可在用户可编辑元素上使用
* `style`
* `tabindex`

    tab 键跳跃的顺序
* `title`

    鼠标悬停提示
* `data-*`

    自定义属性
    
还有一些在实验中（不能用在项目中）的，可以看[这里](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)