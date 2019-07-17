---
title: 《算法图解》读书笔记
date: 2018-07-17 12:33:59
updated: 2018-07-17 12:33:59
mathjax: true
tags:
categories: 编程
---

> [《算法图解》](https://book.douban.com/subject/26979890/)是大牛推荐的一本看算法专业书籍前的缓冲书籍，如果感觉[《算法》](https://book.douban.com/subject/10432347/)、[《算法导论》](https://book.douban.com/subject/20432061/) 过于枯燥，可以先看这本通俗易懂的 [《算法图解》](https://book.douban.com/subject/26979890/)

> 以下是我的读书笔记。

#### 第一章 算法简介 收获

1、使用两种方法尝试写了一个二分查找
```JavaScript
// while
function binary_search_1(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  const midFunc = (high, low) => {
    return Math.floor([high + low] / 2);  //不是偶数的时候往下取整
  }
  
  while (low <= high) {
    const mid = midFunc(high, low);
    if (arr[mid] == target) {
      console.log(`${arr[mid]}是目标值${target}`);
      break;
      
    } else if (arr[mid] < target) {
      console.log(`${arr[mid]}小于${target}`);
      low = mid + 1;
     
    } else if (arr[mid] > target) {
      console.log(`${arr[mid]}大于${target}`);
      high = mid - 1;
    } else {
      console.log('不存在需要查找的值');
      return;
    }
  }
}

//递归
function binary_search_2(arr, target) {
  function recursive_binary_search(low, high) {
    const low = low || 0;
    const high = high || arr.length - 1;
    const mid = Math.floor([high + low] / 2);  //不是偶数的时候往下取整
    
    if (arr[mid] == target) {
      console.log(`${arr[mid]}是目标值${target}`);
      
    } else if (arr[mid] < target) {
      console.log(`${arr[mid]}小于${target}`);
      low = mid + 1;
      recursive_binary_search(low, high);
      
    } else if (arr[mid] > target) {
      console.log(`${arr[mid]}大于${target}`);
      high = mid - 1;
      recursive_binary_search(low, high);
      
    } else {
      console.log('不存在需要查找的值');
      return;
    }
  }
}

const list = [1, 3, 6, 9, 12, 15, 19];
console.time('方法一所需时间：');
binary_search_1(list, 12);
console.timeEnd('方法一所需时间：');

console.time('方法二所需时间：');
binary_search_1(list, 15);
console.timeEnd('方法二所需时间：');
```
2、理解二分查找的需要的步数是 ${log_2 n}$

3、`大O表示法`：具体可以看这篇文章 [【算法】一次搞懂大O表示法](./2018/algorithm-big-o.html)

### 《图解算法》 第二章 选择排序 收获

**数组和链表的对比**

数组支持随机访问，读取速度快， 而插入速度慢；

链表只支持顺序访问，读取速度慢，而插入速度快。

| 操作 | 数组 | 链表 |
| --- | --- | --- |
| 读取 | O(1)| O(n)|
| 插入 | O(n)| O(1)|
| 删除 | O(n)| O(1)|

O(n) = 线性时间
O(1) = 常量时间

数组插入元素为什么是 O(n), 比如考虑在数组的首位插入元素

**我们可以分别运用双方的长处**

使用数组存储 26 字母对应的链表，链表里存储以该字母开头的用户名。插入和删除的速度，使用了链表的长处，查询上使用了数组的长处，优化了时间。

⚠️ 只是个例子，实际运用中，有更好的方法。

**选择排序**

遍历数组，寻找最大的（或者最小的）把获取到的值存到另一个数组中，重复执行上面的操作  $O(n^2)$


### 《图解算法》 第三章 递归 收获

**递归**

编写递归函数时，必须告诉它何时停止递归。每个递归函数都有两部分: `基线条件`(base case)和`递归条件`(recursive case)。

递归条件指的是函数调用自己，而基线条件则指的是函数不再调用自己，从而避免形成无限循环。

使用栈虽然很方便，但是也要付出代价: 存储详尽的信息可能占用大量的内存。

每个函数调用都要占用一定的内存，如果栈很高，就意味着计算机存储了大量函数调用的信息。在这种情况下，两种选择。

- 重新编写代码，转而使用循环。递归不一定，更快。只是更优雅。
- 使用尾递归。不是所有语言都支持


#### 《算法图解》第四章收获

> 学习分而治之。有时候，你可能会遇到使用任何已知的算法都无法解决的问题。
> 快速排序使用分而治之的策略。

分而治之 (divide and conquer，D&C) —— 一种著名的递归式问题解决方法。

使用D&C解决问题的过程包括两个步骤。
(1) 找出**基线条件**，这种条件必须尽可能简单。
(2) **递归条件**。不断将问题分解(或者说缩小规模)，直到符合基线条件。（和递归的两个条件是一样的）

![](/media/15306818577933.jpg)

快速排序是最快的排序算法之一，也 是D&C典范。

大O表示法中的常量有时候事关重大，这就是快速排序比合并排序快的原因所在。
 比较简单查找和二分查找时，常量几乎无关紧要，因为列表很长时，O(log n)的速度比O(n)
快得多。

写一个快速排序

最佳情况也是平均情况。只要你每次都随机地选择一个数组元素作为基准值，快速排序的平均运行时间就将为O(n log n)。快速排序是最快的排序算法之一，也是D&C典范。

实现原地分区

理解快速排序的最差和最好大O 表示法

做一下这个：
根据数组包含的元素创建一个乘法表，即如果数组为[2, 3, 7, 8, 10]，首先将每个元素都乘以2，再将每个元素都乘以3，然后将每个元素都乘以7，以此类推。

