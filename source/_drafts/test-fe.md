---
title: 前端单元测试入门笔记
date: 2017-12-27 00:00:00
updated: 2017-12-27 00:00:00
tags:
categories: 编程
---

## 什么是单元测试？
> `单元测试`（Unit Testing）是针对程序最小单元来进行正确性检验的测试工作。程序单元可以是单个程序、函数、类等。

* 单元测试的目的是从使用者(调用者)的角度出发，尝试函数逻辑的各种可能性，进而辅助性增强代码质量
* 测试是手段而不是目的。测试的主要目的不是证明代码正确，而是帮助发现错误，包括低级的错误

## 几个测试库的区别

	1.	提供测试环境（Mocha，Jasmine，Jest，Karma） 
	2.	提供测试结构（Mocha,Jasmine,Jest,Cucumber） 
	3.	提供断言功能（Chai，Jasmine，Jest，Unexpected） 
	4.	生成，display和watch**测试结果（Mocha,Jasmine,Jest,Karma） 
	5.	生成和比较组件和数据结构的快照，以确保以前运行的更改（Jest，Ava） 
	6.	提供mocks，spies和stubs（Sinon，Jasmine，enzyme，Jest，testdouble） 
	7.	生成代码覆盖率报告（Istanbul，Jest） 
	8.	提供一个浏览器或类似浏览器的环境，控制他们的场景执行（Protractor,Nightwatch,Phantom,Casper） 


### Mocha

[Mocha](https://mochajs.org/) 是一个 `JavaScript` 的测试框架。

阮一峰的[测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)

### Chai
Chai 是一个单元测试的断言库。

### Sinon
Sinon 是一个 mock 库，可以对任何对象进行 mock，更重要的是它提供了一些对 mock 对象的校验方法。

### Enzyme
Enzyme 是 React 官方测试工具库的封装，它模拟了 jQuery 的 API，非常直观，易于使用和学习。

### Karma
Karma 是一个基于 Node.js 的 JavaScript 测试执行过程管理工具（Test Runner）。该工具可用于测试所有主流 Web 浏览器，也可集成到 CI（Continuous integration） 工具，也可和其他代码编辑器一起使用。这个测试工具的一个强大特性就是，它可以监控 (Watch) 文件的变化，然后自行执行，通过 console.log 显示测试结果。
karma 测试框架的前世今生
### Jasmine
Jasmine 是一款 JavaScript 测试框架，它不依赖于其他任何 JavaScript 组件。它有干净清晰的语法，让您可以很简单的写出测试代码。
JavaScript 单元测试框架：Jasmine 初探


### PhantomJS
PhantomJS 是一个基于 webkit 的服务器端 JavaScript API，即相当于在内存中跑了个无界面的 webkit 内核的浏览器。通过它我们可以模拟页面加载，并获取到页面上的 DOM 元素，进行一系列的操作，以此来模拟UI测试。但缺点是无法实时看见页面上的情况（不过可以截图）。
其支持各种Web标准： DOM 处理, CSS 选择器, JSON, Canvas, 和 SVG。对于web测试、界面、网络捕获、页面自动化访问等等方面可以说是信手拈来。


### Jest
Facebook 发布的一个开源的、基于 Jasmine 框架的 JavaScript 单元测试工具。


	
mocha 前端测试框架
chai 断言库
Karma 前端测试框架
enzyme 测试 react 的
jest 测试框架


m站 test-mate

hljurl
widget
ui
share
imgurl
lego-viewer
env
city
cache
ajax

## 参考
[前端测试框架概览](http://front-ender.me/test/front-end-test.html)
[2017年JavaScript测试概览](http://www.zcfy.cc/article/an-overview-of-javascript-testing-in-2017-powtoon-engineering-medium-2781.html)


