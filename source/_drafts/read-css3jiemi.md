---
title: 《CSS3揭秘》读书笔记
date: 2017-03-06 06:44:35
updated: 2017-03-08 
tags: 技术笔记
categories:
description:
---


2017.3.6
## 第一章：

1、第三页 css规范的各个阶段。

    编辑草案（ed）
    首个公开工作草案(FPWD)
    工作草案(WD)
    候选推荐规范(CR)
    提名推荐规范(PR)
    正式推荐规范(REC)
2、关于本书  检测某个样式是否支持某个浏览器 js 里dom.style
<!--more-->
3、代码可维护性的最大要素就是：尽量减少改动时要编辑的地方。

4、尝试实现一个可扩展的按钮

     ①先实现基本代码。
     ②看看那些代码是可以关联的。当某些值相互依赖时，应该把它们的相互关系用代码表达出来。
     比如 font-size:20px; line-height:30px; => font-size:20px; line-height:1.5;
     ③扩展需要改哪些代码

5、`currentColor` 如果没有设置颜色，自动从文本继承。

6、使用inherit属性 无需重复定义，总是绑定到父元素的计算值

7、使用HSAL 来产生半透明的背景色，因为它的字符长度更短，敲起来更快。

8、em 是和父级相关的，rem是和根元素。比如字号，想和父级元素建立关系，使用em。

9、css中相关性，是个很重要的特性，但你得想清楚哪些东西是真正相关的。

10、尽量减少代码重复

11、如果背景图片需要完整的铺满一个容器，不管容器的尺寸如何变化，background-size:cover 这个属性都可以做到。

12、合理的使用简写。简写有时候，更容易覆盖，扩展性更好。

13、
```css
background: url(tr.png) no-repeat top right / 2em 2em,
url(br.png) no-repeat bottom right / 2em 2em,
            url(bl.png) no-repeat bottom left / 2em 2em;
```
=>

```css
background: url(tr.png) top right, url(br.png) bottom right,
url(bl.png) bottom left;
background-size: 2em 2em;
background-repeat: no-repeat;
```

## 第二章
### 背景与边框
#### 1、半透明边框

1.1、给一个容器设置一层白色背景和一道半透明白色边框

错误的写法：
```css
border: 10px solid hsla(0,0%,100%,.5);
background: white;
```
背景会延伸到边框的区域下层。所以边框还是白色的。不能实现我们想要的效果。

```css
border: 10px solid hsla(0,0%,100%,.5);
background: white;
background-clip: padding-box;
```
通过 `background-clip` 属性来调整上述默认行为所带来的不 便。这个属性的初始值是 `border-box`，意味着背景会被元素的 border box
(边框的外沿框)裁切掉。如果不希望背景侵入边框所在的范围，我们要做 的就是把它的值设为 `padding-box`，这样浏览器就会用内边距的外沿来把背 景裁切掉。

#### 2、多重边框

```
box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink;
```
可以使用逗号，实现多重边框，第二层边框是 10+5=15  宽度是5

`outline`描边。不支持多重描边。但是可以通过 `outline-offset` 属性来控制它跟 元素边缘之间的间距，这个属性甚至可以接受负值。

#### 灵活的背景定位
```css
background: url(code-pirate.svg) no-repeat bottom right #58a;
background-position: right 20px bottom 10px;
```
在不支持 background-position 扩展语法的浏览器中，把老套的 bottom right 定位值写进 `background` 的简写属性中。

`background-origin`，可以用它来改变这种行为。 在默认情况下，它的值是(闭着眼睛也猜得到)`padding-box`。如果把它的 值改成 `content-box`(参见下面的代码)，我们在`background-position` 属性中使用的边角关键字将会以内容区的边缘作为基准.

