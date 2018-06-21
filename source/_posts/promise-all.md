---
title: 实现 JavaScript 异步方法 Promise.all
date: 2017-08-15 19:59:17
updated: 2017-08-15 19:59:17
tags:
categories: 编程
---
> 没办法，谁让我是超级英雄呐，又要拯救世界了。

**本次的任务**

假如。。。。。

`JavaScript` v8 引擎发生了重大故障，`Promise.all` 方法变成了 `undefined` ，为了拯救 `JavaScript` 世界，我需要开发一个模块来解决此问题。

使用者需要在代码入口处引入我的模块就可渡过此劫，但要求三个月后官方修改此版本，代码无修改就能自动切换到官方版本。实现 `Promise.all`

## 首先要知道 `Promise` 是什么

`promise` 是对异步编程的一种抽象。它是一个代理对象，代表一个必须进行异步处理的函数返回的值或抛出的异常。

`promise` 最早是在 `commonjs` 社区提出来的，当时提出了很多规范。比较接受的是 `promise/A` 规范。后来人们在这个基础上。提出了 `promise/A+`规范，也就是实际上的业内推行的规范。`ECMAScript 6.0` 也是采用的这种规范。

英文版：https://promisesaplus.com/

中文版：[【翻译】Promises/A+规范](http://link.zhihu.com/?target=http%3A//www.ituring.com.cn/article/66566)

上面的规范中主要定义的 `then` 的实现方式，也就是只规定了 `Promise` 的核心， `Promise.race`，`Promise.all` 等 `api` 没有规定。

[ECMAScript 6.0 Promise.all 规范](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor)


### 特点

** `Promise` 不需要编译器/解释器的支持**

将来可能成为主流的 `async-await`，以及曾经火过一把的 `generator` + `co`，这些都是需要编译器或者解释器级别的支持才能使用。

而 `Promise`，是完全可以利用语言已有特性，作为一个库来实现！即使在非常原始的JS运行环境，你也可以自己实现一个 `Promise`，而不需要等待其他人的帮助。

** `Promise` 是语言无关的**

`Promise` 还是独立于语言的，如果你要给另外一种编程语言实现 `Promise`，只要照葫芦画瓢就行了。

## `promise` 怎么用呐

请看这里：

[ECMAScript 6 Promise入门](http://es6.ruanyifeng.com/#docs/promise)

## 实现 `Promise.all`

`Promise.all` 接收一个 `promise` 对象的数组作为参数，当这个数组里的所有 `promise` 对象全部变为`resolve`或 有 `reject` 状态出现的时候，它才会去调用 `.then` 方法,它们是并发执行的。

### Promise.all() 简介

`Promise.all(promiseArray)` 方法是 `Promise` 对象上的静态方法，该方法的作用是将多个 `Promise` 对象实例包装，生成并返回一个新的 `Promise` 实例。

参数：`promiseArray`，是一个 `Promise` 实例数组

```
var p1 = Promise.resolve(1),
    p2 = Promise.resolve(2),
    p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
    console.log(results);  // [1, 2, 3]
});
```

在上面的方法中，`promise` 数组中所有的 `promise` 实例都变为`resolve` 的时候，该方法才会返回，并将所有结果传递 `results` 数组中。`promise` 数组中任何一个 `promise` 为 `reject` 的话，则整个 `Promise.all` 调用会立即终止，并返回一个 `reject` 的新的 `promise` 对象。`reject` 使用示例如下：

```
var p1 = Promise.resolve(1),
    p2 = Promise.reject(2),
    p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
    //then方法不会被执行
    console.log(results);
}).catch(function (e){
    //catch方法将会被执行，输出结果为：2
    console.log(2);
});
```

### 实现 Promise.all 方法

```
function promiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if (!isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedValues = new Array(promiseNum);
    for (var i = 0; i < promiseNum; i++) {
      (function(i) {
        Promise.resolve(promises[i]).then(function(value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function(reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}
```

## 参考
[自己动手实现ES6 Promise](http://www.jianshu.com/p/48e193c4662e)

[JavaScript Promise迷你书](http://liubin.org/promises-book/#ch2-promise-all)

[Promise对象Promise.all()方法的使用](https://itbilu.com/javascript/js/41KMSZ9a.html)

[深入 Promise(一)——Promise 实现详解](https://zhuanlan.zhihu.com/p/25178630)

## 扩展阅读
[深入浅出js（Node.js）异步流程控制](https://i5ting.github.io/asynchronous-flow-control/#101)
