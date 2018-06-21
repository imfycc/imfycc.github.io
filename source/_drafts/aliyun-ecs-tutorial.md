---
title: 阿里云ECS自动化部署 Node.js 应用
date: 2017-06-04 07:46:49
updated: 2017-06-04 07:46:49
tags:
categories: 编程
---

记录一下，从买服务器，到使用 Docker + jenkins 自动部署项目的整个阶段。

## 目录
第一次使用ssh登录的时候，出现了下面的提示
理论上第一次登录应该出现这样的提示
```
The authenticity of host '115.28.67.46 (115.28.67.46)' can't be established.
ECDSA key fingerprint is SHA256:dET5iw6V4a8YcZOPM1MNs945v1VjF41zwugrFoKIgwA.
Are you sure you want to continue connecting (yes/no)? yes
```
删除 ~/.ssh/known_hosts 里面对应的域名的ssh 秘钥即可


登录到服务器之后，先新建一个用户

adduser king
passwd 设置密码
给予root 权限  https://ninghao.net/video/3553

http://www.aboutyun.com/blog-61-121.html

配置SSH服务安全 https://help.aliyun.com/knowledge_detail/41212.html


重启 sshd https://www.cyberciti.biz/faq/howto-start-stop-ssh-server/

其他端口登录  http://lynnteng0.blog.51cto.com/2145094/1066795

安装docker https://help.aliyun.com/knowledge_detail/42851.html

docker 加速 https://yq.aliyun.com/articles/29941

https://cr.console.aliyun.com/?spm=5176.100239.blogcont29941.12.z9HHmE#/accelerator


https://hub.docker.com/_/jenkins/
https://github.com/jenkinsci/docker/issues/177
http://snoopyxdy.blog.163.com/blog/static/601174402014102695720645/
http://www.jianshu.com/p/052a2401595a


sudo docker exec -it iYearn-jenkins /bin/bash

sudo docker stop iYearn-jenkins

sudo docker rm iYearn-jenkins

sudo docker ps

sudo docker ps -a


sudo chown -R 1000:1000 jenkins_node


sudo docker run --name iYearn -p 49002:8080 -p 50000:50000 -v /home/jenkins_node:/var/jenkins_home jenkins
touch: cannot touch ‘/var/jenkins_home/copy_reference_file.log’: Permission denied
Can not write to /var/jenkins_home/copy_reference_file.log. Wrong volume permissions?


sudo docker run --name iYearn -p 49002:8080 -p 50000:50000 -v /home/jenkins_node:/var/jenkins_home -d jenkins:latest



sudo: no tty present and no askpass program specified
sudo: no tty present and no askpass program specified
sudo: no tty present and no askpass program specified
SSH: EXEC: completed after 201 ms
SSH: Disconnecting configuration [115.28.67.46] ...
ERROR: Exception when publishing, exception message [Exec exit status not zero. Status [1]]
Finished: UNSTABLE


https://stackoverflow.com/questions/21659637/how-to-fix-sudo-no-tty-present-and-no-askpass-program-specified-error/24648413#24648413




