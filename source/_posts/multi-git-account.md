---
title: 如何管理多个 git 账号
date: 2019-10-02 15:35:16
updated: 2024-10-30 22:50:00
tags:
categories: 编程
---

> 如果你有多个 git 账户，有没有遇到过提交代码的用户信息混乱的情况？ 如果一劳永逸的解决这个问题那？

## 分目录配置 git 用户信息

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


## 如何在一台电脑上配置多个 ssh 密钥
上面解决的问题是只有一个 ssh 密钥，但是对应公司和个人不同的 git 账号信息。

还有一种情况是，一台电脑上有多个人的 ssh 密钥，比如我和小秋都是程序员，有时候一台电脑会同时配置我们俩的 ssh 密钥，分别对应不同的 git 账号。

除了上面要分目录，还需要设置不同的 ssh 密钥和 git 账号的关系。

可以在 ~/.ssh 目录再新建一套密钥或者也可以复制已有的到该目录，起不同的名字，比如下面这样是两套 ssh

```
id_rsa
id_rsa.pub

id_rsa_other
id_rsa_other.pub
```

然后在 ~/.ssh/config 配置文件分别指定不同的账号使用不同的 ssh 密钥：

```
# 默认账户
Host github.com
   HostName github.com
   User defaultUser // 这里改成自己的用户名
   IdentityFile ~/.ssh/id_rsa
   
# 另一个账户
Host github.com-user1    
   HostName github.com
   User otherUser // 这里改成自己的用户名
   IdentityFile ~/.ssh/id_rsa_other
```

克隆仓库的时候可以改成这种格式：

```bash
git clone git@github.com-user1:otherUser/repo_name.git
```

## 参考

[Set git config values for all child folders](https://stackoverflow.com/questions/21307793/set-git-config-values-for-all-child-folders)
