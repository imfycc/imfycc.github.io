---
title: nodejs yarn npm Mac下的路径问题
date: 2017-05-05 11:01:52
updated: 2017-05-05 11:01:52
overdue: true
tags:
categories: 编程
---

> `nodejs`、`npm`、`yarn` 是前端开发常用的基础软件，最近为了方便管理，我使用 `Homebrew` 重新安装了这三个软件。

> MacOS 命令行下的各种软件，如果可以，最好使用同一种软件管理，比如 `Homebrew`

### 路径

`Yarn` 使用 `global` 命令安装的全局包放在 `~/.config/yarn/global` 目录

`npm -g` 安装的的全局包放在了 `/usr/local/lib/node_modules`

`Homebrew` 安装的软件，安装的路径都在 `/usr/local/Cellar/`，然后使用链接指向了 `/usr/local/bin/`

`Yarn` 如果使用 `curl` 下载 `sh` 脚本安装，安装目录在 `~/.yarn` 中

### 问题

使用 `Homebrew` 重新安装 `nodejs` 时发现 `npm` 没有跟随 `nodejs` 升级，而是使用了之前 `/usr/local/lib/node_modules` 里的旧版本，把里面的 `npm` 删掉， `Homebrew` 重新安装 `nodejs`即可。

```javascript
brew reinstall node
```
