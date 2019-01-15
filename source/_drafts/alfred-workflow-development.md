---
title: alfred workflow 插件开发教程
date: 2018-04-09 10:42:59
updated: 2018-04-09 10:42:59
tags:
categories: 编程
---

遇到的一个小坑：
> 我的 python 和 pip 是使用 Homebrew 安装的

Collecting Alfred-Workflow
Installing collected packages: Alfred-Workflow
Exception:
Traceback (most recent call last):
  ...  
  File "/usr/local/lib/python3.6/site-packages/pip/wheel.py", line 247, in move_wheel_files
    prefix=prefix
    "must supply either home or prefix/exec-prefix -- not both")
distutils.errors.DistutilsOptionError: must supply either home or prefix/exec-prefix -- not both

https://stackoverflow.com/questions/24257803/distutilsoptionerror-must-supply-either-home-or-prefix-exec-prefix-not-both


按照 https://stackoverflow.com/questions/24257803/distutilsoptionerror-must-supply-either-home-or-prefix-exec-prefix-not-both 的解决方法会有后遗症，该解决方案将 pip 的路径前缀设置为空， 用 brew 安装的 pip 的默认路径前缀是 /usr/local，正常安装的话会将 module 安装到 /usr/local/lib/xxx 下，如果设置为空，再用 pip 安装全局的 module 的话会安装到 /lib/xxx 下，需要 root 权限


bash, zsh, PHP, Ruby, Python, Perl, Apple Script

http://www.alfredworkflow.com/

插件推荐

gitlab 接口的存放位置
https://gitlab.com/api/v4/projects

https://git.hlj.team/help/api/repositories.md

教程 http://myg0u.com/python/2015/05/23/tutorial-alfred-workflow.html

http://allenwu.itscoder.com/how-to-write-a-workflow-for-mac 

https://github.com/deanishe/alfred-workflow


选择 bash  和 Python 的区别

怎样 debug