sudo docker run --name nodeiYearn -d \
  -v /home/jenkins_node/workspace/iYearn:/home/jenkins_node/workspace/iYearn \
  -w /home/jenkins_node/workspace/iYearn \
  -p 3000:3000 \
  node \
  npm start


  docker + jenkins

  https://blog.wangjunfeng.com/archives/684

  http://www.jianshu.com/p/47ef444c74da

  https://juejin.im/entry/57eb8cf8a0bb9f0058633439

  http://blog.csdn.net/houyefeng/article/details/51027885

  http://blog.shiqichan.com/Dockerizing-a-Node-js-Web-Application/

  http://www.jianshu.com/p/052a2401595a

  http://git.oschina.net/ryzecode/HelloWorld_Node/blob/master/package.json

  https://letong.gitbooks.io/docker/content/container/run.html

  http://wiki.jikexueyuan.com/project/docker/examples/nodejs_web_app.html

  https://stackoverflow.com/questions/35774714/how-to-cache-the-run-npm-install-instruction-when-docker-build-a-dockerfile

  https://icewing.cc/post/firekylin-in-docker.html



  docker run -d -P --name nodeiYearn --link db:db  mongo /bin/bash

  $ sudo docker run -d -P --name web --link db:db training/webapp python app.py


  sudo docker run --name nodeiYearn -d  -v /home/jenkins_node/workspace/iYearn:/home/jenkins_node/workspace/iYearn -w /home/jenkins_node/workspace/iYearn -p 3000:3000 --link mongo:db node npm start


  docker run -v /data/mongodb_data:/data/db -p 27017:20017 -p 28017:28017 --name mongo -d mongo mongod --smallfiles --auth



  sudo docker run -it --name nginx -d -p 80:80 --link nodeiYearn:nodeiYearn -v $pwd/www:/www -v $pwd/config:/etc/nginx/sites-enabled  -v $pwd/logs:/var/log/nginx nginx

  sudo docker run -it -p 80:80 --link ProtoWebApp:localhost -v `pwd`/config:/etc/nginx/sites-enabled  -v `pwd`/logs:/var/log/nginx dockerfile/nginx



  使用docker分离服务与数据库 https://segmentfault.com/a/1190000005113222


连接容器
http://www.widuu.com/docker/userguide/dockerlinks.html

  连接容器 http://wiki.jikexueyuan.com/project/docker/userguide/dockerlinks.html

Docker 中如何连接多个 Container 协同工作
https://www.oschina.net/translate/dockerlinks

 docker 中配置mongodb并对外暴露链接端口设置账户认证，防止脱裤
http://blog.csdn.net/u012416928/article/details/51247790

运行容器
https://letong.gitbooks.io/docker/content/container/run.html

db.changeUserPassword('supper','KIng_2017@iYearn');

db.createUser(
   {
     user: "supper",
     pwd: "KIng_2017@iYearn",
     roles: [ { role: "root"} ]
   }
)

db.createUser(
  {
     user: "king",
     pwd: "IYearn_2017@Hufy",
     roles: [ { role: "readWrite", db: "iYearn" } ]
  }
)

db.createUser(
...    {
...      user: "king",
...      pwd: "IYearn_2017@Hufy",
...      roles: [ { role: "readWrite", db: "iYearn" } ]
...    }
... )


https://cnodejs.org/topic/53e0a75abd3cc3e50b8179b3

然后禁止外网访问


部署测试服务器

http://www.jianshu.com/p/79caa1cc49a5


db.createUser(
  {
    user: "supper",
    pwd: "KIng_2017@iYearn",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)


http://bubkoo.com/2014/02/07/mongodb-authentication/



https://blog.igevin.info/posts/docker-mongo-auth/


sudo docker logs -f nodeiYearn



(jenkins_url)/safeRestart


更具体的文章

[持续集成（Continuous integration）](http://www.cnblogs.com/99fu/p/6042744.html)




<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>Error 403 No valid crumb was included in the request</title>
</head>
<body><h2>HTTP ERROR 403</h2>
<p>Problem accessing /job/iYearn/build. Reason:
<pre>    No valid crumb was included in the request</pre></p><hr><i><small>Powered by Jetty://</small></i><hr/>

</body>
</html>
![](https://ws1.sinaimg.cn/large/006tNc79ly1fi6mq470scj30ml0hrq5l.jpg)

![](https://ws1.sinaimg.cn/large/006tNc79ly1fi6mqjcubkj30l904faal.jpg)



## MongoDB 基本操作命令

删除用户

db.system.users.remove({user:"king"});

查看用户

show users

use admin


mongodb 服务器启用本地授权


use admin

db.createUser(
   {
     user: "supper",
     pwd: "KIng_2017@iYearn",
     roles: [ { role: "root"} ]
   }
)

show users

mongod --smallfiles --auth

use admin

db.auth('supper','KIng_2017@iYearn')

db.createUser( { user: "king", pwd: "IYearn_2017@Hufy", roles: [ { role: "readWrite", db: "iYearn" } ] } )



