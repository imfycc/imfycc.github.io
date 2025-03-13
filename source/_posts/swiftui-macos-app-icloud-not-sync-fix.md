---
title: macOS App 开发 iCloud 不同步问题解决
date: 2025-03-12 23:13:54
updated: 2025-03-12 23:13:54
tags:
categories: 编程
---

## 背景

[时光鸡 - 纪念日·轮播提醒](https://apps.apple.com/zh/app/%E9%83%BD%E8%AE%B0%E5%BE%97/id6477067769) 我又做了 iOS 的第一个版本，想通过 CloudKit 实现两端的数据同步。但是同样的代码 iOS 正常，数据可以正常同步到 iCloud，macOS 的始终不行。

我在这个问题上调试了很久才解决掉，记录一下解决过程。

## 现象

1. 同样的代码 iOS 开发环境和商店版本都正常可以同步 iCloud 数据。
2. 同样的代码 macOS 版本开发环境可以正常同步数据，但是线上版本不行。

如果你也遇到了 macOS 开发环境 iCloud 能正常同步数据，但是 TestFlight 和线上版本却不行，可以看看我下面的处理过程。

我 iOS 版本数据同步是正常的，就排除了类似配置错误或者这个 CloudKit Database 不可用等可能性。

## 解决办法

参考这个案例 [SwiftUI macOS app not syncing with iCloud](https://stackoverflow.com/questions/74279246/swiftui-macos-app-not-syncing-with-icloud)

Apple 开发者论坛也有同样的问题备份 [SwiftUI macOS应用程序无法与iCloud同步](https://developer.apple.com/forums/thread/719135)

Well, the answer was simple and yet hard to find. It seems when you convert a Core Data app to work with CloudKit you need to add `CloudKit.framework` to the `Frameworks, Libraries, and Embedded Content` section. without it, the app will work when running in debug mode (via Xcode) but once it's in production, signed and notarized, it won't. Even if you have the right entitlements, all pointing to production, etc.

翻译一下：

嗯，答案很简单，但很难找到。似乎当您将 Core Data 应用程序转换为与 CloudKit 一起使用时，您需要添加 `CloudKit.framework` 到 `Frameworks, Libraries, and Embedded Content` 部分。如果没有它，应用程序将在调试模式下运行时（通过 Xcode）工作，但一旦它投入生产、签名和公证，它就不会工作。即使您拥有正确的权利，所有权利都指向生产等。


选择你的 Targets，第一个 General Tab 里面有个 `Frameworks, Libraries, and Embedded Content`，点击 ➕ 添加 `CloudKit.framework`，Embed 选择 `Do Not Embed`

## 报错的日志

```
error: CoreData+CloudKit: -[NSCloudKitMirroringDelegate _performSetupRequest:]_block_invoke(1242): <NSCloudKitMirroringDelegate: 0x60000377c000>: Failed to set up CloudKit integration for store: <NSSQLCore: 0x13dc04080> (URL: file:///Users/admin/Library/Containers/xxx)
<CKError 0x60000064adf0: "Service Unavailable" (6/NSCocoaErrorDomain:4099); "Error connecting to CloudKit daemon. This could happen for many reasons, for example a daemon exit, a device reboot, a race with the connection inactivity monitor, invalid entitlements, and more. Check the logs around this time to investigate the cause of this error."; Retry after 5.0 seconds>

error: CoreData+CloudKit: -[NSCloudKitMirroringDelegate recoverFromError:](2312): <NSCloudKitMirroringDelegate: 0x60000377c000> - Attempting recovery from error: <CKError 0x60000064adf0: "Service Unavailable" (6/NSCocoaErrorDomain:4099); "Error connecting to CloudKit daemon. This could happen for many reasons, for example a daemon exit, a device reboot, a race with the connection inactivity monitor, invalid entitlements, and more. Check the logs around this time to investigate the cause of this error."; Retry after 5.0 seconds>

Error retrieving daemon to get network transfer endpoint: Error Domain=NSCocoaErrorDomain Code=4099 "The connection to service named com.apple.cloudd was invalidated: failed at lookup with error 159 - Sandbox restriction." UserInfo={NSDebugDescription=The connection to service named com.apple.cloudd was invalidated: failed at lookup with error 159 - Sandbox restriction.}

Error getting network transfer endpoint: <CKError 0x600000600990: "Service Unavailable" (6/NSCocoaErrorDomain:4099); "Error connecting to CloudKit daemon. This could happen for many reasons, for example a daemon exit, a device reboot, a race with the connection inactivity monitor, invalid entitlements, and more. Check the logs around this time to investigate the cause of this error."; Retry after 5.0 seconds>

error: CoreData+CloudKit: -[NSCloudKitMirroringDelegate resetAfterError:andKeepContainer:](612): <NSCloudKitMirroringDelegate: 0x60000377c000> - resetting internal state after error: <CKError 0x60000064adf0: "Service Unavailable" (6/NSCocoaErrorDomain:4099); "Error connecting to CloudKit daemon. This could happen for many reasons, for example a daemon exit, a device reboot, a race with the connection inactivity monitor, invalid entitlements, and more. Check the logs around this time to investigate the cause of this error."; Retry after 5.0 seconds>
```

我的报错日志和 Apple 开发者论坛上提到的这个案例完全一致 [SwiftData iCloud sync breaks after disabling and re-enabling iCloud
](https://developer.apple.com/forums/thread/765948?answerId=808981022#808981022)

不过他的解决办法不是上面提到的 `CloudKit.framework` 而是 `com.apple.developer.icloud-container-environment` 这个属性写的 `Development` 导致上线后出现了问题，改成 `Production` 就好了。我感觉这个配置还挺好用的，我就直接固定成 `Production` 了，这样开发环境也直接连接线上数据库，反正都是连接我个人的 iCloud 不影响其他用户的数据。

该属性的 [Apple 文档地址](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.icloud-container-environment)
