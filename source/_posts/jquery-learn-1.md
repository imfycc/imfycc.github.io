---
title: 简单实现jQuery核心API
date: 2017-08-27 20:29:28
updated: 2017-08-27 20:29:28
tags:
categories: 编程
---

## 背景

不造轮子的程序员不是好程序员，所以我们今天尝试造一下轮子。今天的主角是 `jQuery` ，虽然现在市面上已被 `React`，`Angular`，`Vue` 等挤的容不下它的位置，但是它的简单 API 设计依然优秀，值得学习和体会。

**任务**

今天造轮子的目标不是实现功能，而是专注在 API 和架构。你需要完成的东西支持以下功能：

1、`$(selector)` 根据选择器构造一个`jQuery` 对象

2、`jQuery` 对象是一个类数组，需要支持以下方法：
```
var a = $(selector);
a[0]                                   访问元素
a.length                               元素个数
a.each(function(){ console.log(this)}) 迭代操作
a.click(function(){...})               绑定事件
```
3、链式调用

```
var a = $(selector);
a.addClass('hello').click(function(){...});
```
4、扩展实例方法

```
$.fn.tabs = function(){
  console.log(this);
};
```
之后就可以这样使用
```
$(selector).tabs();
```

## jQuery 的整体架构

```
( function( global, factory ) {
  //省略...
} )( typeof window !== "undefined" ? window : this,
  function( window, noGlobal ) {
    jQuery = function( selector, context ) {
      return new jQuery.fn.init( selector, context );
      //这里用new，省去了构造函数 jQuery() 前面的运算符new，因此我们可以直接写 jQuery()
    };
    jQuery.fn = jQuery.prototype = {
      jquery: version,
      constructor: jQuery,
      init: function( selector, context, rootjQuery ) {
        // ...
      },
      ...
    };
    // 通过覆盖原型的方式，把 jQuery.prototype 覆盖到 jQuery.fn.init.prototype 上
    jQuery.fn.init.prototype = jQuery.fn;
      // 核心方法
      // 回调系统
      // 异步队列
      // 数据缓存
      // 队列操作
      // 选择器
      // 属性操作
      // 节点遍历
      // 文档处理
      // 样式操作
      // 属性操作
      // 事件体系
      // AJAX交互
      // 动画引擎
    jQuery.extend = jQuery.fn.extend = function(){
    ....//
    };
    //jQuery.extend()和jQuery.fn.extend()
    //用于合并多个对象的属性到第一个对象，类似于 es6 的 Object.assign()，不过还是有区别的
      if ( !noGlobal ) {
        window.jQuery = window.$ = jQuery;
      }
      return jQuery;
  }));

```

`$()` 和 `jQuery()` 是等价的，当我们使用 `$()` 的时候初始化了一个 `jQuery.fn.init` 实例。

`jQuery.fn.init.prototype = jQuery.fn;` 将真正的构造函数 `jQuery.fn.init` 的原型设为了 `jQuery.fn` 也就是 `jQuery.prototype`，所以 `jQuery.fn.init` 创建的对象能够访问到 `jQuery.prototype` 上的属性和方法。

jQuery 对象的构建，为什么使用原型式的结构？
详细解说请点击 [对象的构建](http://www.imooc.com/code/3391)

>jQuery 抽出了所有可复用的特性，分离出单一模块，通过组合的用法，不管在设计思路与实现手法上 jQuery 都是非常高明的。因为 jQuery 的设计中最喜欢的做的一件事，就是抽出共同的特性使之`模块化`，当然也是更贴近 `S.O.L.I.D` 五大原则的`单一职责SRP`了，遵守单一职责的好处是可以让我们很容易地来维护这个对象，比如，当一个对象封装了很多职责的时候，一旦一个职责需要修改，势必会影响该对象的其它职责代码。通过解耦可以让每个职责更加有弹性地变化。

## jQuery对象的构建
使用原型结构，性能上是得到了优化
## 类数组对象结构

```
var jQuery = function(selector) {
  if (!(this instanceof jQuery)) {
    return new jQuery(selector);
  }
var elem = document.querySelectorAll(selector);
  this.length = elem.length;
  this[0] = elem;
  this.context = document;
  this.selector = selector;
  this.get = function(num) {
    return this[num];
  }
  return this;
}

```

```
jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );
```

## 参考

1、[jQuery源码解析](http://www.imooc.com/learn/172)

2、[jQuery对象的构建](http://www.jianshu.com/p/cff2f32cd0d4)
