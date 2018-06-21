---
title: Yarn能帮你解决的五件事
date: 2016-12-14 17:20:31
updated: 2016-12-14 17:20:31
tags: [翻译,yarn,npm,前端,编程]
categories: 翻译
description:
---
>我在[众成翻译](http://zcfy.cc/article/5-things-you-can-do-with-yarn-2055.html)上翻译的一篇文章。
[查看原文](https://auth0.com/blog/five-things-you-can-do-with-yarn/)

**长话短说（TL;DR）：** 在 JavaScript 领域有多个包管理器，举几个来说： **npm**，**bower**，**component** 和 **volo**。 截至写本文，最流行的 JavaScript 包管理器是  **npm**。npm 客户端可以访问 npm 源里成千上万的代码库。只是最近，Facebook 推出了新的 JavaScript 包管理器 **Yarn**， 号称是更快，更可靠，比现有的 npm 客户端更安全。 在这篇文章，你将学习到你能用 Yarn 做的五件事情。

* * *

**Yarn** 是 Facebook 推出的新的 JavaScript 包管理器。 她为开发者使用 JavaScript 开发应用提供了快速、安全、可靠性高的依赖管理。你可以用 Yarn 处理这五件事。

<!--more-->

## 1\. 离线工作

Yarn 为你提供离线工作的能力。如果你之前安装过一个包，你可以在没有网络连接的情况下，再次安装。下面展示一个典型的例子：

当我联网的时候，我用Yarn安装了两个包，如下：

![Yarn 初始化](https://ws3.sinaimg.cn/large/006tNc79ly1fhtxr00bfaj31kw0b9q5f.jpg)_用 Yarn 初始化 package.json 文件_

![用 Yarn 安装 express 和 jsonwebtoken 包](https://ws1.sinaimg.cn/large/006tNc79ly1fhtxrsb0x2j31kw09odi6.jpg)_用 Yarn 安装 express 和 jsonwebtoken 包_

![用 Yarn 安装完成](https://ws1.sinaimg.cn/large/006tNc79ly1fhtxs8305rj31kw0eudhx.jpg)_安装完成_

安装完成后, 我在我的项目里删除了 _node_modules_ 文件夹，并且断开了网络连接。我运行 Yarn ，如下：

![用 Yarn 离线安装包](https://ws1.sinaimg.cn/large/006tNc79ly1fhtxsh1g5aj31kw08jjtb.jpg)_Yarn 离线安装包_

就这样！ 所有的包不到两秒钟的时间内再次安装完。 显然，下载的时候 Yarn 缓存了所有的包以至于不需要再次从网络下载。 她通过并行操作最大限度地提高资源利用率，以至于再次下载的时候安装时间比之前更快。

## 2\. 从多个源安装

Yarn 为你提供从多个源下载 JavaScript 包的能力。例如 [npm](https://www.npmjs.com/), [bower](https://bower.io/)，你的 git 源， 甚至是你本地的文件系统。

对于你需要的包，Yarn 默认扫描 npm 源，命令如下:

```
yarn add <pkg-name>

```

从远程 gzip 压缩文件安装一个包，命令如下：

```
yarn add <https://thatproject.code/package.tgz>

```

从本地文件系统安装一个包，命令如下：

```
yarn add file:/path/to/local/folder

```

对于持续发布 JavaScript 包的开发者，这是特别有用的。你可以通过这个功能，在发布包之前测试你的包。

从远程 git 源安装一个包，像这样：

```
yarn add <git remote-url>

```

![Yarn 从 Github 源安装](https://ws3.sinaimg.cn/large/006tNc79ly1fhtxsnk9iyj31kw0afwgy.jpg)_Yarn 从 Github 源安装_

![Yarn 检测到在 bower 源存在 Github Rep ](https://ws3.sinaimg.cn/large/006tNc79ly1fhtxsvzso4j31kw0olgn3.jpg)_Yarn 检测到在 bower 源存在 Github Rep 并且添加到文件里，像这样_

## 3\. 迅速的下载 Javascript 包

如果你已经用了一段时间的 **npm** ， 你一定有这样的经历，当你运行`npm install`后，就可以去看电影了，回来之后再检查你需要的所有依赖包是否安装完成了。好吧，可能有点夸张，但是 npm 遍历所需要的依赖包并下载它们真的需要花费很长的时间。使用 Yarn，安装时间真的被削减到从等待几分钟到几秒。

Yarn 优化了排队请求并且最大化的利用网络避免请求阻塞。她先请求源，然后递归查找每个依赖。接下来，在全局缓存文件里查找是否有依赖之前被下载过。如果没有，Yarn 会下载依赖压缩包，放在全局缓存里，当离线的时候使它能够生效。之后消除需要重新下载的请求。

安装期间， Yarn 并行操作, 使安装过程更快。我分别用**npm** 和 **yarn**新安装了三个包，**jsonwebtoken**、 **express** 和 **lodash**。

_Yarn_安装完后， _npm_ 还在安装中。
![Yarn 和 Npm 比较](https://ws3.sinaimg.cn/large/006tNc79ly1fhtxt4o5e4j31kw0scqba.jpg)

## 4\. 自动锁定包版本

Npm 有一个叫做 **shrinkwrap** 的特性, 它的作用是在生产环境锁定包依赖。**shrinkwrap** 的局限在于使用该功能，开发者必须手动运行 `npm shrinkwrap` 命令，生成一个`npm-shrinkwrap.json` 文件。但是，开发者也是人，也会忘记!

用 Yarn 就完全不一样了。安装期间, 会自动生成一个 `yarn.lock` 文件。这和 PHP 开发者熟悉的`composer.lock` 文件类似。`yarn.lock` 文件准确的锁定了所有被下载和项目依赖的包版本。通过这个文件，你能确定你的工程师团队的每一位成员都能安装准确的包，并且可以更容易的部署，而没有意外 bug出现。

## 5\. 在不同机器上以相同方法安装依赖

**npm 客户端** 安装依赖的方式可能使 A 开发者与 B 开发者的`node_modules` 文件夹内容的结构不同。它用一种不确定的方式安装这些包依赖。这种方式因为一些系统问题，在生产环境部署重现并不容易，有时也是导致 bug 的原因。

Yarn 有一个锁文件，并且她的安装算法能够确保在不同的开发者机器上部署应用到生产环境时，安装的依赖包是相同的文件和文件夹结构。

**注:** 虽然我标题说好的是五件事，但是这根本表达不完 **Yarn** 给我的感觉有多棒。所以我还要再补充一点, 企业环境要求能够列出依赖证书类型的能力。而 Yarn 提供了这种能力，只要在你的根目录运行命令  `yarn licenses ls` 。如下:

![Yarn 许可证](https://ws4.sinaimg.cn/large/006tNc79ly1fhtxtdx19mj31kw10l46q.jpg)

## 题外话: 在 Yarn 中使用 Auth0

为你的用户的每一次登录提供 **Auth0** [JSON Web 口令](https://jwt.io/)。 这意味着你可以拥有一个可靠的[身份基础设施](https://auth0.com/docs/identityproviders)，包括[独立的登录](https://auth0.com/docs/sso/single-sign-on), 用户管理, 支持社交账号登录（Facebook、Github、 Twitter等），企业身份登录（Active Directory、LDAP、SAML等）。并且只需要几行代码就可以融合到你自己的用户数据库。

通过 [Lock Widget](https://auth0.com/lock) 我们能够很容易的在我们的 JavaScript 应用中安装认证。 你可以用 Yarn 很容易的从终端安装 Auth0 锁装置，像这样:

```
yarn add auth0-lock

```

几秒内就可以安装完这个部件，并且在`yarn.lock`文件的帮助下会准确的锁定版本。如果你之前没有 Auth0 账户, 现在就可以[注册](https://auth0.com/signup)一个。 进入 Auth0 [管理面板](https://manage.auth0.com/)，从导航菜单栏选择**应用**， 然后选择你想使用你选择的JavaScript框架连接的应用程序。现在前往[快速开始文档](https://auth0.com/docs/quickstarts)，选择你想构建的应用类型，并且根据提示的步骤操作。

## 结论

Yarn 在刚开始出现的时候，就已经展现出了她在从远程仓库下载包到本地环境管理 JavaScript 包方面的显著优势，尤其引人注意的是安全和速度方面。她会成长成为 JavaScript 开发者的最流行的选择吗？你已经换了吗？你对 Yarn 的想法是什么？欢迎在文章下方留下你的评论！
