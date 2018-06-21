---
title: 使用 edeliver 部署 Elixir 应用程序
date: 2017-12-11 00:00:00
updated: 2018-03-01 00:00:00
tags:
categories: 编程
---

![1786864843-5a2b22b4e6cd1_articlex](/media/1786864843-5a2b22b4e6cd1_articlex.png)


> 最近使用 `Elixir` 的 web 框架 `Phoenix` 开发了一个简单的应用，部署的时候踩了不少坑。做一下笔记。

## 引入 edeliver 依赖

修改 `mix.exs` 文件，引入 [edeliver](https://github.com/edeliver/edeliver) 依赖

```elixir
def application, do: [
  applications: [
    :edeliver
  ]
]

defp deps do
  [
    ...
    {:edeliver, "~> 1.4.4"},
    {:exrm, ">= 0.16.0", warn_missing: false},
  ]
end
```

这里有两种组合 `edeliver` + `distillery` 或者 `edeliver` + `exrm`，我选用了后者。因为配置更简单一点。🐒

## edeliver 配置

在项目文件夹，创建 `.deliver/config` 文件

```bash
APP="your-erlang-app" # 应用名称

BUILD_HOST="build-system.acme.org" # 构建的主机地址
BUILD_USER="build" # 构建主机的登录用户名

BUILD_AT="/tmp/erlang/my-app/builds" # 构建主机上的构建文件夹

STAGING_HOSTS="test1.acme.org test2.acme.org" # 测试主机地址
STAGING_USER="test" # 测试主机的登录用户名
TEST_AT="/test/my-erlang-app" # 测试的构建文件夹

PRODUCTION_HOSTS="deploy1.acme.org deploy2.acme.org" # 部署主机地址
PRODUCTION_USER="production" # 部署主机的登录用户名
DELIVER_TO="/opt/my-erlang-app" # 部署的文件夹

# config/prod.secret.exs 文件保存了很多的敏感信息，这个文件不能放在项目里。
# 我们把它放在服务器上，部署的时候自动连接过去。

pre_erlang_get_and_update_deps() {
  local _prod_secret_path="/home/builder/prod.secret.exs"
  if [ "$TARGET_MIX_ENV" = "prod" ]; then
    __sync_remote "
      ln -sfn '$_prod_secret_path' '$BUILD_AT/config/prod.secret.exs'
    "
  fi
}
```

举个例子 🌰 我某次的配置文件

```bash
#!/usr/bin/env bash

APP="short_url"

# 自动以 git revision 作为发布名称
AUTO_VERSION="revision"

BUILD_HOST="url"
BUILD_USER="web"
BUILD_AT="/tmp/edeliver/short_url/builds"

# 我只有正式环境，所以没有配置 STAGING 环境
PRODUCTION_HOSTS="url"
PRODUCTION_USER="web"

DELIVER_TO="/home/web/"

# 换用了国内的源，加快依赖安装速度
HEX_MIRROR_URL="https://hexpm.upyun.com" 

pre_erlang_get_and_update_deps() {
  local _prod_secret_path="/home/builder/short_url.prod.secret.exs"
  if [ "$TARGET_MIX_ENV" = "prod" ]; then
    __sync_remote "
      ln -sfn '$_prod_secret_path' '$BUILD_AT/config/prod.secret.exs'
    "
  fi
}


```
配置好后，执行以下命令。每次构建的压缩包，不记录到 `git` 记录里

```ruby
echo ".deliver/releases/" >> .gitignore
```

`config/prod.exs` 部署配置默认有这样一句话，从系统里加载环境变量。如果你没有在部署的主机上添加变量，这句话就删除掉。别问我怎么知道的。😭

```yaml
﻿load_from_system_env: true,
```

提交刚才配置文件的修改，并且下载依赖编译

```cs
git add -A && git commit -m "Setting up edeliver"
mix do deps.get, compile
```

其他的配置可以参考 [项目文档](https://github.com/edeliver/edeliver)

我们的配置文件里配置的线上环境的隐私信息从 `/home/builder/short_url.prod.secret.exs` 目录获取，所以运行下面的命令。上传我们的线上配置文件。该文件是不会记录到 `git` 版本里的。

```
scp ~/你的项目/config/prod.secret.exs 主机名:/home/builder/short_url.prod.secret.exs
```

## 数据库设置配置

`phoenix` 默认使用的 `postgreSQL` 数据库

切换到默认用户 `postgres`

```ebnf
sudo su - postgres 
```

进入数据库

```ebnf
psql
```
创建用户并赋予权限

```sql
CREATE USER www WITH PASSWORD 'u867#eDgg6#2@elo098OIUh';

CREATE DATABASE short_url_prod OWNER www;

alter role www login createdb;
```

## 创建数据库

现在使用以下命令创建线上数据库的数据表

```glsl
mix edeliver migrate production
```
## edeliver 命令

### 基本命令

```glsl
mix edeliver update production --start-deploy # 发布应用并启动

--branch=dev 指定使用 dev 分支 默认使用的 master

mix edeliver ping production # 查看应用是否正在运行
mix edeliver upgrade  # 升级应用

mix edeliver version production # 查看应用的版本
mix edeliver migrate production # 运行数据库构建 执行该命令前要先部署应用
mix edeliver restart production # 或者 start 或者 stop
```
### migrate 数据库迁移命令

🔔 **注意**  执行以下的命令之前，要先部署应用。

```glsl
mix edeliver migrate production  # 运行数据库构建
mix edeliver migrate production up # 同上面的命令
mix edeliver migrate production down # 逆向执行数据库构建 会删除所有的数据表和数据
mix edeliver show migrations production # 执行上面的 down 命令后会显示状态
```

## 日志

如果不幸，发布出现问题。可以在一下目录查看日志

配置文件里的 `DELIVER_TO="/home/web/"` 就是我们项目的部署目录，对应的日志文件也在这里。比如我的：`/home/web/short_url/log`

```
tail -f erlang.log.1
```

## 查看端口使用

```
netstat -tlunp
```


