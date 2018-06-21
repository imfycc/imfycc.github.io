---
title: mongodb学习指南
date: 2017-03-08 11:02:19
update:
tags:
categories:
description:
---

什么是mongoDB ？

MongoDB是一个面向文档（document-oriented）的数据库，而不是关系型数据库。不采用关系模型主要是为了获得更好的扩展性。

mongoDB 出现的背景，要解决的问题 ？

mongoDB 与传统 SQL 的区别 ？

与关系型数据库相比，面向文档的数据库不再有“行”（row）的概念，取而代之的是更为灵活的“文档”（document）模型

不再有预定义模式（predefined schema）：文档的键（key）和值（value）不再是固定的类型和大小。由于没有固定的模式，根据需要添加或删除字段变得更容易了。通常，由于开发者能够进行快速迭代，所以开发进程得以加快

mongoDB 怎么设计表 ？







官方文档 http://mongoosejs.com/docs/index.html

1、连接数据库

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // 数据库连接成功！
});
```

2、相对于MySql就是定义表的数据结构

3、怎么建表


表设计

https://github.com/ilivebox/the-little-mongodb-book/blob/master/zh-cn/mongodb.markdown

http://www.infoq.com/cn/news/2011/12/relational-nosql-databases/
http://www.jianshu.com/p/bb0caddff60a

http://www.mongoing.com/mongodb-advanced-pattern-design
http://www.jianshu.com/p/bb0caddff60a

https://huoding.com/2011/06/08/84

https://segmentfault.com/q/1010000000094501

https://segmentfault.com/a/1190000003013457

https://segmentfault.com/q/1010000000616467/a-1020000000617108

https://segmentfault.com/q/1010000005743704/a-1020000005753257

https://docs.mongodb.com/manual/introduction/

https://dzone.com/articles/when-use-mongodb-rather-mysql

https://segmentfault.com/q/1010000000735324/a-1020000000738121


http://sns.chinaot.com/u/10000101/app/blog/view?id=8069896164609

https://github.com/ilivebox/the-little-mongodb-book/blob/master/zh-cn/mongodb.markdown
