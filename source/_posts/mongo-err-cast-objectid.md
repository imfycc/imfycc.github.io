---
title: 解决MongooseError:Cast to ObjectId failed for value
date: 2017-05-16 13:21:44
updated: 2017-05-16 13:21:44
tags:
categories: 编程
---

今天修改数据的时候，删掉了数据库的用户数据和 session 数据，之后就出现了这个错误：

```javascript
MongooseError: Cast to ObjectId failed for value "XXXXXX" at path "_id"
```

**解决办法**

删除浏览器里的 cookie 即可。
