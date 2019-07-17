---
title: git 常用命令清单
date: 2017-02-22 14:46:53
updated: 2018-11-05 18:43
tags: git
categories: 最热
description:
---

{% qnimg git.jpg extend:?imageView2/2/w/750 %}

## 背景

[Git](https://git-scm.com) 是 [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) 于 2005 年创建的一个免费的开源分布式版本控制系统, 旨在以快速、高效的方式处理从小型到非常大的项目的所有内容。

[官网](https://git-scm.com) 提供了免费权威书籍 《Pro Git》 介绍 git 系统。

### 基本概念

{% qnimg git-order.png 'alt:图片来自阮一峰的网络日志' extend:?imageView2/2/w/750 %}

- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（或本地仓库）
- Remote：远程仓库


⚠️ 注：简写指的是 `zsh` 自带的 `git` 扩展。

### 新建代码仓库

```bash

# 初始化代码仓库
git init

# 新建一个目录，将其初始化为 git 代码仓库
git init [项目名]

# 克隆代码仓库
git clone [url]

简写 gcl
```

### 配置


Git 的全局配置文件为 `~/.gitconfig`，项目内的配置文件保存在项目目录下的`.git/config` 内。

```bash
# 显示当前的 Git 配置
git config --list

简写 gcf

# 编辑 Git 配置文件
git config -e [--global]

# 设置提交代码时的用户信息
git config [--global] user.name "[name]"
git config [--global] user.email "[email address]"
```

如果你有两个 git 账号，可以分目录设置 git 配置，详情请看[这里](https://hufangyun.com/2018/git-change-user-info/#如果避免上面的问题？)

### 添加/删除

```bash
# 添加指定文件到暂存区
git add [file1] [file2] ...

简写 ga

# 添加所有修改
git add --all

简写 gaa

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
# 指定某个文件的修改添加到下次提交
git add -p

简写 gapa

# 删除工作区文件，并且将这次删除放入暂存区
git rm [file1] [file2] ...

简写 grm

# 停止追踪指定文件，但该文件会保留在工作区
git rm --cached [file]

简写 grmc

# 改名文件，并且将这个改名放入暂存区
git mv [file-original] [file-renamed]
```

### 代码提交

```bash
# 提交暂存区的指定文件到仓库区
git commit [file1] [file2] ... -m [message]

简写 gcmsg

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
git commit --amend -m [message]

简写 gc!

# 重做上一次commit，并包括指定文件的新变化
git commit --amend [file1] [file2] ...
```

### 分支

```bash
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 新建一个分支，指向指定commit
$ git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```

### 标签

```bash

# 列出所有tag
$ git tag

# 新建一个tag在当前commit
$ git tag [tag]

# 新建一个tag在指定commit
$ git tag [tag] [commit]

# 删除本地tag
$ git tag -d [tag]

# 删除远程tag
$ git push origin :refs/tags/[tagName]

# 查看tag信息
$ git show [tag]

# 提交指定tag
$ git push [remote] [tag]

# 提交所有tag
$ git push [remote] --tags

# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]
```

### 查看信息

```bash

# 显示有变更的文件
$ git status

git log --reverse

倒序展示

# 显示当前分支的版本历史
$ git log

# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

git log --grep word

git log --author dusong

# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示暂存区和工作区的差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 显示某次提交的元数据和内容变化
$ git show [commit]

# 显示某次提交发生变化的文件
$ git show --name-only [commit]

# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]

# 显示当前分支的最近几次提交
$ git reflog
```

### 远程同步

```bash

# 下载远程仓库的所有变动
$ git fetch [remote]

# 显示所有远程仓库
$ git remote -v

# 显示某个远程仓库的信息
$ git remote show [remote]

# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

# 上传本地指定分支到远程仓库
$ git push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force

# 推送所有分支到远程仓库
$ git push [remote] --all
```

### 撤销

```bash
# 恢复暂存区的指定文件到工作区
$ git checkout [file]

# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]

# 恢复暂存区的所有文件到工作区
$ git checkout .

# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]

# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]

# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop
```

### 其他命令

```bash
```

### 教程

### 工具


代码推到远程仓库

```bash
git push origin 当前分支

简写 ggpush
```

查看已经commit的具体细节、文件更改

```bash
git log -p
```

搜索提交历史，根据关键词

```shell
git log -S [keyword]
```

# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示某次提交发生变化的文件
$ git show --name-only [commit]


# 显示所有远程仓库
$ git remote -v


# 恢复暂存区的指定文件到工作区
$ git checkout [file]

# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]

# 恢复暂存区的所有文件到工作区
$ git checkout .

# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]

# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

# 生成一个可供发布的压缩包
$ git archive

暂存代码

```bash
git stash save

简写 gsta

git stash save some_msg   这样就好区分了
```

查看之前暂存的代码号

```bash
git stash list

简写 gstl
```

查看之前暂存的代码内容

```bash
git stash show --text

简写 gsts
```

恢复暂存的代码

```bash
git stash apply stash@{1}   1 是恢复第一个

简写 gstaa
```

清除所有暂存的代码

```bash
git stash clear

简写 gstc
```

删除某一条暂存代码

```bash
git stash drop stash@{0}

```

恢复第一条缓存代码并删除记录

```shell
git stash pop
```


停止追踪指定文件，但该文件会保留在工作区

```shell
git rm --cached [file]
```

### 代码回滚

放弃工作目录下的所有更改

```bash
git reset --hard HEAD
```

只取消提交

```bash
git reset --soft
```

想直接丢弃工作区的修改

```bash
git checkout -- file
```

用一个新提交来消除一个历史提交所做的任何修改

```bash
git revert c011eb3

# 这个命令只回滚某一次，不是某一次到现在的代码。
```

回滚到之前某一次提交

比如我们有 1、2、3、4、5、6、7、8 次提交，现在因为某些不可描述的原因，我们想把代码恢复到 4 这次提交。

```bash
git reset --hard 4这次提交的 hash 串
git reset --soft 8这次提交的 hash 串
git commit -m 'Reverted 5 6 7 8' 
```

放弃本地修改同远程同步

```bash
git reset --hard origin/master
```

回退到某个版本

```bash
git reset --hard c011eb3

简写 grhh
```

已经 add 了怎么取消

```bash
git reset HEAD 文件
```

已经commit了怎么取消（最近一次）

```bash
git commit --amend
```

修改上次的提交者信息

```bash
git commit --amend --reset-author
```

### 分支

切换到上一个分支

```bash
gco -
```

新建并切换到分支

```bash
git checkout -b 分支名

简写 gcb 分支名
```


拉取远程所有分支的更改
(同时可以清除本地无效的远程分支)

```bash
git fetch -p
```

下载远程端的所有改动到本地，不会自动合并到当前

```bash
git fetch

简写 gf
```

删除本地分支

```bash
git branch -d  分支名

git branch -D  分支名

简写 gbd
```

切换到上一个分支

```
gco -
```

删除远程分支

```bash
git push origin :分支名
```

重命名本地分支

```bash
git branch -m
```

### 标签

查看标签

```bash
git tag
```
删除本地标签

```bash
git tag -d 标签名
```
删除远程标签

```bash
git push origin :refs/tags/标签名
```

新建一个tag在当前commit

```shell
git tag [tag]
```

新建一个tag在指定commit

```shell
git tag [tag] [commit]
```

查看tag信息

```shell
$ git show [tag]
```

推送标签

```bash
 git push origin 标签名
```

打标签

```bash
git tag -a 标签名 -m "提交信息"
```

### 其他

#### 如果修改 git 已提交的用户邮箱和用户名
[请看这篇文章](https://hufangyun.com/2018/git-change-user-info)
#### 如果分目录配置用户信息
[请看这篇文章](https://hufangyun.com/2018/git-change-user-info)
#### 合并某一次提交的内容

```bash
git cherry-pick commit哈希值
```

#### 查看某个文件的任意一行是谁？在什么时间修改的？

```bash
git blame 文件路径
```

#### merge 的时候如何快速解决大量文件的冲突？

如果合并时有大量文件冲突，可以使用命令

```bash
git checkout --ours( --theirs)  文件
```

冲突文件中 `HEAD` 区块是 `ours` ，汇入的分支区块是 `theirs` 。

举个🌰：一个功能分支是 `A` ，在 `test` 分支去合并分支 `A` 时，发现有大量文件冲突，且冲突的文件大部分都需要采取 `A` 分支的修改，我们可以先手动处理那小部分的需要采取 `test` 分支修改的冲突，再使用命令把 `test` 分支的 `HEAD` 修改 `checkout` 掉，即，使用 `git checkout --ours .` 命令解决冲突。

这里要注意一个点，你现在所在的分支是 `ours` 也就是 冲突里的 `HEAD`

有时间再补充个图。。。。

 🙏：欢迎补充更好的方案。
 
 😂：此方法学自我夫人。。。（让我必须注明）
 
### 同时部署到多个 git 源
比如同时更新到 `Github` 和 `Coding`
- 在已有的本地仓库内找到隐藏的 `.git` 文件夹
- 打开里面的 `config` 文件
- 添加如下设置：两个远端仓库的 `url`，并命名为 `origin`

```bash
[remote "origin"]
    url = git@git.coding.net:user_name/user_name.coding.me.git
    url = git@github.com:user_name/user_name.github.io.git
```

### 其他 git 工具

#### tig
[官方地址](https://github.com/jonas/tig)
> Git repository browser
> 方便的查找每次的更改记录

上张图片感受一下

{% qnimg git-order-tig.jpg 'alt:tig' extend:?imageView2/2/w/500 %}


### 生成 ssh

```
ssh-keygen

cat ~/.ssh/id_rsa.pub
```




https://github.com/Gazler/githug

git rm --cached <file>

git commit --date="Wed Feb 16 14:00 2037 +0100"

git commit -m "future" --date "$(date -v +1d)"

You committed too soon. Now you want to undo the last commit, while keeping the index.

git reset --soft HEAD^

git checkout config.rb

git remote

git remote -v

Your local master branch has diverged from the remote origin/master branch. Rebase your commit onto origin/master and push it to remote.

git rebase origin/master git push origin master

git checkout v1.2

You need to fix a bug in the version 1.2 of your app. Checkout the tag v1.2.

33

34

35

40

41 *

44

42

45

47 squash

48

49 不知道干嘛的

50

51

53

55

答案 https://www.jianshu.com/p/e8e6358e81e0

展示暂存区和最近版本的不同
输出暂存区和本地最近的版本 (commit) 的 different (不同)。

git diff --cached
展示暂存区、工作区和最近版本的不同
输出工作区、暂存区 和本地最近的版本 (commit) 的 different (不同)。

git diff HEAD
快速切换分支上一个分支
git checkout -


## 参考

[阮一峰 常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)



https://git-scm.com/docs/git-bisect


撤销add

git reset --mixed

git reset HEAD .

git reset HEAD -filename

二分法查找 bug

https://juejin.im/post/5a39dbfe6fb9a044fc44e0ea


