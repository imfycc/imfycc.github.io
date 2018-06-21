---
title: 封装一个简单的Ajax库
date: 2016-07-15 00:00
updated: 2016-07-15 00:00
tags: 前端
categories: 编程
---

```javascript

/*
	*参数说明：
   	*opts: {'可选参数'}
    **method: 请求方式:GET/POST,默认值:'GET';
    **url: 发送请求的地址, 默认值: 当前页地址;
    **data: string,json;
    **async: 是否异步:true/false,默认值:true;
    **cache: 是否缓存：true/false,默认值:true;
    **contentType: HTTP头信息，默认值：'application/x-www-form-urlencoded';
    **success: 请求成功后的回调函数;
    **error: 请求失败后的回调函数;
*/

function ajax(opts){
	//一、设置默认参数
	defaults = {
		url          : '',
		data         : '',
		method       : 'GET',
		aysnc        : 'true',
		cache        : 'true',
		ContentType  : 'application/x-www-form-urlencode',
		success      : function(){},
		error        : function(){}
	};
	//二、用户参数覆盖默认参数
	for(var key in opts){
		defaults[key] = opts[key];
	}
	//三、对数据进行处理
	if(typeof defaults.data === 'object'){//处理data
		var str = '';
		for(var key in defaults.data){
		 	str += 'key'+'='+defaults.data[key]+'&';
		}
		defaults.data = str.substring(0,str.length-1);
	}
	defaults.method = defaults.data.toupperCase();//处理method
	//处理缓存
	defaults.cache = defaults.cache ? '':'&' + new Date().getTime();
	if(defaults.method === 'GET' && (defaults.data || defaults.cache)){//处理url
		defaults.url +='?' + defaults.data +  defaults.cache;
	}
	//四、开始编写ajax
	//1、创建ajax对象
	var oXhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	//2、与服务器建立联系，告诉服务器要请求什么文件
	oXhr.open(defaults.method, defaults.url, defaults.async);
	//3、发送请求
	if(defaults.method === 'GET'){
		oXhr = send(null);
	}else{
		oXhr.setRequestHeader("Content-type", defaults.contentType);
		oXhr = send(defaults.data);
	}
	//4、等待服务器回应
	oXhr.onreadystatechange = function(){
		if(oXhr.readyState === 4){
			if(oXhr.status === 200){
				defaults.success.call(oXhr, oXhr.responseText);
			}else{
				defaults.error();
			}
		}
	};
}
```

### 使用示例：

```javascript
ajax({
  　　url: '1.php',
  　　data: {name: 'ivan', sex: 'male', age: '23'},
  　　success: function (data){ alert('返回数据是：' + data); }
  });
ajax({
 　　url: '1.php',
 　　data: 'name=ivan&sex=male&age=23',
 　　cache: false,
 　　success: function (data){ alert('返回数据是：' + data); }
});

```
## 参考：

[李坏博客：轻松搞定Ajax](http://www.lihuai.net/javascript/2407.html#comment-3715)

### 关于ajax缓存

只要是URL相同的GET请求，浏览器会使用缓存(当然还要看服务器的Cache-Control/Expires/Last-Modified/ETag头的设置)。

只要是POST请求，浏览器都不会缓存。

不缓存的办法：

1、在服务端加` header("Cache-Control: no-cache, must-revalidate");(如php中)`

2、在ajax发送请求前加上 `anyAjaxObj.setRequestHeader("If-Modified-Since","0");`

3、在ajax发送请求前加上` anyAjaxObj.setRequestHeader("Cache-Control","no-cache");`

4、在 Ajax 的 URL 参数后加上` "?fresh=" + Math.random();` //当然这里参数 fresh 可以任意取了

5、第五种方法和第四种类似，在 URL 参数后加上` "?timestamp=" + new Date().getTime();`

## 跨域问题：

[http://www.cnblogs.com/2050/p/3191744.html](http://www.cnblogs.com/2050/p/3191744.html)
