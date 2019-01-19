---
title: 快捷键备忘录
date: 2017-07-07 15:59:32
updated: 2019-01-19 15:59:32
tags:
categories: 编程
---

> 小猿大圣的快捷键备忘录，方便查询 🐻

> 很多软件的快捷键，可以使用软件 `cheatSheet` 查看，长按 `command ⌘` 。

## 浏览器

### chrome

Chrome 快捷键 [官方帮助地址](https://support.google.com/chrome/answer/157179?hl=zh-Hans)

command + l 选中地址栏

## chrome 插件 vimium

## 编程软件

### vscode

command + b 展示隐藏侧边栏

command + k  v 预览 Markdown

command + shift + p 命令输入

command + p 搜索文件

## iTerm2 

`Ctrl+r` 然后输入若干字符，开始向上搜索包含该字符的命令，继续按Ctrl+r，搜索上一条匹配的命令

`Ctrl+s` 与Ctrl+r类似,只是正向检索

`command + shift + h` 弹出历史记录窗口

`Esc+b` 移动到当前单词的开头

`Esc+f` 移动到当前单词的结尾

`Ctrl+k` 剪切命令行中光标所在处之后的所有字符（包括自身）

`Ctrl+d` 删除光标所在处字符

`Ctrl+h` 删除光标所在处前一个字符

`Ctrl+y` 粘贴刚才所删除的字符

`Ctrl+w` 剪切光标所在处之前的一个词（以空格、标点等为分隔符）

## vim

### NerdTree

快键键| 描述
-----|-----
s    |  vsplit(左右) 一个新窗口打开选中文件，并跳到该窗口
O    |  递归打开选中 结点下的所有目录
x    |   合拢选中结点的父目录
X    |   递归 合拢选中结点下的所有目录
P    |   跳到根结点
p    |   跳到父结点
C    |   将选中目录或选中文件的父目录设为根结点
u    |   将当前根结点的父目录设为根目录，并变成合拢原根结点
U    |   将当前根结点的父目录设为根目录，但保持展开原根结点
q    |  关闭 NerdTree 窗口
?    |  切换是否显示 Quick Help
gT   |   前一个 tab
gt   |   后一个 tab

### vim-multiple-mouse

1、v 模式选中

2、ctrl + n 选择下一个

3、直接修改

ctrl + x 跳过当前匹配项

ctrl + p 取消当前的匹配项

alt + n 直接选中所有匹配项 

### 每日Vim 

> 征服编辑器之神 💪

1、复制一个单词并且替换现有单词

光标移动到aaa的开头，按 v 按e 按y

光标移动到bbb的开头，按 v 按e 按p

也就说，快速选中一个单词，按v按e即可

2、vim中快速转换大小写

~          将光标下的字母改变大小写

3~         将光标位置开始的3个字母改变其大小写

g~~        改变当前行字母的大小写

U          将可视模式下选择的字母全改成大写字母

u          将可视模式下选择的字母全改成小写

gUU        将当前行的字母改成大写

3gUU       将从光标开始到下面3行字母改成大写

guu       将当前行的字母全改成小写

gUw       将光标下的单词改成大写。

guw       将光标下的单词改成小写。

3、vim 屏幕滚动

向下滚动一屏(ctrl+f)
助记: Forwards。

向下滚动半屏(ctrl+d)
助记: Downwards。

向上滚动一屏(ctrl+b)
助记: Backwards。

向上滚动半屏(ctrl+u)
助记: Upwards。

4、`dit` 删除 HTML 标签内的内容

   `dat` 删除 HTML 标签以及内容
   
   `cit` 编辑 HTML 标签内的内容
   
5、选中一个单词 `viw`

6、强制保存 :w !sudo tee %


## alfred workflow

### youdao

shift + enter 发音

control ^ + enter 打开有道翻译的页面