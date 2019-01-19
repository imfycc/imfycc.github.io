---
title: Nodejs怎么按行读写文件
date: 2017-03-10 17:26:49
updated: 2017-03-10
overdue: true
tags: nodejs
categories: 编程
description:
---

## 写入文件
```js
var fs = require('fs'); //导入 文件系统 模块
var ws = fs.createWriteStream('./example.txt');

for (var i = 0;i <= 100; i++) {
	   var re = ws.write(i + '\n');
    }
```

## 读取文件
```js
const fs = require('fs');
const readline = require('readline'); //Node.js本身就有按行读取的模块

const rl = readline.createInterface({
  input: fs.createReadStream('./example.txt')
});

rl.on('line', (data) => {
  console.log(data);
});
```


命令行里跑脚本的感觉酷酷的。🏃
