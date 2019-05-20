---
title: nginx 端口转发 使用域名访问不显示端口
date: 2017-07-09 21:42:15
updated: 2019-05-20 21:42:15
overdue: true
tags:
categories: 编程
---

开发的项目使用的 3000 端口，现在部署到服务器上，想使用主域名直接访问。我们就需要做一个转发，当用户访问域名（默认 80端口）的时候，转发到3000端口,就可以直接访问我们的项目了。

端口转发的方式有很多种，我这里选择使用的 `nginx`

服务器使用的 `ubuntu` 首先安装 `nginx`

```bash
sudo apt-get install nginx
```

进入 `/etc/nginx` 目录，`conf.d` 文件夹下添加 `server.conf` 文件，内容如下：

```nginx
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        #root /var/www/html;

        #index index.html index.htm index.nginx-debian.html;

        server_name localhost;

        location / {
                proxy_pass http://localhost:3000;
        }

}
```

重启 `nginx` 服务,不加 `sudo` 可能会报莫名的错误

```
sudo service nginx restart
```

如果 `nginx` 启动失败，可以查看错误日志，检查原因

```
/var/log/nginx/error.log
```

或者使用以下命令查看 nginx 状态，会输出报错信息

```shell
sudo systemctl status -l nginx.service
```

## 遇到的问题

按照上面配置完后，`nginx` 启动失败 🙈，报错如下：

重复的定义了 default server 80 端口

```
a duplicate default server for 0.0.0.0:80 in /etc/nginx/sites-enabled/default:22
```

使用以下命令搜索哪些地方用到了 `default_server`

```shell
grep -R default_server /etc/nginx
```

原因是 nginx 的默认配置文件也定义了 80 端口

备份一下 `/etc/nginx/sites-enabled/default`

然后删除该文件。

再次重启 nginx 服务，成功 🦊。
