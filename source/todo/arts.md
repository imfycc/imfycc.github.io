---
title: 我的编程ARTS记录
date: 2018-06-19 07:33:14
updated: 2018-07-02 00:00:14
tags:
categories: 编程
---

开篇文章，记录一下我每周的 `ARTS` 和 技术规划

之后整理一下，把 `ARTS` 放到 `Github`

## ARTS

**Algorithm**: 每周至少做一个算法题

**Review**: 阅读并点评至少一篇英文技术文章

**Tip**: 学习至少一个技术技巧。 回想一下本周工作中学到的一个小技巧

**Share**: 分享一篇有观点和思考的技术文章。思考一个技术观点、社会热点、一个产品或是一个困惑。

关于 `S` 的补充：

> 主要是用训练“价值观输出”。

> 如果你想要有影响力，就要学会输出观点，输出观点，就会有人同意，有人不同意，甚至还会被骂，但是，有观点的信息交换会让人更巨烈的思考，成长的更快。

我自己找的几个网站

英文文章的选取地方

- [Medium](https://medium.com/)
- [掘金翻译计划](https://juejin.im/tag/%E6%8E%98%E9%87%91%E7%BF%BB%E8%AF%91%E8%AE%A1%E5%88%92)
- [众成翻译](https://www.zcfy.cc/)
- [Hacker News](https://news.ycombinator.com/)

前端

- [FEX](https://fex.baidu.com/weekly/)
- [awesome-html5](https://github.com/diegocard/awesome-html5)
- [awesome-css](https://github.com/awesome-css-group/awesome-css)
- [awesome-javascript](https://github.com/sorrycc/awesome-javascript)

## 第一周 2018/06/18-06/24 

#### Review

[A Language for the Next 10 Years](https://programmingzen.com/next-programming-language/?utm_content=buffer3a898&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)

我们公司部分应用在使用 `elixir` 开发，我自己也写过一点 `elixir` 的项目，我对使用它一点基本的认识是 `elixir` 和 `ruby` 有些类似，有完善的工具生态，能够快速开发应用，是一门可读性良好,优雅,函数式编程语言。

但是对于文章介绍的高并发、出色的 `Erlang VM`、基于宏命令的元编程等等特性，我都没有实践过，没有发言权。

我觉的 `elixir` 会有它擅长的场景，会有它的市场份额，但并不会像 `Java` 那么火爆。

#### Tip

本周写 `css` 的时候，发现父元素为 `display: flex;` 的 `span` 标签，自动具有了 `inline-block ` 的属性。尝试找了一下规范。

可以在 `Google` 里这样定位 `css` 规范里的内容

```
site:w3.org flex 
```
[这一段](https://www.w3.org/TR/css-flexbox-1/#flex-containers)指出部分在 `flex` 布局里会失效的属性

`vertical-align` 、`float` 、`clear` `::first-line`、`::first-letter `

原因是这些属性是专门为 `block` 布局设计的。

#### Share

[Elixir: 编程语言的未来](https://blog.devopszen.com/elixir)

[Comparing Elixir and Go](https://blog.codeship.com/comparing-elixir-go/)

参照皓叔在 [GO语言、DOCKER 和新技术](https://coolshell.cn/articles/18190.html) 对新技术的评判标准，评价一下 `elixir`

**一个技术能不能发展起来的三个关键技术点**

- 有没有一个好的社区 
  类似 ruby，社区还不错

- 有没有一个工业化的标准
  No 

- 有没有一个或者多个杀手级应用
  No

**其他的因素**

- 学习曲线是否低，上手是否快
  
  并不像类 `C` 语言一样，语法还是有点特色。[elixir 文档](https://elixir-lang.org/)
  
- 有没有一个不错的提高开发效率的开发框架
  
  有。[Phoenix](http://phoenixframework.org/)  完善的工具链以及功能齐全的 `lib`。
  
- 是否有一个或者多个巨型的技术公司作为后盾

  没有。只是 `Pinterest`、`WhatsApp`、`Slack`、`Adobe` 等公司部分场景在使用。https://elixir-companies.com/

- 有没有解决软件开发中的痛点

  基于 `Erlang` 的 `OTP` 提高了容错的、高可用的、并发的分布式系统的开发效率 

总结一下，我觉的 `Elixir/Erlang` 适合于需要持续运行，并且尽可能持续提供服务的系统。`elixir` 不会像 `Java` 那么火爆，但是在某些领域，也会成为开发者一种不错的选择。






