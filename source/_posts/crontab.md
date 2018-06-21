---
title: 定时任务 crontab 命令的使用
date: 2017-08-05 19:47:32
updated: 2017-08-05 00:00:00
tags:
categories: 编程
---

每个系统用户都可以有自己的 `crontab`（在 `/var/spool/cron/` 下

要查看当前用户的 `crontab`，输入 `crontab -l`

要编辑 `crontab`，输入 `crontab -e`

要删除 `crontab`，输入 `crontab -r`


### 基本格式 :

```
*　　*　　*　　*　　*　　command
分　 时　 日　 月　 周　 命令
```

```
第 1 列表示分钟 1～59 每分钟用 * 或者 */1 表示
第 2 列表示小时 1～23（0 表示 0 点）
第 3 列表示日期 1～31
第 4 列表示月份 1～12
第 5 列标识号星期 0～6（0 表示星期天）
第 6 列要运行的命令
* 逗号( , ) 指定列表值。如:  1, 3, 4, 7, 8
* 中横线( - ) 指定范围值 如  1-6, 代表 1, 2, 3, 4, 5, 6
* 星号 ( * ) 代表所有可能的值
```

### 例子：

```
30 21 * * * /usr/local/etc/rc.d/lighttpd restart
```
上面的例子表示每晚的21:30重启 `apache`。

```
45 4 1,10,22 * * /usr/local/etc/rc.d/lighttpd restart
```
上面的例子表示每月1、10、22日的4 : 45重启 `apache`。

```
10 1 * * 6,0 /usr/local/etc/rc.d/lighttpd restart
```
上面的例子表示每周六、周日的1 : 10重启 `apache`。

```
0,30 18-23 * * * /usr/local/etc/rc.d/lighttpd restart
```
上面的例子表示在每天 18 : 00 至 23 : 00 之间每隔30分钟重启 `apache`。

```
0 23 * * 6 /usr/local/etc/rc.d/lighttpd restart
```
上面的例子表示每星期六的11 : 00 pm重启 `apache`。

```
* */1 * * * /usr/local/etc/rc.d/lighttpd restart
```
每一小时重启 `apache`

```
* 23-7/1 * * * /usr/local/etc/rc.d/lighttpd restart
```
晚上11点到早上7点之间，每隔一小时重启 `apache`

```
0 11 4 * mon-wed /usr/local/etc/rc.d/lighttpd restart
```
每月的4号与每周一到周三的11点重启 `apache`

```
0 4 1 jan * /usr/local/etc/rc.d/lighttpd restart
```
一月一号的4点重启 `apache`

## 扩展
[crontab命令](http://www.cnblogs.com/peida/archive/2013/01/08/2850483.html)

