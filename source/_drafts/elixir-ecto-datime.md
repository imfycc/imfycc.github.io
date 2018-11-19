---
title: 搞懂 Elixir Ecto 的时间概念
date: 2018-11-15 23:03:25
updated: 2018-11-15 23:03:25
tags:
categories: 编程
---

## 背景

> 通过这篇文章我想了解、学习的几个问题

* Elixir 的时间格式
* Elixir 各种时间格式之间的转化
* Ecto 是什么时间格式
* 前端的时间转换成 Ecto 和 Elixir 的时间
* 数据库保存的时间有时区问题
* Timex 库的使用
* 番外 Momentjs 常用场景总结

## Elixir 的时间格式

通俗易懂中文文档

* [Elixir School 日期和时间](https://elixirschool.com/zh-hans/lessons/basics/date-time)

原汁原味英文文档

* [Time](https://hexdocs.pm/elixir/Time.html)
* [Date](https://hexdocs.pm/elixir/Date.html)
* [DateTime](https://hexdocs.pm/elixir/DateTime.html)
* [NaiveDateTime](https://hexdocs.pm/elixir/NaiveDateTime.html)

日历

* [Calendar](https://hexdocs.pm/elixir/Calendar.html)
* [Calendar.ISO](https://hexdocs.pm/elixir/Calendar.ISO.html)


https://stackoverflow.com/questions/43292806/ecto-elixir-how-can-i-query-by-date

ecto @timestamps_opts- 配置使用的默认时间戳类型timestamps。默认为[type: :naive_datetime];

:date	Date	
:time	Time	
:naive_datetime	NaiveDateTime	
:naive_datetime_usec	NaiveDateTime	
:utc_datetime	DateTime	
:utc_datetime_usec	DateTime

日期时间类型
有四种不同的日期时间原始类型：

naive_datetime- 具有秒的精度并将值转换为Elixir的NaiveDateTime结构，该结构没有时区信息。

naive_datetime_usec- 默认精度为微秒，并且还将值转换为NaiveDateTime没有时区信息。

utc_datetime- 具有秒的精度并将值转换为Elixir的DateTime结构，并期望将时区设置为UTC。

utc_datetime_usec默认精度为微秒，并且还会将值转换为DateTime期望将时区设置为UTC。

拥有这些不同类型允许开发人员选择与数据库兼容的类型以及项目的精度要求。例如，某些旧版本的MySQL在datetime字段中不支持微秒。

在选择要使用的日期时间类型时，请记住Elixir函数NaiveDateTime.utc_now/0的默认精度为6.将精度大于0的值转换为非usec类型将截断所有微秒并将精度设置为0。

Elixir

Elixir 内置了几个处理时间的模块。不过需要注意的是，这些模块只能处理 UTC 时间。

iex> Time.utc_now
~T[19:39:31.056226]

## 扩展：时间日期的几个概念

UTC
> 世界协调时间，也称作国际标准时间。

GMT
> 格林威治标准时间，和地球自转有关，没有 UTC 准确。粗略来说和 UTC 差不多，都是 24 个时区。

ISO 8601
> 国际标准化组织的国际标准是日期和时间的表示方法。这只是表示时间的方法，可以表示 UTC 时间。
> 例如，20100607T152000Z，表示2010年6月7号15点20分0秒，Z 表示是标准时间
> 如果表示北京时间，那么就是：20100607T152000+08，其中 “+08” 表示东八区。

本地时间
> UTC 有时区的差别，中国北京的东八区和 UTC 差八个时区，所以要加 8个小时。

Unix 时间戳
> 在计算机中看到的 UTC 时间都是从（1970年01月01日 0:00:00)开始计算秒数的。所看到的 UTC 时间那就是从1970年这个时间点起到具体时间共有多少秒。 这个秒数就是 Unix 时间戳。