![](https://ww3.sinaimg.cn/large/006tNbRwly1fdd0kp5lpaj305n04aq36.jpg)

```css
background-origin: content-box;
```

```css
background-position: calc(100% - 20px) calc(100% - 10px);
```
可以使用 `calc` 计算。`+ — * /` 两边都要加空格

2017.3.6
#### 4、边框内圆角
用一个HTML标签 + CSS3属性，如何实现这个效果。

外部描边 + box-shadow阴影（填补缝隙）

#### 5、条纹背景
最简单的渐变
```css
background: linear-gradient(#fb3, #58a);
```
![](https://ww4.sinaimg.cn/large/006tNbRwly1fde1t05095j305m03d748.jpg)

指定一下位置，如果两个位置的值，设置的相同，就不会有渐变的效果了
```css
background: linear-gradient(#fb3 20%, #58a 80%);
```
通过 background-size 来调整其尺寸
```css
background: linear-gradient(#fb3 50%, #58a 50%);
background-size: 100% 30px;
```
如果某个色标的位置值比整个列表中在它之前的色标的位置值都要小，则该色标的位置值会被设置为它前面所有色标位置值的最大值。下面的代码，写0的话，使用的是30%
```
   background: linear-gradient(#fb3 30%, #58a 0);
   background-size: 100% 30px;
```
![](https://ww3.sinaimg.cn/large/006tNbRwly1fde274hdfgj305m03hwee.jpg)

垂直条纹
```css
background: linear-gradient(to right, /* 或 90deg */ #fb3 50%, #58a 0);
background-size: 30px 100%;
```
45deg
```
background: linear-gradient(45deg,
#fb3 25%, #58a 0, #58a 50%,
#fb3 0, #fb3 75%, #58a 0);
background-size: 30px 30px;
```
![](https://ww4.sinaimg.cn/large/006tNbRwly1fde2z1u9jzj305n09n761.jpg)

还有个 `radial-gradient` 看字面意思，是以圆心渐变。不知道后文有没有介绍


循环式渐变
```
background: repeating-linear-gradient(45deg, #fb3, #58a 30px);
```
相当于
```
background: linear-gradient(45deg, #fb3, #58a 30px,
              #fb3 30px, #58a 60px,
              #fb3 60px, #58a 90px,
              #fb3 90px, #58a 120px,
              #fb3 120px, #58a 150px, ...);
```
画60度，更简单的方法 度数翻转的这种，都是从左下角为0开始计算的。
```
background: repeating-linear-gradient(60deg,
#fb3, #fb3 15px, #58a 0, #58a 30px);
```
![](https://ww2.sinaimg.cn/large/006tNbRwly1fde3n08rajj305j03fq3r.jpg)

直设置一个色值，浅颜色的地方背景色处理。
```
backgroud: #58a;
background-image: repeating-linear-gradient(30deg,
                    hsla(0,0%,100%,.1),
                    hsla(0,0%,100%,.1) 15px,
                    transparent 0, transparent 30px);
```
![](https://ww3.sinaimg.cn/large/006tNbRwly1fde3pi7frmj305l031t8o.jpg)

2017.3.8
#### 6、复杂的背景图案
画网格
```css
background: #58a;
background-image:
    linear-gradient(white 1px, transparent 0),
linear-gradient(90deg, white 1px, transparent 0);
background-size: 30px 30px;
```
![](https://ww2.sinaimg.cn/large/006tNbRwly1fdffzmxvjlj305i03imx3.jpg)

>首先明确每个小格是30x30的，`transparent 0` 0肯定是用了前面的`1px`这个单位,也就是从1px到100%透明，因为有背景色，所以是蓝色。

我们一直在用线性渐变生成图案。但是，径向渐变同样也是 非常实用的，因为它允许我们创建圆形、椭圆。

波点

```css
background: #655;
background-image: radial-gradient(tan 30%, transparent 0),
radial-gradient(tan 30%, transparent 0); background-size: 30px 30px;
background-position: 0 0, 15px 15px;

错位实现效果

```
![](https://ww1.sinaimg.cn/large/006tNbRwly1fdfgadqckaj305l03h0t6.jpg)

实现一个棋盘省略了。不过css真是充满无穷的想象力。

css实现的一些背景示例 http://bennettfeely.com/gradients/

相比之下更具优势，比图片文件大小小太多了。


#### 7、伪随机背景
质数的使用
#### 8、连续的图像边框

### 第三章 形状
#### 9、自适应的椭圆
