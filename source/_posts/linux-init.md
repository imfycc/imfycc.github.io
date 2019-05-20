---
title: linux 服务器初始化配置流程
date: 2017-12-9 00:00:00
updated: 2017-12-9 00:00:00
tags:
categories: 编程
---

![819542712-5a291b0bb9615_articlex](/media/819542712-5a291b0bb9615_articlex.jpeg)

> 开发 `web` 应用的时候，经常需要配置服务器。我在阮一峰老师的 [Linux服务器的初步配置流程](http://www.ruanyifeng.com/blog/2014/03/server_setup.html) 的基础上，整理了这篇笔记。节约以后配置服务器的时间。 

## 修改 root 密码

`root` 账户默认没有密码 安全起见 先初始化一个

```
passwd
```

## 创建 Linux 管理员账户

> 🐧 使用 `Linux` 服务器的时候，尽量不要使用 `root` 账号，处理日常操作，我们新建一个管理员账号。

首先，添加一个用户组（这里我自定义的 admin）。

```
addgroup admin
```

然后，添加一个新用户（假定为 www）。

```
useradd -d /home/www -s /bin/bash -m www

```

上面命令中，参数 `d` 指定用户的主目录，参数 `s` 指定用户的 `shell`，参数 `m` 表示如果该目录不存在，则创建该目录。

接着，设置新用户的密码。

```
passwd www
```

将新用户（www）添加到用户组（admin）。

```
usermod -a -G admin www 
```
接着，为新用户设定sudo权限。

```
sudo vi /etc/sudoers
```

找到下面这一行。

```
root    ALL=(ALL:ALL) ALL
```

在这一行的下面，再添加一行。

```
root    ALL=(ALL:ALL) ALL
www    ALL=(ALL) NOPASSWD: ALL
```

上面的 `NOPASSWD` 表示，切换 sudo 的时候，不需要输入密码。如果出于安全考虑，也可以强制要求输入密码。

```
root    ALL=(ALL:ALL) ALL
www    ALL=(ALL:ALL) ALL
```

最后，先退出 `root` 用户登录，再用新用户的身份登录。

## 配置 SSH 服务

把自己电脑的 `ssh` 公钥，保存到服务器的 `~/.ssh/authorized_keys` 文件中

直接使用下面的命令

```
ssh-copy-id -i ~/.ssh/id_rsa.pub root@123.456.78
```

然后，进入服务器，编辑SSH配置文件/etc/ssh/sshd_config。

```
sudo cp /etc/ssh/sshd_config ~     (备份，复原时使用)
sudo vi /etc/ssh/sshd_config
```

在配置文件中，将 SSH 的默认端口 22 改掉。假设使用 25000

```
Port 25000
```

然后，检查几个设置是否设成下面这样，确保去除前面的#号。

选项|含义
---|---
Protocol 2  | ssh 协议使用新版的
PermitRootLogin no |不允许 root 登录
PermitEmptyPasswords no |  不允许空密码登录
PasswordAuthentication no |  使用密码授权登录
RSAAuthentication yes | 使用RSA算法进行安全验证
PubkeyAuthentication yes | 允许公钥认证
UseDNS no | 禁用DNS反向解析 会加快速度
SyslogFacility AUTHPRIV | 记录用户登录信息

上面主要是禁止 `root` 用户登录，以及禁止用密码方式登录。

保存后，退出文件编辑。

接着，改变authorized_keys文件的权限。

```
sudo chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh/
```

重启 SSHD

```
sudo service ssh restart
```

或者

```
sudo /etc/init.d/ssh restart
```

## 运行环境配置

检查服务器的区域设置。

```
locale
```

如果结果不是 `en_US.UTF-8`，建议都设成它。

```
sudo locale-gen en_US en_US.UTF-8 en_CA.UTF-8
sudo dpkg-reconfigure locales
```

然后，更新软件

```
sudo apt-get update
sudo apt-get upgrade
```

最后，再根据需要，做一些安全设置，比如搭建防火墙，关闭 `HTTP`、`HTTPs`、`SSH` 以外的端口，详细可参考这篇 [《Securing a Linux Server》](http://spenserj.com/blog/2013/07/15/securing-a-linux-server/)。

## 设置时区

使用 tzselect 命令选择需要的时区。

```shell
tzselect
```

设置完后，命令行会提示我们将时区的配置文件添加到 `.profile`

```shell
TZ='Asia/Hong_Kong'; export TZ
```

执行完后，重新登录系统或者刷新 `~/.bashrc` 文件使其生效

```shell
source ~/.bashrc
```

更改 Linux 整个系统范围的时区可以使用如下命令：

```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

现在使用 `date` 命令查看一下时间。

## 特别番

### 阿里云服务器

阿里云服务器可以在控制台设置安全组规则。

#### 什么是安全组

简单点，给大家举个栗子🌰，我部署了一个 `MongoDB` 的数据库，我怕别人黑我数据库，我就可以在安全组的规则里设置 `公网入方向` 拒绝访问 `MongoDB` 使用的端口 `27017`。只允许本地 `locahost` 访问，禁止公网访问。

下面是教科书版具体解释

阿里云产品介绍 请看这里 [安全组](https://www.alibabacloud.com/help/zh/doc-detail/25387.htm)

> 安全组是一种虚拟防火墙，具备状态检测包过滤功能。安全组用于设置单台或多台云服务器的网络访问控制，它是重要的网络安全隔离手段，用于在云端划分安全域。

>安全组是一个逻辑上的分组，这个分组是由同一个地域（Region）内具有相同安全保护需求并相互信任的实例组成。每个实例至少属于一个安全组，在创建的时候就需要指定。同一安全组内的实例之间网络互通，不同安全组的实例之间默认内网不通。可以授权两个安全组之间互访。

## 参考
[Linux服务器的初步配置流程](http://www.ruanyifeng.com/blog/2014/03/server_setup.html)


