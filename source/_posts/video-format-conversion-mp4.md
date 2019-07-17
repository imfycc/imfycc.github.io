---
title: 视频格式转换笔记
date: 2019-01-23 17:00:11
updated: 2019-01-23 17:00:11
tags:
categories: 编程
---

macOS 命令行安装 `ffmpeg`

```bash
brew install ffmpeg
```

flv 转换成 MP4

```
ffmpeg -i file.flv file.mp4
```

-crf：用于指定输出视频的质量，取值范围是0-51，默认值为23，数字越小输出视频的质量越高。 数字越大，视频也会越小。
