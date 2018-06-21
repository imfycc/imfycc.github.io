---
title: 《JavaScript高级程序设计》读书笔记
date: 2017-03-07 09:57:09
updated: 2017-03-07
tags:
categories:
description:
---

## 先上菜，问答

1、JS是哪年诞生的？是谁的杰作？

2、JS有哪几部分组成？

3、JavaScript与ECMAScript的关系？

<!--more-->


# 第一章 JavaScript简介
1972年 推出了C语言

1989年 Python出现

1993年 HTML 现身

1994年 PHP 出现

**1995年 Java出现  同时我们的主角JavaScript诞生**

JS是95后，这样算来，她比我还小一岁呢。

出乎意料的是，CSS居然是1996年发布的。

## 诞生记
当时那个年代，网速很慢的，填写个表单，要30秒后才能回复，还是告诉你，哥们，其中一个表单是必填的，你不能空着。然后你又填好，提交，又要等30秒，好吧。不能忍啊，这不耽误事嘛？于是在网景公司（火狐浏览器的前家）任职的**布兰登.艾奇**（Brendan Eich）开发了JS，人家本来叫LiveScript，当时Java很火，于是带着搭顺风车的的想法，就起了JavaScript这个名字.看来好的名字，确实能带来一些幸运。（从我的名字就能看出，我家人是如此睿智:-D）后来微软又插了一脚，然后....,后来....,ECMAScript诞生了.(具体的故事看原书吧)。
ECMAScript是JS的核心，它规定了JS的语法、类型、语句、关键字、保留字、操作符、对象，提供了核心语言功能。，我们现在讲的这个版本是5，不过6在2015年已经发布了，而且是大幅度的改进，不，应该是飞跃。ES6的诞生注定JS又要牛X了。不过，我们还是学会走，再去学飞奔吧。踏实的学习ES5.

**ECMAScript、DOM、BOM 三部分组成了JavaScript**

