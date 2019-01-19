---
title: 解决 hexo Error build DTraceProviderBindings
date: 2017-06-04 14:52:14
updated: 2017-06-04 14:52:14
overdue: true
tags:
categories: 编程
---

使用`Hexo` 的过程中遇到这个报错很多次了。为了减少重复搜索解决方法，记录一下解决过程。 😉

一般升级过 Node.js 版本后就容易出现该报错

```
{ Error: Cannot find module './build/Release/DTraceProviderBindings'
    at Function.Module._resolveFilename (module.js:485:15)
    at Function.Module._load (module.js:437:25)
    at Module.require (module.js:513:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous>
    .
    .
{ Error: Cannot find module './build/default/DTraceProviderBindings'

{ Error: Cannot find module './build/Debug/DTraceProviderBindings'
}
```
### 解决办法

先使用以下命令
```
npm install hexo --no-optional
```

如果不起作用使用以下命令
```
npm uninstall hexo-cli -g

npm uninstall dtrace-provider -g

npm install hexo-cli -g --no-optional

rm -rf node_modules

npm install hexo --no-optional

npm install

```
