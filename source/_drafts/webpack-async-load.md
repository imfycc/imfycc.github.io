---
title: react + webpack 模块按需异步加载
date: 2018-01-03 00:00:00
updated: 2018-01-03 00:00:00
tags:
categories: 编程
---

## 背景 
我们目前使用 `webpack`，是把所有文件都打包在一起，然后在页面中引入的。其实只有用户使用到某些模块才去加载会让页面更加流畅。 听说 `webpack` 也可以进行异步加载，今天我们一起研究一下。

## 任务 💯
学习 `webpack` 中如何进行模块的异步加载。
找出我们产品中能使用异步加载的一两个点，提出优化方案。

## 为什么需要按需加载
当网页需要承载的功能越来越多，对于采用单页应用作为前端架构的网站来说，会面临着一个网页需要加载的代码量巨大的问题。这会导致网页加载缓慢、交互卡顿，用户体验将非常糟糕。

导致这个问题的根本原因在于一次性的加载所有功能对应的代码，但其实用户每一阶段只可能使用其中一部分功能。 所以解决以上问题的方法就是用户当前需要用什么功能就只加载这个功能对应的代码，也就是所谓的按需加载。

## 如何使用按需加载
在给单页应用做按需加载优化时，一般采用以下原则：

* 把整个网站划分成一个个小功能，再按照每个功能的相关程度把它们分成几类。
把每一类合并为一个 `Chunk`，按需加载对应的 `Chunk`。
* 对于用户首次打开你的网站时需要看到的画面所对应的功能，不要对它们做按需加载，而是放到执行入口所在的 `Chunk` 中，以降低用户能感知的网页加载时间。
* 对于个别依赖大量代码的功能点，例如依赖 `Chart.js` 去画图表、依赖 `flv.js` 去播放视频的功能点，可再对其进行按需加载。

被分割出去的代码的加载需要一定的时机去触发，也就是当用户操作到了或者即将操作到对应的功能时再去加载对应的代码。 被分割出去的代码的加载时机需要开发者自己去根据网页的需求去衡量和确定。

由于被分割出去进行按需加载的代码在加载的过程中也需要耗时，你可以预言用户接下来可能会进行的操作，并提前加载好对应的代码，从而让用户感知不到网络加载时间。

## 啰嗦一下 🔔
写这篇文章的时候，`webpack` 的版本为 `4.2.0`。

## 了解 webpack 提供的方法

