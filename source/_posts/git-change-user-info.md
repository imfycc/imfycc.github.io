---
title: 如果修改 git 已提交的用户邮箱和用户名
date: 2018-09-19 19:44:04
updated: 2018-09-19 19:44:04
tags:
categories: 编程
---

![](https://ws3.sinaimg.cn/large/006tNc79ly1fh37ua0t32j30nc08caav.jpg)

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

### 分目录配置 git 用户信息

`git` 可以设置全局的用户信息，然后可以再单独为每个仓库设置用户信息。如果忘记了给项目重置用户信息，可能就会发生上面的问题 --- 提交时的邮箱和用户名错了。😓


如果你喜欢用不同的目录区分个人和公司的项目，可以使用下面的方法配置自己的 `git` 用户信息。😀
    
比如，你把公司的项目都放在了 `Company` 目录下，个人的项目都放在了 `Personal` 目录下下面。

那你可以这么做：

在 `Company` 下新建一个 `.gitconfig_include` 文件，配置你想在该目录下给所有 `git` 仓库设置的用户信息。

```
[user]
  name = 用户名
  email = 邮箱
```

然后在 `~/.gitconfig` 内添加

```
[includeIf "gitdir:~/Company/"]
  path = ~/Company/.gitconfig_include
```

⚠️ 复制提醒。`Company` 要替换成你自己的目录

这样，之后 `Company` 目录下的 `git` 仓库都会使用对应的 `git` 用户信息。💪

这是 git 的一个用法，感兴趣的同学可以看这里 [conditional includes ](https://git-scm.com/docs/git-config#_conditional_includes) 

## 参考

[Set git config values for all child folders](https://stackoverflow.com/questions/21307793/set-git-config-values-for-all-child-folders)


