---
title: zsh oh-my-zsh 插件推荐
date: 2017-05-04 10:57:31
updated: 2018-05-14 23:31:31
tags:
categories: 最热
---

## oh-my-zsh 插件

### git

默认已开启

**作用**

可以使用各种 `git` 命令缩写。😋

比如

```bash
git add --all ===> gaa

git commit -m ===> gcmsg
```

![](https://ooo.0o0.ooo/2017/05/21/5921b3e1283cf.png)

查看所有 `git` 命令缩写

```bash
cat ~/.oh-my-zsh/plugins/git/git.plugin.zsh
```

或者筛选对应的命令

如和 `config` 有关的命令

```sh
alias | grep config
```

### autojump

[autojump 官网](https://github.com/wting/autojump)

**作用** 目录间快速跳转,不用再一直 `cd` 了 😁

**使用**

使用 `autojump` 的缩写 `j`

`cd` 命令进入 `~/user/github/Youthink` 文件夹，下一次再想进入 `Yourhink` 文件夹的时候,直接 `j youthink` 即可
或者只输入 `youthink` 的一部分 `youth` 都行

删除无效路径

```
j --purge 无效路径
```

需要额外下载 `autojump` 并配置

首先安装 `autojump`，如果你用 `Mac`，可以使用 `brew` 安装：

```
brew install autojump
```
如果是 `Linux`，可以使用 `git` 安装，比如：

```
git clone git://github.com/joelthelion/autojump.git
```

进入目录，执行

```
./install.py
```
最后把以下代码加入 `.zshrc`：

```
[[ -s ~/.autojump/etc/profile.d/autojump.sh ]] && . ~/.autojump/etc/profile.d/autojump.sh
```
### Z
如果你不想额外安装 `autojump`

可以使用 `oh-my-zsh` 内置的类似组件 [Z](https://github.com/rupa/z) 

和 `autojump` 除了名字不一样，基本雷同。但是我选了 `Z` ，因为删除无效路径它的命令更短 😏

```
z -x 无效路径
```

效果图

![](https://ww2.sinaimg.cn/large/006tNc79ly1ffqsum0zibj30ey01hjsg.jpg)

### zsh-syntax-highlighting

[官网](https://github.com/zsh-users/zsh-syntax-highlighting)


**作用** 平常用的`ls`、`cd` 等命令输入正确会绿色高亮显示，输入错误会显示其他的颜色。

![](https://ooo.0o0.ooo/2017/05/21/5921b54d899d9.png)

 **安装**

克隆项目

```sh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

在 `~/.zshrc` 中配置

```sh

plugins=(其他的插件 zsh-syntax-highlighting)
```

使配置生效

```sh
source ~/.zshrc
```

### zsh-autosuggestions

[官网](https://github.com/zsh-users/zsh-autosuggestions)

**作用**

效率神器 👍

如图输入命令时，会给出建议的命令（灰色部分）按键盘 &#8594; 补全

![](https://ww1.sinaimg.cn/large/006tNbRwly1ffanc9rb8pj30ay016q39.jpg)

如果感觉 &#8594; 补全不方便，还可以自定义补全的快捷键，比如我设置的逗号补全

```
bindkey ',' autosuggest-accept
```

在 `.zshrc` 文件添加这句话即可。

**安装**

克隆项目

```sh
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

在 `~/.zshrc` 中配置

```sh
plugins=(其他的插件 zsh-autosuggestions)
```

使配置生效

```sh
source ~/.zshrc
```

### sublime

[官网](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/sublime)

已经内置直接启用即可

**作用**

在命令行使用 `Sublime Text` 打开文件、项目

命令| 作用
---|----
st | 打开 sublime
st + 文件夹| 打开该文件夹
st + 文件 | 打开该文件
stt | 打开当前的文件夹，相当于 st .
sst | 管理员权限 相当于 sudo st

### git-open

[官网](https://github.com/paulirish/git-open)

在终端里打开当前项目的远程仓库地址

不要小看这个插件欧，每次改完本地代码，当你想用浏览器访问远程仓库的时候，就知道这个插件多方便了 😘

支持打开的远程仓库

- github.com
- gist.github.com
- gitlab.com
- 自定义域名的 GitLab
- bitbucket.org
- Atlassian Bitbucket Server (formerly Atlassian Stash)
- Visual Studio Team Services
- Team Foundation Server (on-premises)

**安装**

克隆项目

```sh
git clone https://github.com/paulirish/git-open.git $ZSH_CUSTOM/plugins/git-open
```

在 `~/.zshrc` 中配置

```sh
plugins=(其他的插件 git-open)
```

使配置生效

```sh
source ~/.zshrc
```

## 其他

> 我在 `.zshrc` 中的其他配置
  

### history 命令时间格式

`history` 命令查看历史输入命令的时间展示格式

```sh
HIST_STAMPS="yyyy-mm-dd"
```

![](/media/15241577143324.jpg)

时间会按照指定的格式展示，方便搜索查看

### 主题

在 `~/.zshrc` 文件中设置主题为 `random` 即可开启随机主题

```
ZSH_THEME="random"
```
每次打开新的终端的时候，zsh 都会随机使用一个主题

### 别名

```sh
alias go="git-open"
```

```sh
alias rm="trash"
```

安装了一个 `trash` 命令，替代 `rm` 命令，被删除的文件会放到垃圾桶

[trash 官网](https://github.com/sindresorhus/trash)

安装方式 

```
npm install --global trash-cli
```

```sh
alias cp="cp -i
```

防止 `copy` 的时候覆盖已存在的文件, 带上 `i` 选项，文件已存在的时候，会提示，需要确认才能 `copy`

#### `bat` 代替 `cat`

`cat` 某个文件，可以在终端直接输出文件内容，`bat` 相比 `cat` 增加了行号和颜色高亮 👍

直接上个效果

![](/media/15262637829800.jpg)


[官网](https://github.com/sharkdp/bat)

安装方式

macOS 上

```
brew install bat
```

