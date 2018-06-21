---
title: Electron 桌面应用开发踩坑记 
date: 2018-01-04 09:39:09
updated: 2018-01-04 09:39:09
tags:
categories: 编程
---

## 技术栈

react
Electron
ES6

1、Electron 下载问题
2、数据本地存储问题
3、引入 react + webpack + less + babel 打包问题 
4、文件改动，electron 监听
5、semantic ui 字体路径和jquery的问题

semantic 的问题还挺多，统一整理一下
http://www.cnblogs.com/kaiye/p/6971732.html

数据的存储方案

导入 lowdb 报错 

ERROR in ./node_modules/graceful-fs/graceful-fs.js
Module not found: Error: Can't resolve 'fs' in '/Users/dusong/Hufy/NB/node_modules/graceful-fs'
 @ ./node_modules/graceful-fs/graceful-fs.js 1:9-22
 @ ./node_modules/lowdb/adapters/FileSync.js
 @ ./src/app.js

ERROR in ./node_modules/graceful-fs/fs.js
Module not found: Error: Can't resolve 'fs' in '/Users/dusong/Hufy/NB/node_modules/graceful-fs'
 @ ./node_modules/graceful-fs/fs.js 3:9-22
 @ ./node_modules/graceful-fs/graceful-fs.js
 @ ./node_modules/lowdb/adapters/FileSync.js
 @ ./src/app.js
 
 打包遇到问题





