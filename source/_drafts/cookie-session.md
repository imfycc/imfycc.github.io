---
title: 掌握学会 cookie 和 session
date: 2017-06-29 15:50:37
updated: 2017-06-29 15:50:37
tags:
categories: 编程
---

cookie 和 session 简介
cookie 和 session 的运行机制
一些安全处理方式

> 因为HTTP协议是无状态的协议，而很多情景下我们需要判断状态，比如判断用户身份、登录状态。所以就有了 `session` 和 `cookie`。

#### 1、cookie和session的区别

`cookie` 是**Web服务器**发送给浏览器的一块信息。

![](https://ws2.sinaimg.cn/large/006tNc79ly1fh27742v0uj30rc0dvn3l.jpg)

cookie机制采用的是在客户端保持状态的方案，而session机制采用的是在服务器端保持状态的方案。由于采用服务器端保持状态的方案在客户端也需要保存一个标识，所以session机制可能需要借助于cookie机制来达到保存标识的目的。

而session提供了方便管理全局变量的方式 session是针对每一个用户的，变量的值保存在服务器上，用一个sessionID来区分是哪个用户session变量,这个值是通过用户的浏览器在访问的时候返回给服务器，当客户禁用cookie时，这个值也可能设置为由get来返回给服务器。

session能够存储任意的对象，cookie只能存储String类型的对象。

session大小不受限制，cookie要小于4kb。

#### 2、cookie的缺点

（1） 大小和数目受限制。浏览器对一个域cookie的条目数有上限要求，且每个cookie的大小不得超过4kb。

（2）存在安全性问题，易被人拦截。 可以使用签名cookie的方式避免

（3）需要指定域，不可以跨域

（4）浪费带宽，因为我每次请求一个新的页面，cookie都会被自动发送过去。

（5）有的移动端浏览器不支持cookie或浏览器禁用cookie

#### 3、cookie和session的工作机制

没有 cookie 信息状态下的请求

![](https://ws4.sinaimg.cn/large/006tNc79ly1fh27c8ahoqj31210hntht.jpg)

第 2 次以后(存有 cookie 信息状态)的请求

![](https://ws4.sinaimg.cn/large/006tNc79ly1fh27cfbiaij311i0fpqai.jpg)

（1）用户首次访问Web站点时，Web服务器对用户一无所知。

（2）服务器首先检查这个客户端的请求里是否已包含了一个session标识 - sessionId，因为用户第一次访问，没有cookie传输过来，也就没有sessionId，服务器会生成一个标示该用户的sessioId。

（3）Web服务器通过设置HTTP响应头 `Response` 中的 Set-Cookie 首部将包含用户信息和sessionId的 cookie 传给浏览器，浏览器保存cookie。

![](https://ws4.sinaimg.cn/large/006tNc79ly1fh285odj67j30x40ndwj1.jpg)

（4）将来用户再次访问同一站点时，浏览器会在cookie请求首部中将其传回给服务器。

![](https://ws4.sinaimg.cn/large/006tNc79ly1fh286d3wnzj30ju0c7q63.jpg)

（5）服务器检测请求头 cookie 中是否存在一个sessionId，如果存在服务器就按照sessionId把这个 session 检索出来使用，如果检索不到，会新建一个，如果没有过期，去读取Session文件中的配置；如果已经过期，清空其中的配置。如果客户端请求不包含sessionId，则为此客户端创建一个 session 并且生成一个与此session相关联的sessionId，并在本次响应中返回给客户端保存。

cookie 虽然很方便，但是使用 cookie 有一个很大的弊端，cookie 中的所有数据在客户端就可以被修改，数据非常容易被伪造，那么一些重要的数据就不能存放在 cookie 中了，而且如果 cookie 中数据字段太多会影响传输效率。为了解决这些问题，就产生了 session，session 中的数据是保留在服务器端的。

session 的运作通过一个 session_id 来进行。session_id 通常是存放在客户端的 cookie 中，当请求到来时，服务端检查 cookie 中保存的 session_id 并通过这个 session_id 与服务器端的 session data 关联起来，进行数据的保存和修改。

#### 4、会话cookie和持久cookie的区别

如果不设置过期时间，则表示这个cookie生命周期为浏览器会话期间，只要关闭浏览器窗口，cookie就消失了。这种生命期为浏览会话期的cookie被称为会话cookie。会话cookie一般不保存在硬盘上而是保存在内存里。

如果设置了过期时间，浏览器就会把cookie保存到硬盘上，关闭后再次打开浏览器，这些cookie依然有效直到超过设定的过期时间。

存储在硬盘上的cookie可以在不同的浏览器进程间共享，比如两个IE窗口。而对于保存在内存的cookie，不同的浏览器有不同的处理方式。

唯一区别就是它们的过期时间。如果设置了Discard参数或没有设置Expires或没有设置Max-Age参数则说明这个cookie就是一个会话cookie。

#### 5、signedCookie 签名cookie实现方式

计算机领域有个名词叫 `签名`，专业点说，叫 `信息摘要算法`。

比如我们有一些数据，不想存在 `session` 中，想存在 `cookie` 中，怎么保证不被篡改呢？答案很简单，签个名。

假设我们的服务器有个秘密字符串，是 `this_is_my_secret`，我为用户 cookie 的 `user` 字段设置了个值 `a`。cookie 本应是

```
{user: 'a'}
```
这样的。

而如果我们签个名，比如把 `user` 的值跟我的 `secret_string` 做个 `sha1`

```
sha1('this_is_my_secret' + 'a') === '4850a42e3bc0d39c978770392cbd8dc2923e3d1d'
```

然后把 cookie 变成这样
```
{
  user: 'a',
  'user.sig': '4850a42e3bc0d39c978770392cbd8dc2923e3d1d',
}
```
这样一来，用户就没法伪造信息了。一旦它更改了 cookie 中的信息，则服务器会发现 hash 校验的不一致。

毕竟他不懂我们的 secret_string 是什么，而暴力破解哈希值的成本太高。

#### 微信小程序禁用cookie，怎样维护登录状态

[微信小程序的官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html)

登录时序图

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/login.png?t=201758)

#### Js中操作cookie

sessionid GET 传输的方式 安全漏洞

token

http://www.pdosgk.com/index.php/Home/News/show/id/142927.html


3、HTML5的几种存储方式 http://www.cnblogs.com/LuckyWinty/p/5699117.html

参考文章：

[Cookie 和 Session 的使用简记](http://mertensming.github.io/2016/10/19/cookie-session/)

[Cookie 在前端中的实践](http://mertensming.github.io/2016/10/20/practice-cookie/)

[cookie 和 session](http://wiki.jikexueyuan.com/project/node-lessons/cookie-session.html)
