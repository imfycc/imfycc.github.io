---
title: ESLint 的禁用规则
date: 2018-08-08 14:57:05
updated: 2018-08-08 14:57:05
tags:
categories: 编程
---

> 有些情况下，对于某些代码，我们该怎么禁用 ESLint 代码规范检查呐？

[官方文档](https://eslint.org/docs/user-guide/configuring.html#configuring-rules)

## 禁用方法

代码块禁用

1、禁用所有规则
```
/*eslint-disable */

code...

/*eslint-enable */
```

2、禁用指定的规则
> 多个规则间用逗号分隔

```
/*eslint-disable no-alert, no-console */

code...

/*eslint-enable */
```

单行代码禁用

```
code... // eslint-disable-line

code... // eslint-disable-line no-alert, quotes
```

禁用下一行
```
code...
// eslint-disable-next-line no-alert, quotes 
```

##  禁用的规则名哪里找？

ESLint 在终端提示的信息里就有对应的 rule-name

![-w493](/media/15337126571518.jpg)

