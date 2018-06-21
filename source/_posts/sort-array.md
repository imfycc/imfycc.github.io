---
title: 深入浅出 JavaScript 的Array.prototype.sort 排序算法
date: 2017-08-07 19:56:42
updated: 2017-08-13 19:56:42
tags:
categories: 最热
---

## 本文要解决的问题

> 1、找出 `Array.prototype.sort` 使用的什么排序算法

>2、用一种直观的方式展示 `Array.prototype.sort` 的时间复杂度，看看它有多快？

>3、实际开发中要注意的问题

## `Array.prototype.sort` 各浏览器的算法实现

[ECMAScript 5.1](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.11)

[ECMAScript 6.0](http://www.ecma-international.cma-262/6.0/#sec-array.prototype.sort)

[ECMAScript 草案](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort)

看完上面三个规范中 `Array.prototype.sort` 部分，我们会发现 `ECMAScript` 不同版本规范对 `Array.prototype.sort` 的定义中没有要求用什么样的排序方式实现 `sort()` 方法，也没有要求是否要采用稳定算法（下文会解释什么是稳定算法）。

因此各浏览器都给出自己的实现方式：

表格内容部分来自于[维基百科](https://zh.wikipedia.org/wiki/JavaScript%E5%BC%95%E6%93%8E)

浏览器               | 使用的 JavaScript 引擎  | 排序算法 | 源码地址
---------------------|-------------------------|---------|-----
Google Chrome        | V8                      | 插入排序和快速排序 |[`sort` 源码实现](https://github.com/v8/v8/blob/master/src/js/array.js#L768)
Mozilla Firefox      | SpiderMonkey            | 归并排序 |[`sort` 源码实现](https://github.com/mozilla/gecko-dev/blob/master/js/src/jsarray.cpp)
Safari               | Nitro（JavaScriptCore ） | 归并排序和桶排序 |[`sort` 源码实现 ](https://github.com/WebKit/webkit/blob/master/Source/JavaScriptCore/builtins/ArrayPrototype.js#L423)
Microsoft Edge 和 IE(9+) | Chakra                  | 快速排序 |[ `sort` 源码实现](https://github.com/Microsoft/ChakraCore/blob/master/lib/Common/DataStructures/QuickSort.h)


### 源码分析

V8引擎的一段注释
```js
// In-place QuickSort algorithm.
// For short (length <= 10) arrays, insertion sort is used for efficiency.
```

`Google Chrome` 对 `sort` 做了特殊处理，对于长度 `<= 10` 的数组使用的是插入排序(稳定排序算法) ，`>10` 的数组使用的是快速排序。快速排序是不稳定的排序算法。

但是很明显比我们常见的快速排序要复杂得多，不过核心算法还是快速排序。算法复杂的原因在于v8出于性能考虑进行了很多优化。

再看 `safari` `Nitro` 引擎的一段代码

```js
if (typeof comparator == "function")
  comparatorSort(array, length, comparator);
else if (comparator === null || comparator === @undefined)
  stringSort(array, length);

  省略....

function stringSort(array, length)
{
  var valueCount = compact(array, length);

  var strings = @newArrayWithSize(valueCount);
  for (var i = 0; i < valueCount; ++i)
      strings[i] = { string: @toString(array[i]), value: array[i] };

  bucketSort(array, 0, strings, 0);
}

  省略....

function comparatorSort(array, length, comparator)
{
  var valueCount = compact(array, length);
  mergeSort(array, valueCount, comparator);
}
```
默认使用的桶排序，如果 `sort` 传入的自定义函数作为参数，就是用归并排序（稳定排序算法）

`Firefox` 源码就不贴了，上面的表格有源码地址，使用的稳定排序算法 — 归并算法。
`Microsoft Edge` 和 `IE(9+)` 使用的不稳定排序算法 - 快速排序。
但是 IE（6、7、8）使用的稳定算法。


### 各种算法的对比

排序类型|平均情况|最好情况|最坏情况|辅助空间|稳定性|
-------|------|-------|-------|------|-----|
快速排序|O(nlogn)|	O(nlogn)|	O(n²)|	O(nlogn)|	不稳定
归并排序|	O(nlogn)	|O(nlogn)|	O(nlogn)|	O(n)|	稳定
插入排序|	O(n²)|	O(n)	|O(n²)	|O(1)	|稳定
桶排序	 |O(n+k)|	O(n+k)|	O(n²)|	O(n+k)|	(不)稳定

注: 桶排序的稳定性取决于桶内排序的稳定性, 因此其稳定性不确定。

**算法时间复杂度**

    在进行算法分析时，语句总的执行次数T(n)是关于问题规模n的函数，
    进而分析T(n)随着n的变化情况并确定T(n)的数量级。
    算法的时间复杂度，也就是算法的时间度量，记作：T(n)=O(f(n))。
    它表示随问题规模n的增大，算法执行时间的增长率和f(n)的增长率相同，
    称作算法的时间复杂度，简称为时间复杂度。
    其中f(n)是问题规模n的某个函数。

**常用的时间复杂度所耗费的时间从小到大依次是**

O(1) < O(logn) < O(n) < O(nlogn) < O(n²) < O(n³) < O(2^n) < O(n!) < O(n^n)

![](https://ws1.sinaimg.cn/large/006tNc79ly1fij5oloa7fj319o0wo424.jpg)

[图片来源](http://bigocheatsheet.com/)

算法的时间复杂度与运行时间有一些常见的比例关系 [查看图表来源](http://www.cnblogs.com/gaochundong/p/complexity_of_algorithms.html)

复杂度	|10|	20|	50|	100	|1,000|	10,000|	100,000
------|-----|----|----|-----|----|----|-------
O(1)	|< 1s|	< 1s|	< 1s|	< 1s|	< 1s|	< 1s|	< 1s
O(log(n))	|< 1s|	< 1s|	< 1s|	< 1s|	< 1s|	< 1s|	< 1s
O(n)	|< 1s|	< 1s|	< 1s|	< 1s|	< 1s|	< 1s|	< 1s
O(n*log(n))|	< 1s	|< 1s|	< 1s|	< 1s|	< 1s|	< 1s|	< 1s
O(n²)	|< 1s	|< 1s	|< 1s	|< 1s	|< 1s	|2 s	|3-4 min|
O(n³)	|< 1s	|< 1s	|< 1s	|< 1s	|20 s	|5 hours	|231 days
O(2^n)	|< 1s	|< 1s	|260 days	|hangs	|hangs	|hangs	|hangs
O(n!)	|< 1s	|hangs	|hangs	|hangs	|hangs	|hangs	|hangs
O(n^n)	|3-4 min	|hangs	|hangs	|hangs	|hangs	|hangs	|hangs

**维基百科关于算法稳定性的解释**

> 当相等的元素是无法分辨的，比如像是整数，稳定性并不是一个问题。然而，假设以下的数对将要以他们的第一个数字来排序。

```
(4, 1)  (3, 1)  (3, 7)（5, 6）
```
在这个状况下，有可能产生两种不同的结果，一个是让相等键值的纪录维持相对的次序，而另外一个则没有：

```
(3, 1)  (3, 7)  (4, 1)  (5, 6)  (维持次序）
(3, 7)  (3, 1)  (4, 1)  (5, 6)  （次序被改变）
```
**想看自己浏览器排序算法的稳定性？** [点我](http://ofb.net/~sethml/is-sort-stable.html)

## 有多快哪

我们先通过这个[在线网站](http://math.hws.edu/eck/js/sorting/xSortLab.html)大体测试一下

![](https://ws2.sinaimg.cn/large/006tNc79ly1fij7d6mhr8j314607i75u.jpg)

## 浏览器的实现不同有什么影响

排序算法不稳定有什么影响

举个例子：

某市的机动车牌照拍卖系统，最终中标的规则为：

 1、按价格进行倒排序；

 2、相同价格则按照竞标顺位（即价格提交时间）进行正排序。

排序若是在前端进行，那么采用快速排序的浏览器中显示的中标者很可能是不符合预期的。

**解决办法**

[Array.prototype.sort 在不同浏览器中的差异和解决办法](http://ued.ctrip.com/blog/array-prototype-sort-differences-in-different-browsers-and-solution.html)

大体的思路就是，自己写一个稳定的排序函数，以保持各浏览器的一致性。

## 扩展阅读

[快速排序（Quicksort）的Javascript实现](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html?bsh2、_bid=124324679)

[JS中可能用得到的全部的排序算法](http://louiszhai.github.io/2016/12/23/sort/#归并排序)

[7 种常用的排序算法-可视化](http://www.cnblogs.com/tsingke/p/5347660.html)

[深入了解javascript的sort方法](http://www.iteye.com/topic/1138374)

[JavaScript 排序算法汇总](http://www.qcyoung.com/2016/12/18/JavaScript%20%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E6%B1%87%E6%80%BB/)

[JS中可能用得到的全部的排序算法](http://louiszhai.github.io/2016/12/23/sort/#归并排序)

## 参考文档
[聊聊前端排序的那些事](http://efe.baidu.com/blog/talk-about-sort-in-front-end/)

[排序算法](https://zh.wikipedia.org/wiki/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95#.E7.A9.A9.E5.AE.9A.E6.80.A7)


[JavaScript排序算法汇总](http://www.qcyoung.com/2016/12/18/JavaScript%20%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E6%B1%87%E6%80%BB/)

https://segmentfault.com/a/1190000008138236

http://www.iteye.com/topic/1138374

http://www.chongchonggou.com/g_41116884.html

https://www.teakki.com/p/57dfbf44d3a7507f975f1dd4

http://www.cfei.net/archives/21242
http://bbs.it-home.org/thread-71910-1-1.html

https://www.ctolib.com/topics-74795.html

http://www.techug.com/post/sort-in-browser.html

http://imweb.io/topic/565cf7253ad940357eb99881


