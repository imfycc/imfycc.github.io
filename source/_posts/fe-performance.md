---
title: 前端性能优化之预加载
date: 2016-7-29 17:29:37
updated: 2018-03-17
overdue: true
tags: 前端
categories: 编程
description:
---

## 常见的前端性能优化方案

1、js、css（css sprite ）、图片等文件的压缩、合并

2、预加载

3、文件缓存

4、CDN 缩小延迟

5、服务器端的gzip压缩

> 今天主要说一下预加载

## 资源预加载

> **预加载** 是浏览器对将来可能被使用资源的一种暗示，一些资源可以在当前页面使用到，一些可能在将来的某些页面中被使用。作为开发人员，我们比浏览器更加了解我们的应用，所以我们可以对我们的核心资源使用该技术。

这并不是一项单一的技术，可以细分为几个不同的技术：`DNS-prefetch`、`subresource` 和标准的`prefetch`、`preconnect`、`prerender`

### 浏览器支持

![](http://7xrdfc.com1.z0.glb.clouddn.com/prefetch.jpg)

Android 仅支持 link prefetch

> 如下图，展示了预加载技术的的各个阶段

![](http://7xrdfc.com1.z0.glb.clouddn.com/prerender.png)

### DNS 预解析 DNS Prefetch

通过 DNS 预解析来告诉浏览器未来我们可能从某个特定的 URL 获取资源，当浏览器真正使用到该域中的某个资源时就可以尽快地完成 DNS 解析。例如，我们将来可能从 example.com 获取图片或音频资源，那么可以在文档顶部的 标签中加入以下内容：[amazon](https://www.amazon.cn) 就使用了该技术，具体审查源码。

我们的图片基本都放在upyun上，可以在文档顶部加上这个

``` css
<meta http-equiv="x-dns-prefetch-control" content="on">

<link rel="dns-prefetch" href="//hlj-img.b0.upaiyun.com">
```

### HTML5 prefetch （目前移动端仅支持这个）

>原理: 利用浏览器的空闲时间去先下载用户指定需要的内容,然后缓存起来,这样用户下次加载时,就直接从缓存中取出来,效率就快了。可以加载一个页面或者脚本文件、图片、css等。

注意：

1、prefetch并没有同域的限制，可以跨域使用，可以加载不同域的CDN

2、只有可缓存的资源才进行预加载，否则浪费资源！

比如要预先加载某个页面:

```css
<link rel="prefetch" href="http://www.example.com/"> <!-- Firefox -->
```

但如果是google的话,要用另外的一个名称:

```css
<link rel="prerender" href="http://www.example.com/"> <!-- Chrome -->
```
也可以合并在一起写

```css
<link rel="prefetch prerender" href="http://www.example.com/style.css"><!--加载静态的资源-->
```
#### 什么情况下应该预加载页面资源

建议:

1、当页面有幻灯片类似的服务时，预加载/预读取接下来的1-3页和之前的1-3页。

2、预加载那些整个网站通用的图片。

3、预加载网站上搜索结果的下一页

#### 缺点

1、预加载(Link prefetch)会污染你的网站访问量统计，因为有些预加载到浏览器的页面用户可能并未真正访问

### 预连接 Preconnect

与 DNS 预解析类似，preconnect 不仅完成 DNS 预解析，同时还将进行 TCP 握手和建立传输层协议。可以这样使用：

```css
<link rel="preconnect" href="http://example.com">
```

现代浏览器都试着预测网站将来需要哪些连接，然后预先建立 socket 连接，从而消除昂贵的 DNS 查找、TCP 握手和 TLS 往返开销。然而，浏览器还不够聪明，并不能准确预测每个网站的所有预链接目标。好在，在 Firefox 39 和 Chrome 46 中我们可以使用 preconnect 告诉浏览器我们需要进行哪些预连接。

### 预获取 Prefetching

如果我们确定某个资源将来一定会被使用到，我们可以让浏览器预先请求该资源并放入浏览器缓存中。例如，一个图片和脚本或任何可以被浏览器缓存的资源：

```css
<link rel="prefetch" href="image.png">
```
与 DNS 预解析不同，预获取真正请求并下载了资源，并储存在缓存中。但预获取还依赖于一些条件，某些预获取可能会被浏览器忽略，例如从一个非常缓慢的网络中获取一个庞大的字体文件。并且，Firefox 只会在浏览器闲置时进行资源预获取。

在 Bram Stein 的帖子中说到，这对 webfonts 性能提升非常明显。目前，字体文件必须等到 DOM 和 CSS 构建完成之后才开始下载，使用预获取就可以轻松绕过该瓶颈。

### Subresources

这是另一个预获取方式，这种方式指定的预获取资源具有最高的优先级，在所有 prefetch 项之前进行：

```css
<link rel="subresource" href="styles.css">
```

根据 Chrome 文档：

`rel=prefetch` 为将来的页面提供了一种低优先级的资源预加载方式，而 `rel=subresource `为当前页面提供了一种高优先级的资源预加载。

所以，如果资源是当前页面必须的，或者资源需要尽快可用，那么最好使用 `subresource` 而不是 `prefetch`

### 预渲染 Prerender

这是一个核武器，因为 prerender 可以预先加载文档的所有资源：

```css
<link rel="prerender" href="http://example.com">
```

这类似于在一个隐藏的 tab 页中打开了某个链接 – 将下载所有资源、创建 DOM 结构、完成页面布局、应用 CSS 样式和执行 JavaScript 脚本等。当用户真正访问该链接时，隐藏的页面就切换为可见，使页面看起来就是瞬间加载完成一样。Google 搜索在其即时搜索页面中已经应用该技术多年了

> 所有预加载技术都存在一个潜在的风险：对资源预测错误，而预加载的开销（抢占 CPU 资源，消耗电池，浪费带宽等）是高昂的，所以必须谨慎行事。预加载所有的资源是不可取的，我们应该在用户体验和服务器负载间保持平衡。

### 不是所有的资源都可以预加载

> 当资源为以下列表中的资源时，将阻止预渲染操作：

URL 中包含下载资源

1、页面中包含音频、视频

2、POST、PUT 和 DELETE 操作的 ajax 请求

3、HTTP 认证(Authentication)

4、含恶意软件的页面

5、弹窗页面

6、占用资源很多的页面

7、打开了 chrome developer tools 开发工具

### 手动触发预渲染操作

```javascript
var hint =document.createElement("link");

hint.setAttribute(“rel”,”prerender”);

hint.setAttribute(“href”,”next-page.html”);

document.getElementsByTagName(“head”)[0].appendChild(hint);
```

> 在 Chrome 中打开了 chrome developer tools 开发工具会阻止页面的预渲染，所以我们看不到这个过程，但可以在 chrome://cache/ 或 chrome://net-internals/#prerender 中查看 chrome://dns

## 扩展阅读

1、[很棒的PPT讲解](https://docs.google.com/presentation/d/18zlAdKAxnc51y_kj-6sWLmnjl6TLnaru_WH0LJTjP-o/present?slide=id.g33211238_0_7)

2、[Controlling DNS prefetching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Controlling_DNS_prefetching)

3、[Link prefetching FAQ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)

## 参考

1、http://www.jianshu.com/p/7f58ddfc1392

2、http://bubkoo.com/2015/11/19/prefetching-preloading-prebrowsing/

## 关于性能优化

1、http://www.w3cdream.com/content-sort-21-article-578.html

2、http://ddtalk.github.io/blog/2015/09/07/dingding-first/

3、https://csspod.com/frontend-performance-best-practices/

4、http://dev.cmcm.com/archives/312


