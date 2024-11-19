---
title: 记录一次服务器重启应用恢复过程
date: 2021-05-13
updated: 2021-05-14 08:27
tags: 技术成长
categories: 编程
---

副标题：**哎呀，服务器登录不进去了瞎折腾** 

> 梳理服务器错误操作的整个过程，算是自己的一次复盘 ✍️

本文可以了解到：

1、ssh 免密登录服务器简单配置

2、sshd 端口查看和修改

3、Elixir + Phoenix 服务线上操作

4、如何查看 Linux 的开机启动项（服务器重启后，哪些服务会自动重启）

5、`systemctl` 简介

## 背景 🚦
本来自己云服务器上的应用一直跑的很稳定，也好长时间没打理了。最近收到腾讯云的安全提示，说服务器有高危漏洞 🕷，需要处理一下。

## 经过 🚜
因为应用太过稳定（访问量很小 🤷🏻‍♀️）好久没登录服务器了，先本地终端 ssh 连接服务器，发现被拒绝了。然后我又尝试从腾讯云的网页使用 ssh 标准方式登录也被拒绝了 🐣。

我以为密码不对，就在腾讯云服务器实例上选择了重启服务器修改密码。（错误操作的开始 😿）

重启还挺快，也就七八秒，但是我发现我还是登录不进去，就开始脑补，不会被黑了吧 🤖？

{% qnimg server-restart.jpg extend:?imageView2/2/w/500 %}

然后就选择了腾讯云提供的第二种登录方式，翻了一下文档发现默认用户名不是 root， 是 ubuntu

进入到服务器之后，先确定 ssh 的 sshd 服务有没有启动

#### 查看 sshd 状态

```shell
service sshd status
```

发现 sshd 服务是正常运行的，但是为什么登录不进去 ❓

突然想到可能是本地 ssh 配置有问题

查看 `~/.ssh/config` 文件发现之前的配置没有了，偶对了，最近换电脑了。这个配置没处理... 😭

### 配置 ssh
#### 重新配置 `~/.ssh/config`

添加类似的内容
```ssh
Host 这里自定义个字符串
    HostName IP地址
    User 用户名
    Port 端口号
```

IP地址 可以从云服务的控制台找到。

突然想起来，默认的 ubuntu 这个账户的权限挺大的，我好像搞了一个权限更小的账户管理应用，但是记不清用户名了，再确认一下 🙈。

#### 查看服务器上有哪些用户

```shell
cat /etc/passwd
```

从里面找到之前创建的用户。

欧，我又想起来了。我好像把 ssh 的默认端口也给改了，默认端口不安全，我换成其他的了 🐶。

这也是为什么网页版的登录不了，网页版默认端口是 22 🙈

#### 查看 ssh 端口配置

```bash
vi /etc/ssh/sshd_config
```

或者

#### 直接查看 ssh 服务端口

```bash
netstat -tnlp | grep sshd
```

好了，上面 `~/.ssh/config` 内需要的内容我们都找好了，配置上。

还有一步，把自己本地 ssh 的公钥加入到服务器的授权名单里，以后就可以免密登录了。

```sh
vi ~/.ssh/authorized_keys
```

服务器可以正常登录了。但是访问了一下，发现应用还挂着 🐤。

### 恢复应用

我这个小应用是使用 Elixir + Phoenix 开发的后端，数据库用的 `PostgreSQL`

#### 查看 nginx 的状态

```sh
service nginx status
```

#### 查看 PostgreSQL 的状态

```sh
service postgresql status
```

发现数据库服务是正常运行的。

#### 重启 elixir + Phoenix 应用

应用放在该用户的 home 文件夹的 www 内，找到应用 onePiece（这个小服务是和海贼王相关的 🏴‍☠️），进入 bin 文件夹，里面有个可执行文件 onePiece

```sh
# 查看帮助
./onePiece help

# ping 应用 
./onePiece ping

# 启动应用
./onePiece start
```

然后应用正常启动了 ☠️ ⛵️ ⚓️ 🏝


### 漏洞修补 

这才是一开始登录服务器的目的呀... 😹

腾讯云这边做的还挺好，漏洞详情里会给出需要升级的软件的命令。根据命令执行即可。

### systemctl 🎈

这个过程中，我产生了一个疑问 🤔，`nginx`、`sshd`、`postgresql` 这些服务重启服务器的时候，会自动重启吗？如何查看服务器的开机启动项？

查找资料的时候发现了 `systemctl` 

#### 查看可以使用 systemctl 管理的服务

```sh
systemctl list-unit-files
```

#### 查看开机启动项

```sh
ls /etc/systemd/system/multi-user.target.wants/
```

从这个命令的结果可以看到，我之前有疑问的 `nginx`、`sshd`、`postgresql` 服务器重启的时候都会默认启动。

#### 把一个服务添加到开机启动

```sh
systemctl enable httpd
```

#### systemctl 和 service 命令的区别

我前面重启服务和查看服务状态都用的 `service` 命令，其实也可以用 `systemctl` 命令去管理。

二者有什么区别哪？简单来说：
* `systemctl` 相比 `service` 是新一代的 Linux 系统的启动和管理命令
* `systemctl` 命令兼容 `service`
* 命令格式不太一样 systemctl 是服务名放在最后 `systemctl status httpd`

`systemctl` 仅仅是 `Systemd` 其中一个命令，其实还有更多，包括查看服务器时间、登录用户、启动耗时等等，具体可以参考阮一峰的博文：

[Systemd 入门教程：命令篇](https://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)

[Systemd 入门教程：实战篇](https://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html)


## 小结 👉
本来的目的是，去服务器补漏洞的，结果由于长时间不登录服务器，加上不熟悉，瞎折腾了一番，但是整个过程，经历一次也学习到一些新知识。

我在运维上还有很多不了解的，之后加强学习。

记录本文也是害怕，万一下一次又双叒叕忘了呐 ☠️ 🙈 🐣 🧶 🤪。



















