---
title: Js判断滚动条是否停止
date: 2017-03-23 14:20:37
updated: 2017-03-23
tags: [JavaScript,前端]
categories: 编程
description:
---

> 最近做的一个需求，要在页面结束滚动时触发某个函数。我本来以为Js的滚动监听会有相关的处理api，但是js本身是无法判断滚动条是在滚动状态还是停止状态。😊 需要自己编码~~~~

### 思路
加一个定时器，每隔一定时间，将现在的页面位置和上一次的进行对比。如果位置相同，代表滚动结束。

### react实现方案

```js
componentDidMount() {
    this.listenScroll();
}

listenScroll() {
// IOS Wechat 和 App 内scroll 事件页面滚动完才触发
  // 用 touchmove 事件代替 scroll 事件
  if (isIos()) {
    window.addEventListener('touchmove', () => {
        this.locate();
    });
      return;
    }
    window.addEventListener('scroll', () => {
      this.locate();
    });
}

locate() {
  if (this.win) {
    return;
  }
  let old = document.body.scrollTop;
  this.win = interval(300, () => {
    if (document.body.scrollTop === old) {
      ...
      interval.clear(this.win);
      this.win = null;
      return;
    }
    old = document.body.scrollTop;
  });
}
```

### 参考链接
http://blog.csdn.net/ghsau/article/details/8693824
