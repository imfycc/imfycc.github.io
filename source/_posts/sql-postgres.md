---
title: 【随用随查】PostgreSQL 实践笔记
date: 2017-10-30 22:24:45
updated: 2019-09-17
tags:
categories: 编程
---

> 本文记录了 `PostgreSQL` 基本操作，入门的 `SQL` 语句以及高阶的联表查询等内容。本文自用，时常更新。`PostgreSQL` 和 `MySQL` 的 `SQL` 语句基本相同，应该选择哪个？可以参考文末的[扩展阅读](#扩展阅读)。

{% qnimg sql-postgresql.png extend:?imageView2/2/w/600 %}

## 文档
[PostgreSQL轻松学](https://pg.sjk66.com/)

[w3schoolSQL教程](http://www.w3school.com.cn/sql/sql_func_format.asp)

[PostgreSQL 英文文档](https://www.postgresql.org/docs/9.6/static/reference.html)

[极客学院SQL教程](http://wiki.jikexueyuan.com/project/sql/)

## 安装

### macOS

`macOS` 上可以使用 `brew` 安装

```shell
brew install postgres
```

### Ubuntu

安装

```shell
sudo apt install postgresql-11
```

查看状态

```shell
sudo systemctl status postgresql
```

切换用户

```shell
sudo -i -u postgres
psql
```

## 使用

[Mac 下使用 homebrew 安装 postgresql 及配置](http://blog.everlose.com/mac-homebrew-postgresql.html) 

##### mac 启动 postgreSQL 服务

```shell
pg_ctl -D /usr/local/var/postgres start

or

# 服务在后台运行
brew services start postgresql
```
##### 连接远程数据库

```
 psql -h IP或者主机地址 -p 端口 -U 用户 -d 数据库
 
 psql -h 117.12.116.18 -p 5432 -U web -d test
```
##### 控制台命令
```
\h：查看SQL命令的解释，比如\h select。
\?：查看psql命令列表。
\l：列出所有数据库。
\c [database_name]：连接其他数据库。
\d：列出当前数据库的所有表格。
\d [table_name]：列出某一张表格的结构(包含索引)。
\du：列出所有用户。
\q：退出数据库。
\conninfo：列出当前数据库和连接的信息。
```
##### 数据操作
```sql
# 创建数据库
CREATE DATABASE name;
# 创建新表 
CREATE TABLE users (name VARCHAR(20), signup_date DATE);
# 插入数据 
INSERT INTO users(name, signup_date) VALUES('小猿大圣', '2017-01-15');
# 选择记录 
SELECT * FROM users;
# 更新数据 
UPDATE users set name = '小猿大圣' WHERE name = '小猿大圣';
# 删除记录 
DELETE FROM users WHERE name = '小猿大圣' ;
# 添加栏位 
ALTER TABLE users ADD email VARCHAR(40);
# 更新结构 
ALTER TABLE users ALTER COLUMN signup_date SET NOT NULL;
# 更名栏位 
ALTER TABLE users RENAME COLUMN signup_date TO signup;
# 删除栏位 
ALTER TABLE users DROP COLUMN email;
# 删除表格 
DROP TABLE backups;
# 删除数据，速度快，会保留表结构
TRUNCATE TABLE tablename;
# 删除数据以及外键
TRUNCATE TABLE tablename CASCADE;
# 求平均值
SELECT AVG(helper) FROM games;
# 求最大值
SELECT MAX(helper_num) FROM games;
# 求数量不重复
SELECT COUNT(DISTINCT open_id) FROM games;
# 求和
SELECT SUM(amount) FROM games; 
# 模糊查询
SELECT * FROM users WHERE name LIKE '小猿大%';
# 排序 ASC 升序 默认，DESC 降序
SELECT c1, c2 FROM tbl_name ORDER BY c1 ASC, c2 DESC;
```

##### 场景

```sql
# 查出表中有重复的 id 的记录，并计算相同 id 的数量
SELECT user_id,COUNT(user_id) FROM games GROUP BY user_id HAVING (COUNT(user_id)>1)
# 合集 合并 Helpers 表和 Games 表 的 user_id 字段 (ALL 是不去重)
SELECT user_id FROM games UNION ALL SELECT assistance_user_id FROM helpers;
# 统计上表中的字段重复的次数
SELECT count,COUNT(count) FROM (SELECT user_id,COUNT(user_id) FROM (SELECT user_id FROM games UNION ALL SELECT assistance_user_id FROM helpers ) AS foo;
```

### 进阶
#### 如何从 `csv` 文件更新数据到数据库？ [点击我](https://stackoverflow.com/questions/8910494/how-to-update-selected-rows-with-values-from-a-csv-file-in-postgres)

#### 如果将查询结果导出到 `csv` 文件
```sql
\copy (select distinct helpers.open_id from helpers left join users on helpers.open_id = users.open_id  where users.open_id is null union select open_id from users where id in (select user_id from exchanges)) TO '/tmp/rm_openid.csv' (format CSV);
```

```sql
\copy (select union_id  From users where open_id is null) TO '/tmp/filename.csv' (format CSV);
```

#### 数据库备份

**备份数据库数据**

```sql
pg_dump --host 地址 --port 端口 --username 数据库的用户名 > 导出的文件 数据库名字

例子:

pg_dump --host xxxxx.com --port 3434 --username admin  > file.sql dataname
```
**数据导入数据库**

```sql
psql -d 数据库名字 -f 文件名 用户名

例子:

psql -d dataname -f file.sql admin
```

#### 联表查询

将来补充

#### 用户、角色、权限管理
[PostgreSQL学习笔记(九) 用户、角色、权限管理](http://www.jianshu.com/p/b09d0b29faa9)

创建用户并赋予权限

```ebnf
CREATE USER www WITH PASSWORD 'u867#eDgg6#2@elo098OIUh';

CREATE DATABASE my_app_prod OWNER www;

alter role www login createdb;

```

#### 报错解决

1、macOS postgres 角色不存在

```shell
** (Postgrex.Error) FATAL 28000 (invalid_authorization_specification): role "postgres" does not exist
```

**解决**

```sql
psql -d postgres

CREATE DATABASE postgres WITH OWNER postgres;

CREATE USER postgres SUPERUSER;
```


## 扩展阅读

[MySQL与PostgreSQL：该选择哪个开源数据库？哪一个更好？](http://www.infoq.com/cn/news/2013/12/mysql-vs-postgresql)

[为什么选择PostgreSQL而不是MySQL](http://www.infoq.com/cn/news/2015/03/why-postgresql-not-mysql)



