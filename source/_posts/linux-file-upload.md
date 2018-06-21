---
title: 本地 <--> 服务器间文件传输
date: 2015-05-03 10:21:06
updated: 2018-02-12 09:21:06
tags:
categories: 编程
---

### Linux 服务器之间文件传输

要把当前一个文件上传到远程另外一台主机上，可以如下命令
```
scp -P 端口 文件 用户名@IP:远程主机目录  (注意主机号后的冒号于文件路径间没有空格！)

scp -P 21345 /home/daisy/full.tar.gz root@172.19.2.75:/home/root
```

把文件从远程主机下载当前目录
```
scp 用户名@IP:要存放的目录 远程主机文件

scp -P 21345 root@172.19.2.75:/home/root/full.tar.gz ./
```

### Windows 与 Linux 之间传送文件

Windows 下可以使用 `putty` 软件里的 `pscp.exe`

先在WIN的DOS下，PUTTY目录下及PSCP文件所在目录。

上传文件到服务器
```
pscp file username@hostIP:文件地址

例:pscp d:abc.txt vic@IP:/home/endall/abc.txt

```
从服务器下载文件
```
pscp vic@IP:/home/endall/abc.txt d:abc
```

具体操作

1、把服务器上的 `/root/dir` 目录取回本地 `C:\My Documents\data\` 目录

```
C:\>pscp.exe -r root@192.168.32.50:/root/dir “C:\My Documents\data\”
```

2、把服务器上的 `/root/file` 文件取回来本地当前目录

```
C:\>pscp.exe root@192.168.32.50:/root/file .
```

3、把本地目录 dir、文件 file 传输到 Linux 服务器的 `/root/`，并指定服务器端口2009

```
C:\>pscp.exe -P 2009 -r dir file root@192.168.32.50:/root/
```

4、把本地文件 file 传输到 Linux 服务器的 `/root/`

```
C:\>pscp.exe file 192.168.32.50:/root/
```

它会提示你输入密码，就像 Linux 下使用 scp 那样。


### 总结

如果上传的路径需要权限，可以先`scp` 上传到不需要 `sudo` 权限的目录下，再在服务器上使用 `sudo` mv 过去。


