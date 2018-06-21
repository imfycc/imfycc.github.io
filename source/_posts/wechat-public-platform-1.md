---
title: 微信开发之网页授权获取用户信息
date: 2015-11-22 00:00
updated: 2015-11-22 00:00
tags: 微信
categories: 编程
---

今天介绍以下几个知识点：

    1、微信的网页授权

    2、获取用户的信息（昵称、头像等）

    3、如何做到网页只能在微信打开

不用说了，看官方的 [开发文档](http://mp.weixin.qq.com/wiki/home/index.html)

在官方文档的左侧目录里找到“用户管理”--->[网页授权获取用户基本信息](http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html)

然后我们一步步开始吧！

<!--more-->

1、在微信后台绑定一个域名，我们之后要把自己的开发的页面绑定在这个域名上。

**设置**：

微信公众平台-->开发者中心-->接口权限表-->网页授权获取用户基本信息（⊙﹏⊙b 藏的真隐蔽）

![](http://7oxgmt.com1.z0.glb.clouddn.com/wp-content/uploads/2015/11/wechat1.png)

他后面有个“修改” 好了在这写上你的域名，格式是这样的 `hufangyun.com`

对就是不带子域，不带`http://` 只写域名，也就是说sae一类的不能用喽

2、网页授权有两两种

> **第一种**（snsapi_base）只获取用户的唯一标示OpenId,而且是静默授权，不需要用户点击同意授权。

> **第二种**（snsapi_userinfo）获取用户的头像、昵称、性别、城市、特权一类的具体信息。这种需要用户授权，如图：

![](http://7oxgmt.com1.z0.glb.clouddn.com/wp-content/uploads/2015/11/wechat.png)

3、引导用户打开如下链接

```
https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&amp;redirect_uri=REDIRECT_URI&amp;response_type=code&amp;scope=SCOPE&amp;state=STATE#wechat_redirect
```

怎么引导用户打开呢？聪明的你已经想到了吧。比如说把这个链接加在底部菜单里或者关键词回复里。

好了，我们一起分析一下这个链接

`https://open.weixin.qq.com/connect/oauth2/authorize?` 这一串是固定的，也就它使页面只能在微信里打开，转到QQ或者浏览器都会提示。（今天的第四个知识点讲完了）

![](http://7oxgmt.com1.z0.glb.clouddn.com/wp-content/uploads/2015/11/wechat2-300x232.jpg)

`appid=APPID` 把APPID替换成你公众号对的appid 这个也是在微信公众号后台的开发者中心获得。

`redirect_uri=REDIRECT_URI` 这个参数是个重点，我们需要替换`REDIRECT_URI`这里就是填写你开发页面的地址，比如http://hufangyun.com/hello/index.php，域名就是我们在第一步绑定的域名。

`scope=SCOPE` 这个就是填写你选择那种授权方式。snsapi_base或这snsapi_userinfo 其他的参数看wiki了解吧。

**当用户触发了上面的链接时，我们可以获取其中的code值。**

PHP示例：

```php
$code = $_GET['code'];
```

4、通过code换取网页授权access_token

请求以下的链接，获取access_token

```
https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&amp;secret=SECRET&amp;code=CODE&amp;grant_type=authorization_code
```


appid和之前说的一样，替换成你的。

`secret=SECRET `这个参数也是在微信公众号后台的开发者中心获得。

php示例：

```php
function https_request($url, $data = null) //url 请求函数
{
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
  if (!empty($data))
  {
   curl_setopt($curl, CURLOPT_POST, 1);
   curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  }
   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
   $output = curl_exec($curl);
   curl_close($curl); return $output; }

$code=$_GET['code'];//取得微信中的code参数
$url="https://api.weixin.qq.com/sns/oauth2/access_token?appid=微信公众号ID&amp;secret=微信后台有&amp;code=$code&amp;grant_type=authorization_code";
$output = https_request($url);
$output = json_decode($output);//以Json的格式输出
$array = get_object_vars($output);//转换成数组
$openid = $array['openid'];//输出openid 微信用户唯一标示
```

错误时微信会返回JSON数据包如下（示例为Code无效错误）:

{"errcode":40029,"errmsg":"invalid code"} [全局返回码说明](http://mp.weixin.qq.com/wiki/17/fa4e1434e57290788bde25603fa2fcbd.html)

比较常用的就是这个Openid，可以用它来区分用户，比如用户是否已经投票，已经报名，已经领取卡券。

> 讲到这里，其实获取用户的昵称，头像什么的就很简单

我们在前面已经讲过了，网页授权有两种，使用第二种snsapi_userinfo  就可以获取到用户的详细信息。

就是把引导用户打开的那个链接（看上文），里面的SCOPE值改成snsapi_userinfo

```php
 https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
```

然后再按上文的步骤，获code，获取access_taken，再获取用户的信息就行了。

O(∩∩)O好的，* 三个知识点，都已经讲完了。