`webpack` 文档专门有一节叫做 `Code Splitting` ([代码拆分](https://doc.webpack-china.org/guides/code-splitting/))。

`Code Splitting` 的第三部分就是 [动态导入(dynamic imports)](https://doc.webpack-china.org/guides/code-splitting/#-dynamic-imports-) 以及扩展的[懒加载](https://doc.webpack-china.org/guides/lazy-loading)也就是本文要研究的按需异步加载的基础。

我们先移步 webpack 官网文档，webpack 提供了两种类似的动态导入方法。

第一种，也是官方首推的方式，使用符合 [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import) 的 [import()](https://doc.webpack-china.org/api/module-methods#import-) 语法。

第二种，则是使用 webpack 特定的 `[require.ensure](https://doc.webpack-china.org/api/module-methods#require-ensure)` 方法。 这种方法是 `webpack 1.x` 时代的，因此 webpack 也推荐使用第一种方法。

### 关于 import()

> 简单总结一下 import(), 如果想深入了解可以继续浏览文末的扩展阅读。

`import()` 目前在规范草案 TC39 过程的[第3阶段](https://tc39.github.io/process-document/)

`import()` 调用会在内部用到 `promise`。因此也支持 `Promise.all()` 来动态同时加载多个模块，还可以通过 `async function` 得到更漂亮的语法。 

如果在旧有版本浏览器中使用 `import()`，记得使用一个 `polyfill` 库（例如 `es6-promise` 或 `promise-polyfill`）

`import()` 中的传参可支持部分表达式的写法
例子 🌰

```js
function route(path, query) {
  return import(`./routes/${path}/route`)
    .then(route => new route.Route(query));
}
```
#### webpack 和 import()
调用 `import()` 之处，webpack 会将其作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 `chunk` 中(单独的 js 文件)。

例子 🌰

```js
if (module.hot) {
  import('lodash').then(_ => {
    // Do something with lodash (a.k.a '_')...
  })
}
```

Webpack 内置了对 `import()` 语句的支持，当 Webpack 遇到 `import()` 语句会这样处理：

* 以 `./loadsh.js` 为入口新生成一个 `Chunk`；
* 当代码执行到 `import()` 所在语句时才去加载由 `Chunk` 对应生成的文件。
* `import` 返回一个 `Promise`，当文件加载成功时可以在 `Promise` 的 `then` 方法中获取到 `loadsh.js` 的内容。

`import` 规范不允许控制模块的名称或其他属性，因为 `chunks` 只是 `webpack `中的一个概念。幸运的是，`webpack` 中可以通过注释接收一些特殊的参数，而无须破坏规定：

```js
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  'module'
);
```

具体的参数配置可以参考这里 [webpack import()](https://doc.webpack-china.org/api/module-methods#import-)

> 完全动态的语句（如 `import(foo)`），因为 webpack 至少需要一些文件的路径信息，而 `foo` 可能是系统或项目中任何文件的任何路径，因此 `foo` 将会解析失败。`import()` 必须至少包含模块位于何处的路径信息，所以打包应当限制在一个指定目录或一组文件中。

⚠️ 在 webpack 中使用 `System.import` 不符合提案规范，所以在 `2.1.0-beta.28` 后被弃用，并且建议使用 `import()`。

`babel` 插件支持

```json
{
  "plugins": ["syntax-dynamic-import"]
}
```

### 如何使用

比如我们动态加载 `lodash`

```diff
- import _ from 'lodash';
-
- function component() {
+ function getComponent() {
-   var element = document.createElement('div');
-
-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
+     var element = document.createElement('div');
+
+     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+     return element;
+
+   }).catch(error => 'An error occurred while loading the component');
  }

- document.body.appendChild(component());
+ getComponent().then(component => {
+   document.body.appendChild(component);
+ })
```

### 基于动态导入实现按需加载

先安装 `babel-plugin-syntax-dynamic-import`

```
npm i -D babel-plugin-syntax-dynamic-import 
或者 
yarn add babel-plugin-syntax-dynamic-import -D
```
然后在 `babel` 的配置文件里 `plungins` 中加上 `"syntax-dynamic-import"`
 
#### 基于路由
[react-router 代码拆分](https://reacttraining.com/react-router/web/guides/code-splitting)

这里面提供了一个 [react-loadable](https://github.com/jamiebuilds/react-loadable) 的库, 可以异步加载组件。



react 的[官方文档](https://reactjs.org/docs/code-splitting.html)，也提供了使用 `react-loadable` 实现的按需加载的实例

```
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: Loading,
});

const About = Loadable({
  loader: () => import('./routes/About'),
  loading: Loading,
});

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </Switch>
  </Router>
);
```

#### 基于组件

之前

```

import OtherComponent from './OtherComponent';

const MyComponent = () => (
  <OtherComponent/>
);
```

之后

```
import Loadable from 'react-loadable';

const LoadableOtherComponent = Loadable({
  loader: () => import('./OtherComponent'),
  loading: () => <div>Loading...</div>,
});

const MyComponent = () => (
  <LoadableOtherComponent/>
);
```

### 小结

`react-loadable` 其实就是根据 `webpack` 规范使用了 import() 方法异步处理了组件。同时，添加了预加载、超时处理等方法的封装。我们可以实现一个简单版本的。

[react-loadable 英文文档](https://github.com/jamiebuilds/react-loadable)

[react-loadable 中文文档](http://web.jobbole.com/91704)

```
import React from 'react';

export default class AsyncLoader extends React.Component {

  static propTypes = {
    path: React.PropTypes.string.isRequired,
    loading: React.PropTypes.element,
  };

  static defaultProps = {
    path: '',
    loading: <p>Loading...</p>,
    error: <p>Error</p>
  };

  constructor(props) {
    super(props);
    this.state = {
      component: null
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.path !== this.props.path
      || nextProps.error !== this.props.error
      || nextProps.loading !== this.props.loading) {
      this.load(nextProps);
    }
  }

  load(props) {

    this.setState({component: props.loading});

    import(`./path/${props.path}`)
      .then((m) => {
        let Component = m.default ? m.default : m;
        console.log("component: ", Component);
        this.setState({component: <Component/>});
      }).catch(() => {
        this.setState({component: props.error});
      });
  }

  render() {
    return this.state.component;
  }
}
```

使用方法

```
使用方法

<Route  
    exact path='/book' 
    render={()=><AsyncLoader path={'./components/Book.js'}/>} 
/>
```

### 基于路由的分割 vs 基于组件的分割

![63918611gy1fhfu01v668j20rs0bw75u](/media/63918611gy1fhfu01v668j20rs0bw75u.jpg)


`react-loadable` 对这个话题有过讨论，基本的观点如下：

> 显然组件的方式更好些。你可以轻松地在更多地方分割 app，Modals、tabs以及很多用户触发才展示内容的 UI 组件等，而不仅是路径。

> 更不用说那些延迟加载直到高优先级的内容加载完的地方。页面底部的组件加载一堆库：为什么在顶部时就要加载那些库呢？

## 对症下药 灵活运用

1、Webpack bundle analyzer 分析问题

根据 [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) 打包结果分析是否有可以继续拆分的 `chunks`

![](/media/15222033940467.jpg)

2、根据页面各个区域的点击量，分析用户常用的模块，进行按需加载

比如百度统计提供的 页面点击图功能

![2e46902fddbb58ba8abc967b74349d22_hd](/media/2e46902fddbb58ba8abc967b74349d22_hd.jpg)

或者数据统计系统的分析

APP 首页的点击情况
![](/media/15222093046702.jpg)

![](/media/15222093312637.jpg)

```

    /**
     * TODO: 以下这些择日从 M 站迁走
     */
    vip               : './src/vip',
    privilege_details : './src/privilege_details',
    v_share           : './src/v_share',
    starintro         : './src/starIntro',
    'sub-artisan'     : './src/subArtisan',
    'sub-product'     : './src/subProduct',
    group             : './src/group',
    badge             : './src/badge'
  },

```

mine 
home


分析工具
https://github.com/paulirish/pwmetrics
https://github.com/GoogleChrome/lighthouse/

m 站未升级 webpack 4.0 之前

![20180326071617](/media/20180326071617.png)

升级后

![](/media/15220198966322.jpg)


## 后续

CSS代码分割

缓存

## 参考
[webpack 中文文档](https://doc.webpack-china.org/guides/code-splitting/)
[webpack 英文文档](https://webpack.js.org/guides/code-splitting/)
[react 代码拆分官方文档](https://reactjs.org/docs/code-splitting.html)
[React配合Webpack实现代码分割与异步加载](https://www.chardlau.com/webpack-react-code-splitting-async-loading/)
[深入浅出 webpack](http://webpack.wuhaolin.cn/)

## 扩展阅读
### import()
[提案原文](https://github.com/tc39/proposal-dynamic-import)
[ES新提案：import()）——动态加载ES模块](https://python.freelycode.com/contribution/detail/662)
[原生ECMAScript模块： 动态 import()](http://www.zcfy.cc/article/native-ecmascript-modules-dynamic-import)
[Chrome 63 正式支持动态导入 | Dynamic import()](https://segmentfault.com/a/1190000012106657)

### webpack v4 
[webpack 4: Code Splitting, chunk graph and the splitChunks optimization](http://www.zcfy.cc/article/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization)
[没有了CommonsChunkPlugin，咱拿什么来分包（译）](https://github.com/yesvods/Blog/issues/15)

### 其他
[React Loadable 介绍](http://web.jobbole.com/91704/)