![](http://o.hufangyun.com/wp-content/uploads/2016/10/687474703a2f2f3778726466632e636f6d312e7a302e676c622e636c6f7564646e2e636f6d2f31343232333135302d31333739323035303232623034666363393562626435316533613337373230342e706e67.png)

## DOM（文档对象模型）
DOM把整个网页映射为一种**多层**的**节点**结构。

![](http://o.hufangyun.com/wp-content/uploads/2016/10/687474703a2f2f3778726466632e636f6d312e7a302e676c622e636c6f7564646e2e636f6d2f32303132303331343231343333303638382e6a7067.jpeg)

DOM提供了访问和操作页面的接口和方法，开发人员无需重载页面，就可以修改页面内容了。

## BOM（浏览器对象模型）
提供了浏览器交互的接口与方法，用来操作浏览器窗口和框架的东东。



# 第二章 在HTML里使用Js

## 问答

1、如果想让你个脚本，立即下载怎么写？

2、defer什么意思？

1、内嵌式

```js
<script type="text/javascript">
js代码
</script>
```
2、外链式

`<script type="text/javascript" src="文件地址"></script>`

外链式可以添加两个参数：

**async**: 立即下载该脚本

**defer**: 延迟到网页完全解析和显示后再执行脚本

比如：
`<script type="text/javascript" defer="defer" src="123.js"></script>`

如果有多个js文件，没有这两个参数的话，都是按顺序执行，如果存在`defer`、`async` 则脚本的下载顺序，就不能确定了，所以不要给多个文件使用该参数。

#### 最后
1、js脚本最好放在`</body>`前面，规范用法。

2、推荐使用外链式，可维护性好，可缓存。


## 第三章，姗姗来迟啊。好久没有更新了。
>前两章，小打小闹。从这一章开始，我们学习JavaScript的语言核心。

## 3.1 语法
ECMAScript的语法借鉴了C语言和类C(Java、Perl)语言的语法。所以如果学过C语言， 对JS 应该会有亲切感。


### 3.1.1 区分大小写，使用Unicode字符集
区分大小写，这个就没啥好说的了，刺激脑细胞记住呗。

举个例子：

在HTML中设置事件处理程序时，onclick可以写成onClick,但是在js中必须用小写。

Unicode字符集（是ASCII的超集，几乎支持地球上的所有在用语言）



### 3.1.2 标识符
啥是标识符呢？说白了就是起名字，给谁呢？函数、属性、变量。

起名的规则：

1、第一个字符必须是字母或下划线(_)或美元符号（$）。注意是**或**！

2、建议大家使用驼峰命名法。比如：helloWorld    就是第二个单词首字母大写。

3、ECMAScript语法里使用的关键字，是不能用来命名的。比如，var、true等这些就不能用。很好理解嘛皇帝活着的时候，谁敢和他重名。
### 3.1.3 注释

1、单行注释 两道斜杠 `//`

2、多行注释 ` /**/ `
### 3.1.4 严格模式
>ES5（ECNAScript 5)引入了严格模式，目的就是对ES3中一些不安全、不确定的的行为加以控制。严格模式和非严格模式，区别还是很大的，某些在ES3中的行为，在严格模式下会抛出错误提示。


在函数内部或者整个脚本的顶部加上`"use strict"`，这就开启严格模式了。建议大家使用严格模式。

注：IE10以下的浏览器不支持！
### 3.2 关键字和保留字
就是这些词语被JavaScript占用了，我们设置变量的时候，不能使用。哎呀，太多了。附上[传送门]( http://www.itxueyuan.org/view/6627.html)

我个人的话，感觉以下几个注意一下：
>finally
native
super
const
package

大家熟悉一下，起名的时候，避免用这些！
### 3.3 变量
ES的变量是松散型，所谓松散就是就是不用分什么int，double，字符串，数组。可以保存任何类型的数据。

```js
var messge;
var message="hi";
var message=123;
```
如果在函数内定义一个变量，那么这个变量，在函数退出后，就会销毁。例如：

```js
function test(){
	var message = 'hi';
}
test()；
alert(message); //错误！
```

### 3.4 数据类型
ECMAScript的数据类型分为两种：原始类型（基本类型）和对象类型（复杂类型）。

ECMScript中有五种基本数据类型：**Undefined、Null、Boolean（布尔值）、Number（数字）、String（字符串）**

还有一种复杂数据类型：**Object**

这就是ES的六种数据类型，ES不支持任何创建自定义类型的机制，因而所有值最终都将是上述六种类型之一。

数组和函数都是特殊的对象。
> 《JavaScript高级程序设计》里有引用类型的概念，《JavaScript权威指南》是类的概念。

### 3.4.1 typeof操作符

注意了typeof是操作符，加减乘除也是操作符，不是一个函数。主要用来检测给定的变量是什么数据类型，返回一个字符串。当然，就是上面说的那六种。

举例：

```js
var message = "hello world";
alert(typeof message);  //String
alert(typeof 95);  //Number
```
### 3.4.2 Undefined 类型
var 声明但是未初始化的值默认就是undefined

undefined 派生自null,所以

```js
alert('null==undefined');   //true
```
### 3.4.2 Null 类型
null 是空对象指针。

所以

```js
var car = null;
alert(typeof car);//object
```
只要意在保存变量的值还没有真正保存对象，就赋值null,有利于区分undefined与null,比较好的习惯推荐！
### 3.4.2 Boolean 类型
该类型只有两个字面值，false、true.和0、 1是不同的，也不一定相等。

在ES中，所有类型的值都可以使用`Boolean()`函数进行转换，至于转换的结果是true还是false，参照以下的表格：

|数据类型|转化为true值|转化为false值|
|---------|---------|--------|
|Boolean|true|false|
|String|任何非空字符串|空字符串|
|Number|任何非零数字值（包括无穷大）|0和NaN|
|Object|任何对象|null|
|Undefined|不适用（也就是说没有true）|undefined|

由于控制语句if经常会用到布尔类型，所以以上的转化非常重要（以后看实践了）

ES中存在Boolean的自动转化机制。例如：

```js
var message = "Hello World!";
if(message){
alert("Value is true");
}
//会弹出对话框
```
### 3.4.2 Number 类型
十进制的整数，不多说。

前面为零的元素后面的数值小于8，会自动解析为八进制，大于等于8，会自动忽略前面的零。
>例如之前我做的一个小功能，要输出0到9999,不足四位的要用零补齐，比如`0001`，最后统计应该有1000个数字，但是少了很多。就是这个原因，很多数值因为前面带零，变成8进制数字了。

八进制字面量，在严格模式下是无效的。

十六进制字面量，前面两位必须是`0x`

在进行算数计算时，八进制和十六进制表示的数值最终都将转换成十进制数值。

1、浮点数值

由于浮点数值需要的内存空间是整数的两倍，因此ECMScript会不失时机的将浮点数值转化为整数值。
比如：10.0 => 10

2、NaN

`isNaN()` 判断是否是数值

```js
alert(isNaN(true)； //false 会转化为1
alert(isNaN(blue)； //true
alert(isNaN(10)； //false
alert(isNaN('10')； //false 会转化为10
```
3、数值转换
有三个函数可以把非数值转化为数值：`Number()`、`parseInt()`、`parseFloat()`


# 5.1 Object类型
# 5.2 Array类型
>ES的数组与其他语言的数组有很大的不同，ES的数组，可以保存任何类型的数据，而且数组的大小是可以动态调整的，可以自动增长以容纳新数据

### 创建数组
第一种 使用Array构造函数
```
var colors = new Array();
var colors = new Array(3);
var colors = new Array("Vic","Youthink");

//前面的new也可以省略
```
第二种 使用数组字面量方法
```
var colors = [];
var colors =   ["red","green","blue"];

var colors = ["red","green",];
//不要这样声明，不同的浏览器解析不同，可能会生成含两项的数组，也可能含有三项。
```
读取就是加数字索引
`colors[0];`
### length的使用
1、如果索引的数字超出了原数组的长度，就等于新增加数组元素的个数。

2、如果原数组为三项
`colors.length = 2` 会删除最后一项

3、在末尾追加新的一项
(注意不是替换最后一项，是新增，最后一项的索引是length-1)
`colors[colors.length] = "blank"`

ES的数组可以包含4294867295（40多亿）项，放心用吧！
## 5.2.1 检测数组
> ES3 可以用`instanceof`但是它只能检测单一的全局执行环境，如果有多个框架就不行了。

ES5新增的方法 `Array.isArray(value)`
## 5.2.2 转换方法
待看
## 5.2.3 栈方法
`.push()` 在末尾推入一项

`.pop()`  取出末尾的一项

## 5.2.4 队列方法
>与栈方法刚好相反

`.shift()`   从数组的前端删除，并返回该值

`.unshift()` 在数组的前面添加，返回数组长度
```
var colors = ['red','green'];
var count = colors.unshift('blue','black');//注意这两个的顺序
alert(count); //4

['blue','black','red','green']
```
## 5.2.5 重排序方法
`.reverse()` 数组顺序翻转

**？有必要了解一下sort()函数的原理**

`sort()` 默认升序排序，都是用的字符串比较，即使是数字，也是调用数组的toString()方法转化成字符串比较

```
var values = [0,1,5,10,15];
values.sort();
alert(values); //  0,1,10,15,5  10的十位为1比5小
```
`sort()`在很多情况下，不是最佳方案，因此`sort()`方法可以接收一个比较函数作为参数。这样也可以控制升序还是降序
```
function compare(v1,v2){
    if(v1>v2){
       return 1;
    }else if(v1<v2){
       return -1;
    }else{
       return 0;
    }
}

var values = [0,1,5,10,15];
values.sort(compare);
alert(values); //  0,1,5,10,15
```
对于数值类型或者valueOf()方法会返回数值类型的对象类型，可以使用一个更简单的比较函数。
```
function compare(v1,v2){
    return v1 - v2;//返回的大于小于或等于零的值影响排序结果
}
```

## 5.2.6 操作方法
1、`.concat()`
>该方法会先生成原数组的一个副本，然后再将传入的参数加入到这个副本的末尾，不会影响原数组，传入的参数可以是数组也可以是一个元素。

2、`.slice()`
>该方法是生成新的数组，可以接受两个参数，第一个是起始位置(0是第一项)，第二个是结束位置（可省略，但不包括结束位置），只有一个参数时，默认结束位置到最后

传入负数会是数组长度与参数的和（比如数组长度为5，（-2，-1）和（3,4）一样）。结束位置小于起始位置返回空数组

```
var colors = ['red','green','blue','blank','yellow'];
var colors2 = colors.slice(1,4);
//['green','blue','blank'];
```

3、`.splice()`

数组里最强大的方法,返回值是删除的项，在原数组上操作。
**删除**
>传入两个参数，要删除的第一项的位置和要删除的项数。`.splice(0,2)`会删除数组的前两项

**替换**
>起始位置，要删除的项数，传入任意数量的数组元素
`.splice(2,1,'red','blue')`

**插入**
>起始位置，0(要删除的项数)，传入任意数量的数组元素
`.splice(2,0,'red','blue')`

## 5.2.7 位置方法
`indexOf()` 从前向后
`lastIndexOf()` 从后向前

>都接受两个参数，要查找的项和开始的位置索引(可选),没有找到返回`-1`,查找使用的`===`。 `indexOf(4,4)`查找数组里为`4`的那一项，从索引为四的那一项开始找，返回的是在数组中的索引

```
[1,2,3,4,5,4] //5
```
## 5.2.8 迭代方法
>都是运行给定的函数，返回对应的值
IE8不支持

`.map()`  函数调用返回的结果组成的数组
`.some()` 其中一项返回true，结果就返回true
`.every()`每一项返回true，结果就返回true
`.filter()` 给定函数返回true的项组成的数组
`.forEach()` 运行函数，没有返回值

```
var numbers = [1,2,3,4,5,6];
var everyResult = numbers.every(function(item，index，array){
    return (item > 2);
});
alert(everyResult); //false
```
## 5.2.9 缩小方法
>都接受两个参数，每一项都调用的函数和起始位置（可选）

`reduce()` 从前往后
`reduceRight()` 从后往前

传入的函数，可以接受四个参数。前一个值，下一个值，索引，数组
例如求和：
```
var numbers = [1,2,3,4,5,6];
var result = numbers.reduce(function(prev,cur,index,array){
    return prev + cur ;
});
alert(result); //21
```
