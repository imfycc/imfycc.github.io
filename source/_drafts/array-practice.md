---
title: JavaScript 数组题目集合
date: 2018-03-23 00:31:55
updated: 2018-03-23 00:31:55
tags:
categories: 编程
---

### 数组 copy 不影响原数组

const newArr = arr.slice(0);

### 求和

方案一 递归

```js
var arr = [ 1, 2, 3, 4 ];

function sum(arr) {
    var l = arr.length;
    if (l == 0) {
        return 0; //数组为空时
    } else if (l == 1) {
        return arr[0];
    } else {
        return arr[0] + sum(arr.slice(1));
    }
}
sum(arr);
```

方案二 常规循环

```js
var arr = [ 1, 2, 3, 4 ];

function sum(arr) {
  var sum = 0;  
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
sum(arr);
```

方案三 reduce

```js
var arr = [1,2,3,4];

function sum(arr) {
  return arr.reduce(function(prev, curr, index, arr){
     return prev + curr;
  });
}
sum(arr);
```

方案四 forEach

```js
var arr =[1,2,3,4];

function sum(arr) {
    var s = 0;
    arr.forEach(function(val, idx, arr) {
        s += val;
    });
  
    return s;
};
sum(arr);
```

方案五 eval

```js
var arr =[1,2,3,4];

function sum(arr) {
    return eval(arr.join("+"));
};
sum(arr);
```

### 查找数组里重复出现的元素
var arr = [1, 2, 4, 4, 3, 3, 1, 5, 3];

[1, 3, 4]

### 从数组随机挑选一个元素
### lodash 部分方法的实现






