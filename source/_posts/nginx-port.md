---
title: nginx 端口转发 使用域名访问不显示端口
date: 2017-07-09 21:42:15
updated: 2017-07-15 21:42:15
tags:
categories: 编程
---

开发的项目使用的 3000 端口，现在部署到服务器上，想使用主域名直接访问。我们就需要做一个转发，当用户访问域名（默认 80端口）的时候，转发到3000端口,就可以直接访问我们的项目了。

端口转发的方式有很多种，我这里选择使用的 `nginx`

服务器使用的 `ubuntu 16.04` 首先安装 `nginx`

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
