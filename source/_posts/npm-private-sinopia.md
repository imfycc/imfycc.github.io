---
title: 开源项目 sinopia 搭建团队内部 npm 服务器
date: 2017-08-02 06:02:42
updated: 2017-08-02 06:02:42
tags:
categories: 编程
---

[Sinopia官方文档](https://www.npmjs.com/package/sinopib#override-public-packages)

#### 功能

**1、下载同步官方源。**

先检查私有仓库里是否有要下载的包，没有的话，去 `npm` 官方的仓库下载。然后第二次再下载的时候，会缓存一份到我们搭建的这个 `npm` 仓库，以后再使用的话，就很快了。

**2、建立私仓库**

可以把公司内部的 `npm` 包，存放在里面。

**3、对npm官方的包进行更改**

如果发现，官方的包，有 `bug`，`pr` 后，还没有更新，这时候就可以先暂时 `publish` 到我们自己的仓库。

#### 优点
1、简单！都不用数据库

### 部署

部署参考上面的官方文档，和下面的参考文档。

### 解释

配置文件里的

```
crypto.createHash('sha1').update('pass').digest('hex')
```

在终端里输入 `node`,然后输入上面的命令。注：把pass换成 你的密码，然后生成加密的密码。

设置 `npm` 包源，这个是会写入 `.npmrc` 的

```
npm set registry "http://localhost:4873/"
```

公司内部的私有包的 `package.json` 里可以添加

```
"publishConfig": {
    "registry": "http://localhost:4873/"
}
```

### 参考文档

1、[Sinopia | 从零开始搭建npm仓库](https://zhuanlan.zhihu.com/p/20892656)

2、[使用sinopia搭建自己的npm服务](http://m.blog.csdn.net/article/details?id=50938611)

3、[npm自建服务器](http://blog.3gcnbeta.com/2016/04/28/%E8%BD%BB%E6%9D%BE%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84npm%E6%9C%8D%E5%8A%A1%E5%99%A8/)
