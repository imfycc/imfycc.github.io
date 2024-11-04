---
title: 如何修改 git 已提交的用户邮箱和用户名
date: 2018-09-19 19:44:04
updated: 2018-10-02 18:29:04
checked: 2024-10-30 22:49:00
tags:
categories: 编程
---

{% qnimg git.jpg extend:?imageView2/2/w/600 %}

### 1、修改上一次提交的邮箱和用户名

```bash
git commit --amend --reset-author
```

### 2、批量修改多次提交的邮箱和用户名

新建一个 `shell` 脚本 `changeGitInfo.sh`

```bash
#!/bin/sh

git filter-branch --env-filter '
an="$GIT_AUTHOR_NAME"
am="$GIT_AUTHOR_EMAIL"
cn="$GIT_COMMITTER_NAME"
cm="$GIT_COMMITTER_EMAIL"
if [ "$GIT_COMMITTER_EMAIL" = "这里写你原来的邮箱" ]
then
	cn="你想替换成的用户名"
	cm="你想替换成的邮箱"
fi
if [ "$GIT_AUTHOR_EMAIL" = "这里写你原来的邮箱" ]
then
	an="你想替换成的用户名"
	am="你想替换成的邮箱"
fi
	export GIT_AUTHOR_NAME="$an"
	export GIT_AUTHOR_EMAIL="$am"
	export GIT_COMMITTER_NAME="$cn"
	export GIT_COMMITTER_EMAIL="$cm"
'
```

在 `git` 仓库(项目)下运行一下，该脚本即可。

## 如果避免上面的问题？

可以看我的这篇博文 [如何管理多个 git 账号](https://hufangyun.com/2019/multi-git-account/)


