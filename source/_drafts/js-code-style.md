---
title: JavaScript代码风格指南 ---Airbnb版
date: 2017-01-22 15:28:53
updated: 2017-07-24  00:28:53
tags: [翻译,前端,JavaScript]
categories: 翻译
---

> 原文是GitHub上的开源文章，更新活跃，网络上的很多译文没有与原文及时同步。

>本译文会跟随原文同步更新。转载请注明来源'胡方运的博客'

[查看原文](https://github.com/airbnb/javascript)

最后更新日期：2017-07-27

# [](#airbnb-javascript-style-guide-)

## [](#table-of-contents)目录

1.  [类型](#types)

2.  [引用](#references)

3.  [对象](#objects)

4.  [数组](#arrays)

<!--more-->

5.  [解构](#destructuring)

6.  [字符串](#strings)

7.  [函数](#functions)

8.  [箭头函数](#arrow-functions)

9.  [类 & 构造函数](#classes--constructors)

10.  [模块](#modules)

11.  [遍历器 和 生成器](#iterators-and-generators)

12.  [属性](#properties)

13.  [变量](#variables)

14.  [提升](#hoisting)

15.  [比较运算符 & 等号](#comparison-operators--equality)

16.  [代码块](#blocks)

17.  [Control Statements](#control-statements)

18.  [注释](#comments)

19.  [空格](#whitespace)

20.  [逗号](#commas)

21.  [分号](#semicolons)

22.  [类型转换 & 强制](#type-casting--coercion)

23.  [命名规则](#naming-conventions)

24.  [访问器](#accessors)

25.  [事件](#events)

26.  [jQuery](#jquery)

27.  [ECMAScript 5 兼容性](#ecmascript-5-compatibility)

28.  [ECMAScript 6+ (ES 2015+) 编码风格](#ecmascript-6-es-2015-styles)

29.  [测试](#testing)

30.  [性能](#performance)

31.  [资源](#resources)

32.  [使用人群](#in-the-wild)

33.  [翻译](#translation)

34.  [JavaScript 风格指南说明](#the-javascript-style-guide-guide)

35.  [一起来讨论 JavaScript ](#chat-with-us-about-javascript)

36.  [贡献者](#contributors)

37.  [许可证](#license)

## [](#types)类型

*   [1.1](#types--primitives) **基本类型**: 访问基本类型数据时，直接存取它们的值。

*   `string`

*   `number`

*   `boolean`

*   `null`

*   `undefined`

```
    const foo = 1;
    let bar = foo;

    bar = 9;

    console.log(foo, bar); // => 1, 9

```

*   [1.2](#types--complex)  **复杂类型**: 访问复杂数据类型数据时，操作的是它们值的引用。

*   `object`

*   `array`

*   `function`

```
    const foo = [1, 2];
    const bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9

```

**[⬆ back to top](#table-of-contents)**

## [](#references)引用

*   [2.1](#references--prefer-const) 所有引用使用 `const` ; 避免使用 `var`。 eslint: [`prefer-const`](http://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign.html)

> 为什么? 这能确保你无法对引用重新赋值，也不会导致出现 bug 或难以理解。

```
    // 坏
    var a = 1;
    var b = 2;

    // 好
    const a = 1;
    const b = 2;

```

*   [2.2](#references--disallow-var) 如果你必须重置你的引用，使用 `let` 代替 `var`。 eslint: [`no-var`](http://eslint.org/docs/rules/no-var.html) jscs: [`disallowVar`](http://jscs.info/rule/disallowVar)

> 为什么? `let` 是块级作用域，而 `var` 是函数作用域。

```
    // 反例
    var count = 1;
    if (true) {
      count += 1;
    }

    // 推荐，使用 let.
    let count = 1;
    if (true) {
      count += 1;
    }

```

*   [2.3](#references--block-scope) 注：`let`和 `const` 是块级作用域。

```
    // const 和 let 仅存在于他们被定义的块级作用域。
    {
      let a = 1;
      const b = 1;
    }
    console.log(a); // 引用错误
    console.log(b); // 引用错误

```

**[⬆ back to top](#table-of-contents)**

## [](#objects)对象

*   [3.1](#objects--no-new) 使用字面量创建对象。 eslint: [`no-new-object`](http://eslint.org/docs/rules/no-new-object.html)

```
    // 反例
    const item = new Object();

    // 推荐
    const item = {};

```

*   [3.2](#es6-computed-properties) 创建有动态属性名的对象时，使用可被计算的属性名称。

> 为什么？因为这样可以让你在一个地方定义所有的对象属性。

```
    function getKey(k) {
      return `a key named ${k}`;
    }

    // 反例
    const obj = {
      id: 5,
      name: 'San Francisco',
    };
    obj[getKey('enabled')] = true;

    // 推荐
    const obj = {
      id: 5,
      name: 'San Francisco',
      [getKey('enabled')]: true,
    };

```

*   [3.3](#es6-object-shorthand) 使用对象方法的简写。 eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html) jscs: [`requireEnhancedObjectLiterals`](http://jscs.info/rule/requireEnhancedObjectLiterals)

```
    // 反例
    const atom = {
      value: 1,

      addValue: function (value) {
        return atom.value + value;
      },
    };

    // 推荐
    const atom = {
      value: 1,

      addValue(value) {
        return atom.value + value;
      },
    };

```

*   [3.4](#es6-object-concise) 使用对象属性值的简写。 eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html) jscs: [`requireEnhancedObjectLiterals`](http://jscs.info/rule/requireEnhancedObjectLiterals)

> 为什么? 因为这样更简短更有描述性。

```
    const lukeSkywalker = 'Luke Skywalker';

    // 反例
    const obj = {
      lukeSkywalker: lukeSkywalker,
    };

    // 推荐
    const obj = {
      lukeSkywalker,
    };

```

*   [3.5](#objects--grouped-shorthand) 在对象属性声明前把简写的属性分组。

> 为什么？因为这样能清楚地看出哪些属性使用了简写。

```
    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';

    // 反例
    const obj = {
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      lukeSkywalker,
      episodeThree: 3,
      mayTheFourth: 4,
      anakinSkywalker,
    };

    // 推荐
    const obj = {
      lukeSkywalker,
      anakinSkywalker,
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      episodeThree: 3,
      mayTheFourth: 4,
    };

```
*   [3.6](#objects--quoted-props) 仅仅有无效的标识符时使用单引号。eslint: [`quote-props`](http://eslint.org/docs/rules/quote-props.html) jscs: [`disallowQuotedKeysInObjects`](http://jscs.info/rule/disallowQuotedKeysInObjects)

> 为什么？通常，我们主观上认为这样更容易阅读。而且这样改善了语法高亮，并且也容易被很多 JS 引擎优化。

```
    // 反例
    const bad = {
      'foo': 3,
      'bar': 4,
      'data-blah': 5,
    };

    // 推荐
    const good = {
      foo: 3,
      bar: 4,
      'data-blah': 5,
    };

```

*   [3.7](#objects--prototype-builtins) 不要直接调用`Object.prototype` 的方法。例如， `hasOwnProperty`, `propertyIsEnumerable`, 和 `isPrototypeOf`。

> 为什么？这些方法可能会被对象的属性影响。 考虑这几种情况：`{ hasOwnProperty: false }` 或者，对象可能是空的 (`Object.create(null)`)。

```
    // 反例
    console.log(object.hasOwnProperty(key));

    // 推荐
    console.log(Object.prototype.hasOwnProperty.call(object, key));

    // 最佳
    const has = Object.prototype.hasOwnProperty; // 在模块范围内，缓存曾经的查找。
    /* 或者 */
    import has from 'has';
    …
    console.log(has.call(object, key));

```

*   [3.8](#objects--rest-spread) 更倾向于浅拷贝而不是对象扩展运算符 [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 。 省略对象某些属性，操作剩余的属性以获取一个新的对象。

```
    // 非常糟糕
    const original = { a: 1, b: 2 };
    const copy = Object.assign(original, { c: 3 }); // 改变了 `original` ಠ_ಠ
    delete copy.a; // 所以这样

    // 反例
    const original = { a: 1, b: 2 };
    const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

    // 推荐
    const original = { a: 1, b: 2 };
    const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

    const { a, ...noA } = copy; // noA => { b: 2, c: 3 }

```

**[⬆ back to top](#table-of-contents)**

## [](#arrays)数组

*   [4.1](#arrays--literals) 用字面值创建数组。 eslint: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor.html)

```
    // 反例
    const items = new Array();

    //推荐
    const items = [];

```

*   [4.2](#arrays--push) 向数组添加元素时使用 [Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 替代直接赋值。

```
    const someStack = [];

    // 反例
    someStack[someStack.length] = 'abracadabra';

    // 推荐
    someStack.push('abracadabra');

```

*   [4.3](#es6-array-spreads) 使用拓展运算符 `...` 复制数组。

```
    // 反例
    const len = items.length;
    const itemsCopy = [];
    let i;

    for (i = 0; i < len; i += 1) {
      itemsCopy[i] = items[i];
    }

    // 推荐
    const itemsCopy = [...items];

```

*   [4.4](#arrays--from) 使用 [Array.from](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)把一个类数组对象转换成数组。

```
    const foo = document.querySelectorAll('.foo');
    const nodes = Array.from(foo);

```

*   [4.5](#arrays--callback-return) 在数组方法回调里，使用 return 返回状态。如果函数主体由单独的状态组成，可以省略 return。 查看 [8.2](#8.2). eslint: [`array-callback-return`](http://eslint.org/docs/rules/array-callback-return)
*   [4.5](#arrays--callback-return) Use return statements in array method callbacks. It’s ok to omit the return if the function body consists of a single statement returning an expression without side effects, following [8.2](#arrows--implicit-return). eslint: [`array-callback-return`](http://eslint.org/docs/rules/array-callback-return)

```
    // 推荐
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });

    // 推荐
    [1, 2, 3].map(x => x + 1);

    // 反例
    const flat = {};
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
      const flatten = memo.concat(item);
      flat[index] = flatten;
    });

    // 推荐
    const flat = {};
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
      const flatten = memo.concat(item);
      flat[index] = flatten;
      return flatten;
    });

    // 反例
    inbox.filter((msg) => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      } else {
        return false;
      }
    });

    // 推荐
    inbox.filter((msg) => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      }

      return false;
    });

```

<a name="arrays--bracket-newline"></a>
  - [4.6](#arrays--bracket-newline) Use line breaks after open and before close array brackets if an array has multiple lines

  ```javascript
  // bad
  const arr = [
    [0, 1], [2, 3], [4, 5],
  ];

  const objectInArray = [{
    id: 1,
  }, {
    id: 2,
  }];

  const numberInArray = [
    1, 2,
  ];

  // good
  const arr = [[0, 1], [2, 3], [4, 5]];

  const objectInArray = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  const numberInArray = [
    1,
    2,
  ];
  ```

**[⬆ back to top](#table-of-contents)**

## [](#destructuring)解构

*   [5.1](#destructuring--object) 使用解构存取和使用多属性对象。 jscs: [`requireObjectDestructuring`](http://jscs.info/rule/requireObjectDestructuring)

>为什么？因为解构能减少临时引用属性。

```
    // 反例
    function getFullName(user) {
      const firstName = user.firstName;
      const lastName = user.lastName;

      return `${firstName} ${lastName}`;
    }

    // 推荐
    function getFullName(user) {
      const { firstName, lastName } = user;
      return `${firstName} ${lastName}`;
    }

    // 最佳
    function getFullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    }

```

*   [5.2](#destructuring--array) 对数组使用解构赋值。 jscs: [`requireArrayDestructuring`](http://jscs.info/rule/requireArrayDestructuring)

```
    const arr = [1, 2, 3, 4];

    // 反例
    const first = arr[0];
    const second = arr[1];

    // 推荐
    const [first, second] = arr;

```

*   [5.3](#destructuring--object-over-array) 需要回传多个值时，使用对象解构，而不是数组解构。 jscs: [`disallowArrayDestructuringReturn`](http://jscs.info/rule/disallowArrayDestructuringReturn)

> 为什么？增加属性或者改变排序不会改变调用时的位置。

```
    // 反例
    function processInput(input) {
      return [left, right, top, bottom];
    }

    // 调用方需要考虑返回数据的顺序
    const [left, __, top] = processInput(input);

    // 推荐
    function processInput(input) {
      return { left, right, top, bottom };
    }

    // 调用者只选择他们需要的数据
    const { left, top } = processInput(input);

```

**[⬆ back to top](#table-of-contents)**

## [](#strings) 字符串

*   [6.1](#strings--quotes) 字符串使用单引号 `''` eslint: [`quotes`](http://eslint.org/docs/rules/quotes.html) jscs: [`validateQuoteMarks`](http://jscs.info/rule/validateQuoteMarks)

```
    // 反例
    const name = "Capt. Janeway";

    // 反例 - 模板文字应包含插值或换行符
    const name = `Capt. Janeway`;

    // 推荐
    const name = 'Capt. Janeway';

```

*   [6.2](#strings--line-length) 字符串超过 100 个字节不应该串联多行书写。

> 为什么？折行的字符串使工作痛苦，并且不方便搜索。

```
    // 反例
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // 反例
    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';

    // 推荐
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

```

*   [6.3](#es6-template-literals) 程序化生成字符串时，使用模板字符串代替字符串连接。eslint: [`prefer-template`](http://eslint.org/docs/rules/prefer-template.html) [`template-curly-spacing`](http://eslint.org/docs/rules/template-curly-spacing) jscs: [`requireTemplateStrings`](http://jscs.info/rule/requireTemplateStrings)

> 为什么？模板字符串有简明的语法、正确的换行和字符串插值功能。

```
    // 反例
    function sayHi(name) {
      return 'How are you, ' + name + '?';
    }

    // 反例
    function sayHi(name) {
      return ['How are you, ', name, '?'].join();
    }

    // 反例
    function sayHi(name) {
      return `How are you, ${ name }?`;
    }

    // 推荐
    function sayHi(name) {
      return `How are you, ${name}?`;
    }

```

*   [6.4](#strings--eval) 在字符串中绝不使用 `eval()` ，它打开了太多的漏洞。
*   [6.4](#strings--eval) Never use `eval()` on a string, it opens too many vulnerabilities. eslint: [`no-eval`](http://eslint.org/docs/rules/no-eval)

*   [6.5](#strings--escaping) 不要转义字符串中的不需要转义的字符。eslint: [`no-useless-escape`](http://eslint.org/docs/rules/no-useless-escape)

> 为什么？反斜杠影响了可读性，因此它们只能出现在必要的时候。

```
    // 反例
    const foo = '\'this\' \i\s \"quoted\"';

    // 推荐
    const foo = '\'this\' is "quoted"';
    const foo = `my name is '${name}'`;

```


**[⬆ back to top](#table-of-contents)**

## [](#functions)函数

*   [7.1](#functions--declarations) 使用函数声明代替函数表达式。 eslint: [`func-style`](http://eslint.org/docs/rules/func-style) jscs: [`disallowFunctionDeclarations`](http://jscs.info/rule/disallowFunctionDeclarations)

> Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability. If you find that a function’s definition is large or complex enough that it is interfering with understanding the rest of the file, then perhaps it’s time to extract it to its own module! Don’t forget to name the expression - anonymous functions can make it harder to locate the problem in an Error’s call stack. ([Discussion](https://github.com/airbnb/javascript/issues/794))
>
> 为什么？函数声明被挂起（hoisted），这意味着它很容易-太容易-在文件中定义函数之前引用它。这损害可读性和可维护性。 如果你发现一个函数的定义是大的或足够复杂的，它会干扰理解文件的其余部分，那么也许是时候把它提取到自己的模块了！ 不要忘记给表达式命名--匿名函数会使得在错误调用堆栈中查找问题变得更加困难。([Discussion](https://github.com/airbnb/javascript/issues/794))

```
    // 反例
    function foo() {
      // ...
    }

    // 反例
    const foo = function () {
      // ...
    };

    // 推荐
    const foo = function bar() {
      // ...
    };

```

*   [7.2](#functions--iife) 用圆括号包装立即被调用的函数表达式。 eslint: [`wrap-iife`](http://eslint.org/docs/rules/wrap-iife.html) jscs: [`requireParenthesesAroundIIFE`](http://jscs.info/rule/requireParenthesesAroundIIFE)

> 为什么？一个立即被调用的函数表达式是一个独立单元，用括号包装它，调用，能够清新的的表达。值得注意的是，在这个世界上，模块无处不在，你几乎从不需要立即被调用的函数表达式（IIFE）。

```
    // 立即被调用的函数表达式 (IIFE)
    (function () {
      console.log('Welcome to the Internet. Please follow me.');
    }());

```

*   [7.3](#functions--in-blocks) 永远不要在一个非函数代码块（`if`、`while` 等）中声明一个函数，把该函数赋给一个变量。浏览器允许你这么做，可是坏消息是，它们的解析表现不一致。eslint: [`no-loop-func`](http://eslint.org/docs/rules/no-loop-func.html)

*   [7.4](#functions--note-on-blocks) **注意:** ECMA-262 把 `block` 定义为一组语句(statements)。函数声明不是语句(statements)。[阅读 ECMA-262 关于这个问题的说明](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

```
    // 反例
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // 推荐
    let test;
    if (currentUser) {
      test = () => {
        console.log('Yup.');
      };
    }

```

*   [7.5](#functions--arguments-shadow) 永远不要把参数命名为 `arguments`。这将取代原来函数作用域内的 `arguments` 对象。

```
    // 反例
    function foo(name, options, arguments) {
      // ...
    }

    // 推荐
    function foo(name, options, args) {
      // ...
    }

```

*   [7.6](#es6-rest) 不要使用 `arguments`。可以选择 rest 语法 `...` 替代。eslint: [`prefer-rest-params`](http://eslint.org/docs/rules/prefer-rest-params)

> 为什么？使用 `...` 能明确你要传入的参数。另外 rest 参数是一个真正的数组，而 `arguments` 是一个类数组。

```
    // 反例
    function concatenateAll() {
      const args = Array.prototype.slice.call(arguments);
      return args.join('');
    }

    // 推荐
    function concatenateAll(...args) {
      return args.join('');
    }

```

*   [7.7](#es6-default-parameters) 直接给函数的参数指定默认值，不要使用一个变化的函数参数。

```
    // 真的很糟糕
    function handleThings(opts) {
      // 不！我们不应该改变函数参数。
      // 更加糟糕: 如果参数 opts 是 false 的话，它就会被设定为一个对象。
      // 但这样的写法会造成一些 Bugs。
      opts = opts || {};
      // ...
    }

    // 依旧糟糕
    function handleThings(opts) {
      if (opts === void 0) {
        opts = {};
      }
      // ...
    }

    // 推荐
    function handleThings(opts = {}) {
      // ...
    }

```

*   [7.8](#functions--default-side-effects) 直接给函数参数赋值时需要避免副作用。

> 为什么？因为这样的写法让人感到很困惑。

```
    var b = 1;
    // 反例
    function count(a = b++) {
      console.log(a);
    }
    count();  // 1
    count();  // 2
    count(3); // 3
    count();  // 3

```

*   [7.9](#functions--defaults-last) 默认参数总是放在最后。

```
    // 反例
    function handleThings(opts = {}, name) {
      // ...
    }

    // 推荐
    function handleThings(name, opts = {}) {
      // ...
    }

```

*   [7.10](#functions--constructor) 永远不要用函数构造器创建一个新函数。 eslint: [`no-new-func`](http://eslint.org/docs/rules/no-new-func)

> 为什么？用这种方式创建一个类似eval()计算字符串的函数, 会打开漏洞。

```
    // 糟糕
    var add = new Function('a', 'b', 'return a + b');

    // 依旧糟糕
    var subtract = Function('a', 'b', 'return a - b');

```

*   [7.11](#functions--signature-spacing) 函数声明中的空格。 eslint: [`space-before-function-paren`](http://eslint.org/docs/rules/space-before-function-paren) [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks)

> 为什么？保持一致性是好的，当添加或移除函数名称时，不必添加或移除空格。

```
    // 反例
    const f = function(){};
    const g = function (){};
    const h = function() {};

    // 推荐
    const x = function () {};
    const y = function a() {};

```

*   [7.12](#functions--mutate-params) 不要改变参数。 eslint: [`no-param-reassign`](http://eslint.org/docs/rules/no-param-reassign.html)

> 为什么？操纵传入的参数，可能会导致在原来的调用中导致不必要的变量副作用。

```
    // 反例
    function f1(obj) {
      obj.key = 1;
    };

    // 推荐
    function f2(obj) {
      const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
    };

```

*   [7.13](#functions--reassign-params) 不要重置参数。eslint: [`no-param-reassign`](http://eslint.org/docs/rules/no-param-reassign.html)

> 为什么？重置参数会导致意外的行为，特别是当访问 `arguments` 对象参数。它也可能导致优化问题，特别是在V8。

```
    // 反例
    function f1(a) {
      a = 1;
      // ...
    }

    function f2(a) {
      if (!a) { a = 1; }
      // ...
    }

    // 推荐
    function f3(a) {
      const b = a || 1;
      // ...
    }

    function f4(a = 1) {
      // ...
    }

```

*   [7.14](#functions--spread-vs-apply) 使用传播操作符 `...` 调用可变参数函数。 eslint: [`prefer-spread`](http://eslint.org/docs/rules/prefer-spread)

> 为什么？这是简洁的，你不需要提供一个上下文，你也不需要用 `apply` 组成 `new` 。

```
    // 反例
    const x = [1, 2, 3, 4, 5];
    console.log.apply(console, x);

    // 推荐
    const x = [1, 2, 3, 4, 5];
    console.log(...x);

    // 反例
    new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

    // 推荐
    new Date(...[2016, 8, 5]);

```

*   [7.15](#functions--signature-invocation-indentation) 带有多个参数的函数，或者调用，应缩进就像本指南中所有其他多行列表： 每一项自己占一行, 最后一项加上逗号。

```
    // 反例
    function foo(bar,
                 baz,
                 quux) {
      // ...
    }

    // 推荐
    function foo(
      bar,
      baz,
      quux,
    ) {
      // ...
    }

    // 反例
    console.log(foo,
      bar,
      baz);

    // 推荐
    console.log(
      foo,
      bar,
      baz,
    );

```

**[⬆ back to top](#table-of-contents)**

## [](#arrow-functions)箭头函数


*   [8.1](#arrows--use-them) 当你必须使用函数表达式（或传递一个匿名函数）时，使用箭头函数符号。eslint: [`prefer-arrow-callback`](http://eslint.org/docs/rules/prefer-arrow-callback.html), [`arrow-spacing`](http://eslint.org/docs/rules/arrow-spacing.html) jscs: [`requireArrowFunctions`](http://jscs.info/rule/requireArrowFunctions)

> 为什么?因为箭头函数创造了新的一个 `this` 执行环境，通常情况下都能满足你的需求，而且这样的写法更为简洁。

> 为什么不？如果你有一个相当复杂的函数，你或许可以把逻辑部分转移到一个函数声明上。

```
    // 反例
    [1, 2, 3].map(function (x) {
      const y = x + 1;
      return x * y;
    });

    // 推荐
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });

```
*   [8.2](#arrows--implicit-return) 如果函数主体包含单独的表达，可以省略花括号并且使用隐形`return`。 否则，保留花括号并且使用`return`返回语句。 eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html), [`arrow-body-style`](http://eslint.org/docs/rules/arrow-body-style.html) jscs:  [`disallowParenthesesAroundArrowParam`](http://jscs.info/rule/disallowParenthesesAroundArrowParam), [`requireShorthandArrowFunctions`](http://jscs.info/rule/requireShorthandArrowFunctions)

*   - [8.2](#arrows--implicit-return) If the function body consists of a single statement returning an [expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) without side effects, omit the braces and use the implicit return. Otherwise, keep the braces and use a `return` statement. eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html), [`arrow-body-style`](http://eslint.org/docs/rules/arrow-body-style.html) jscs:  [`disallowParenthesesAroundArrowParam`](http://jscs.info/rule/disallowParenthesesAroundArrowParam), [`requireShorthandArrowFunctions`](http://jscs.info/rule/requireShorthandArrowFunctions)

> 为什么？语法糖。多个函数链接在一起时，可读性更好。

```
    // 反例
    [1, 2, 3].map(number => {
      const nextNumber = number + 1;
      `A string containing the ${nextNumber}.`;
    });

    // 推荐
    [1, 2, 3].map(number => `A string containing the ${number}.`);

    // 推荐
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1;
      return `A string containing the ${nextNumber}.`;
    });

    // 推荐
    [1, 2, 3].map((number, index) => ({
      [index]: number
    }));

    // No implicit return with side effects
    function foo(callback) {
      const val = callback();
      if (val === true) {
        // Do something if callback returns true
      }
    }

    let bool = false;

    // bad
    foo(() => bool = true);

    // good
    foo(() => {
      bool = true;
    });


```

*   [8.3](#arrows--paren-wrap) 如果表达式跨越多行，请将其包在括号中以获得更好的可读性。

> 为什么？这样清楚地显示函数的开始和结束。

```
    // 反例
    ['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod
      )
    );

    // 推荐
    ['get', 'post', 'put'].map(httpMethod => (
      Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod
      )
    ));

```

*   [8.4](#arrows--one-arg-parens) 如果你的函数只有一个参数并且没有使用花括号，可以省略圆括号。 否则，总是使用圆括号包裹语句。eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html) jscs:  [`disallowParenthesesAroundArrowParam`](http://jscs.info/rule/disallowParenthesesAroundArrowParam)
* [8.4](#arrows--one-arg-parens) If your function takes a single argument and doesn’t use braces, omit the parentheses. Otherwise, always include parentheses around arguments for clarity and consistency. Note: it is also acceptable to always use parentheses, in which case use the [“always” option](http://eslint.org/docs/rules/arrow-parens#always) for eslint or do not include [`disallowParenthesesAroundArrowParam`](http://jscs.info/rule/disallowParenthesesAroundArrowParam) for jscs. eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens.html) jscs:  [`disallowParenthesesAroundArrowParam`](http://jscs.info/rule/disallowParenthesesAroundArrowParam)

> 为什么？减少视觉混乱。

```
    // 反例
    [1, 2, 3].map((x) => x * x);

    // 推荐
    [1, 2, 3].map(x => x * x);

    // 推荐
    [1, 2, 3].map(number => (
      `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    ));

    // 反例
    [1, 2, 3].map(x => {
      const y = x + 1;
      return x * y;
    });

    // 推荐
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });

```

*   [8.5](#arrows--confusing) 用比较操作符 (`=`)避免混淆箭头函数的语法(`=>`) 。 eslint: [`no-confusing-arrow`](http://eslint.org/docs/rules/no-confusing-arrow)

```
    // 反例
    const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

    // 反例
    const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

    // 推荐
    const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

    // 推荐
    const itemHeight = (item) => {
      const { height, largeSize, smallSize } = item;
      return height > 256 ? largeSize : smallSize;
    };

```

**[⬆ back to top](#table-of-contents)**

## [](#classes--constructors)类 & 构造器

*   [9.1](#constructors--use-class) 总是使用`class`。避免直接操纵 `prototype` directly。

> 为什么？`class` 语法更简洁，更容易理解。

```
    // 反例
    function Queue(contents = []) {
      this.queue = [...contents];
    }
    Queue.prototype.pop = function () {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    };

    // 推荐
    class Queue {
      constructor(contents = []) {
        this.queue = [...contents];
      }
      pop() {
        const value = this.queue[0];
        this.queue.splice(0, 1);
        return value;
      }
    }

```

*   [9.2](#constructors--extends) 使用`extends`继承。

> 为什么？为什么？因为 `extends` 是一个内建的原型继承方法并且不会破坏 `instanceof`。

```
    // 反例
    const inherits = require('inherits');
    function PeekableQueue(contents) {
      Queue.apply(this, contents);
    }
    inherits(PeekableQueue, Queue);
    PeekableQueue.prototype.peek = function () {
      return this._queue[0];
    }

    // 推荐
    class PeekableQueue extends Queue {
      peek() {
        return this._queue[0];
      }
    }

```

*   [9.3](#constructors--chaining) 方法可以返回 `this` 来帮助链式调用。

```
    // 反例
    Jedi.prototype.jump = function () {
      this.jumping = true;
      return true;
    };

    Jedi.prototype.setHeight = function (height) {
      this.height = height;
    };

    const luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20); // => undefined

    // 推荐
    class Jedi {
      jump() {
        this.jumping = true;
        return this;
      }

      setHeight(height) {
        this.height = height;
        return this;
      }
    }

    const luke = new Jedi();

    luke.jump()
      .setHeight(20);

```

*   [9.4](#constructors--tostring) 可以写一个自定义的 `toString()` 方法，但要确保它能正常运行并且不会引起副作用。

```
    class Jedi {
      constructor(options = {}) {
        this.name = options.name || 'no name';
      }

      getName() {
        return this.name;
      }

      toString() {
        return `Jedi - ${this.getName()}`;
      }
    }

```

*   [9.5](#constructors--no-useless) 如果没有指定，类有默认构造函数。一个空构造函数函数或一个只向父类委托的函数是不必要的。eslint: [`no-useless-constructor`](http://eslint.org/docs/rules/no-useless-constructor)

```
    // 反例
    class Jedi {
      constructor() {}

      getName() {
        return this.name;
      }
    }

    // 反例
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
      }
    }

    // 推荐
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
        this.name = 'Rey';
      }
    }

```

*   [9.6](#classes--no-duplicate-members) 避免重复类成员。eslint: [`no-dupe-class-members`](http://eslint.org/docs/rules/no-dupe-class-members)

> 为什么？重复的类成员声明将默默地执行最后一个-有重复的几乎肯定是一个bug。

```
    // 反例
    class Foo {
      bar() { return 1; }
      bar() { return 2; }
    }

    // 推荐
    class Foo {
      bar() { return 1; }
    }

    // 推荐
    class Foo {
      bar() { return 2; }
    }

```

**[⬆ back to top](#table-of-contents)**

## [](#modules)模块

*   [10.1](#modules--use-them) 总是使用模组 (`import`/`export`) 而不是其他非标准模块系统。你可以编译为你喜欢的模块系统。

> 为什么？模块就是未来，让我们开始迈向未来吧。

```
    // 反例
    const AirbnbStyleGuide = require('./AirbnbStyleGuide');
    module.exports = AirbnbStyleGuide.es6;

    // ok
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    export default AirbnbStyleGuide.es6;

    // 最好
    import { es6 } from './AirbnbStyleGuide';
    export default es6;

```

*   [10.2](#modules--no-wildcard) 不要使用通配符 import。

> 为什么？这样能确保你只有一个默认 export。

```
    // 反例
    import * as AirbnbStyleGuide from './AirbnbStyleGuide';

    // 推荐
    import AirbnbStyleGuide from './AirbnbStyleGuide';

```

*   [10.3](#modules--no-export-from-import) 不要从 import 中直接 export。

> Why? Although the one-liner is concise, having one clear way to import and one clear way to export makes things consistent.

```
    // 反例
    // filename es6.js
    export { es6 as default } from './AirbnbStyleGuide';

    // 推荐
    // filename es6.js
    import { es6 } from './AirbnbStyleGuide';
    export default es6;

```

*   [10.4](#modules--no-duplicate-imports) 只从一个路径 import。
    eslint: [`no-duplicate-imports`](http://eslint.org/docs/rules/no-duplicate-imports)

> 为什么？具有从同一路径导入的多行可以使代码更难维护。

```
      // 反例
      import foo from 'foo';
      // … some other imports … //
      import { named1, named2 } from 'foo';

      // 推荐
      import foo, { named1, named2 } from 'foo';

      // 推荐
      import foo, {
        named1,
        named2,
      } from 'foo';

```

*   [10.5](#modules--no-mutable-exports) 不要 export 变量。
    eslint: [`import/no-mutable-exports`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)

> 为什么？一般情况下，变量应该避免，特别是当 export 变量。虽然一些特殊的情况下可能需要这种技术，一般来说，只有常量引用可以导出。

```
      // 反例
      let foo = 3;
      export { foo }

      // 推荐
      const foo = 3;
      export { foo }

```

*   [10.6](#modules--prefer-default-export) 在单出口的模块中，默认 export 比被命名 export 更好一些.
    eslint: [`import/prefer-default-export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)

```
      // 反例
      export function foo() {}

      // 推荐
      export default function foo() {}

```

*   [10.7](#modules--imports-first) 把所有的`import`放在非`import`语句上面。
    eslint: [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)

> 为什么？因为`import` 是被引入的，把它们都放在顶部可以避免一些奇怪的问题。

```
      // 反例
      import foo from 'foo';
      foo.init();

      import bar from 'bar';

      // 推荐
      import foo from 'foo';
      import bar from 'bar';

      foo.init();

```

*   [10.8](#modules--multiline-imports-over-newlines) 多行的 import 应该和多行数组或者多行对象同样的方式缩进。

> 为什么？大括号跟其他括号块在风格指南相同的缩进规则，后面的逗号一样。

```
    // 反例
    import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

    // 推荐
    import {
      longNameA,
      longNameB,
      longNameC,
      longNameD,
      longNameE,
    } from 'path';

```

*   [10.9](#modules--no-webpack-loader-syntax) 在模块 import 语句里不允许有 Webpack 加载器语法
    eslint: [`import/no-webpack-loader-syntax`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)

> 为什么？因为把连接的代码导入模块打包器使用了 Webpack 语法。最好在`webpack.config.js` 里使用加载器语法.

```
      // 反例
      import fooSass from 'css!sass!foo.scss';
      import barCss from 'style!css!bar.css';

      // 推荐
      import fooSass from 'foo.scss';
      import barCss from 'bar.css';

```

**[⬆ back to top](#table-of-contents)**

## [](#iterators-and-generators)  迭代器和生成器

*   [11.1](#iterators--nope) 不要使用 iterators。使用高阶函数例如 `map()` 和 `reduce()` 替代 `for-of`。eslint: [`no-iterator`](http://eslint.org/docs/rules/no-iterator.html) [`no-restricted-syntax`](http://eslint.org/docs/rules/no-restricted-syntax)

> 为什么？这加强了我们不变的规则。处理纯函数的回调值更易读，这比它带来的副作用更重要。
> 使用 `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... 遍历数组并且`Object.keys()` / `Object.values()` / `Object.entries()` 可以遍历对象产生数组。

```
    const numbers = [1, 2, 3, 4, 5];

    // 反例
    let sum = 0;
    for (let num of numbers) {
      sum += num;
    }
    sum === 15;

    // 推荐
   let sum = 0;
   numbers.forEach((num) => {
     sum += num;
   });
   sum === 15;

    // 最好 (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0);
    sum === 15;

    // 反例
    const increasedByOne = [];
    for (let i = 0; i < numbers.length; i++) {
      increasedByOne.push(numbers[i] + 1);
    }

    // 推荐
    const increasedByOne = [];
    numbers.forEach((num) => {
     increasedByOne.push(num + 1);
   });

    // 最好 (保持它的功能)
    const increasedByOne = numbers.map(num => num + 1);

```

*   [11.2](#generators--nope) 现在还不要使用 generators。

> 为什么？因为它们现在还没法很好地编译到 ES5。

*   [11.3](#generators--spacing) 如果你必须使用生成器，或者如果你想忽视 [我们的建议](#generators--nope), 确保它们的函数声明间隔正确。eslint: [`generator-star-spacing`](http://eslint.org/docs/rules/generator-star-spacing)

> 为什么？ `function` 和 `*` 同一概念关键字的一部分 - `*` 不是 `function` 修饰符, `function*` 是一个独特的结构，和 `function` 不同。

```
    // 反例
    function * foo() {
      // ...
    }

    // 反例
    const bar = function * () {
      // ...
    }

    //反例
    const baz = function *() {
      // ...
    }

    // 反例
    const quux = function*() {
      // ...
    }

    // 反例
    function*foo() {
      // ...
    }

    // 反例
    function *foo() {
      // ...
    }

    // 非常糟糕
    function
    *
    foo() {
      // ...
    }

    // 非常糟糕
    const wat = function
    *
    () {
      // ...
    }

    // 推荐
    function* foo() {
      // ...
    }

    // 推荐
    const foo = function* () {
      // ...
    }

```

**[⬆ back to top](#table-of-contents)**

## [](#properties)Properties

*   [12.1](#properties--dot) 使用 `.` 来访问对象的属性。 eslint: [`dot-notation`](http://eslint.org/docs/rules/dot-notation.html) jscs: [`requireDotNotation`](http://jscs.info/rule/requireDotNotation)

```
    const luke = {
      jedi: true,
      age: 28,
    };

    // 反例
    const isJedi = luke['jedi'];

    // 推荐
    const isJedi = luke.jedi;

```

*   [12.2](#properties--bracket) 当通过变量访问属性时使用中括号 `[]`。

```
    const luke = {
      jedi: true,
      age: 28,
    };

    function getProp(prop) {
      return luke[prop];
    }

    const isJedi = getProp('jedi');

```
<a name="es2016-properties--exponentiation-operator"></a>
  - [12.3](#es2016-properties--exponentiation-operator) Use exponentiation operator `**` when calculating exponentiations. eslint: [`no-restricted-properties`](http://eslint.org/docs/rules/no-restricted-properties).

    ```javascript
    // bad
    const binary = Math.pow(2, 10);

    // good
    const binary = 2 ** 10;
    ```

**[⬆ back to top](#table-of-contents)**

## [](#variables)变量

*   [13.1](#variables--const) 一直使用 `const` 或者 `let` 来声明变量，如果不这样做就会产生全局变量。我们需要避免全局命名空间的污染。[地球队长](http://www.wikiwand.com/en/Captain_Planet)已经警告过我们了。 eslint: [`no-undef`](http://eslint.org/docs/rules/no-undef) [`prefer-const`](http://eslint.org/docs/rules/prefer-const)

```
    // 反例
    superPower = new SuperPower();

    // 推荐
    const superPower = new SuperPower();

```

*   [13.2](#variables--one-const) 使用 `const` 或者 `let` 声明每一个变量。 eslint: [`one-var`](http://eslint.org/docs/rules/one-var.html) jscs: [`disallowMultipleVarDecl`](http://jscs.info/rule/disallowMultipleVarDecl)

> 为什么？增加新变量将变的更加容易，而且你永远不用再担心调换错 `;` 跟 `,`，也不用担心引入标点符号唯一的差别。这样，你还可以使用调试器单步执行每个声明，而不是一次跳跃通过所有变量。

```
    // 反例
    const items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // 反例
    //（与上面相比，尝试着找出错误）
    const items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';

    // 推荐
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = 'z';

```

*   [13.3](#variables--const-let-group) 先将所有的 `const` 分组，然后再分组 `let`。

> 为什么？当你需要把已赋值变量赋值给未赋值变量时非常有用。

```
    // 反例
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // 反例
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;

    // 推荐
    const goSportsTeam = true;
    const items = getItems();
    let dragonball;
    let i;
    let length;

```

*   [13.4](#variables--define-where-used) 在你需要的地方给变量赋值，但请把它们放在一个合理的位置。

> 为什么？let 和 const 是块级作用域而不是函数作用域。

```
    // 反例 - 不必要的函数调用
    function checkName(hasName) {
      const name = getName();

      if (hasName === 'test') {
        return false;
      }

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }

    // 推荐
    function checkName(hasName) {
      if (hasName === 'test') {
        return false;
      }

      const name = getName();

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }

```

*   [13.5](#variables--no-chain-assignment) 不要串联声明变量。

> 为什么？ 将变量串联在一起声明，会错误声明成全局变量。

```
    // 反例
    (function example() {
      // JavaScript 将其解释为
      // let a = ( b = ( c = 1 ) );
      // let 关键词只作用在变量 a 上，变量 b 变量 c 变成了全局变量
      let a = b = c = 1;
    }());

    console.log(a); // throws ReferenceError
    console.log(b); // 1
    console.log(c); // 1

    // 推荐
    (function example() {
      let a = 1;
      let b = a;
      let c = a;
    }());

    console.log(a); // throws ReferenceError
    console.log(b); // throws ReferenceError
    console.log(c); // throws ReferenceError

    // `const` 是相同的道理

```

*   [13.6](#variables--unary-increment-decrement) 避免使用一元增量和减量操作符。 eslint [`no-plusplus`](http://eslint.org/docs/rules/no-plusplus)

> 为什么？ 根据 eslint 文档， 一元递增和递减操作符语句受到自动分号插入的影响，并且可能会导致应用程序中的值递增或递减出现不为人知的错误。  用 `num + = 1` 代替 `num ++` 或 `num ++` ，更有表现力。 不允许一元增量和减量语句也会阻止您无意地预先递增/预先递减值，这也可能导致程序出现意外行为。

```
      // 反例

      const array = [1, 2, 3];
      let num = 1;
      num++;
      --num;

      let sum = 0;
      let truthyCount = 0;
      for(let i = 0; i < array.length; i++){
        let value = array[i];
        sum += value;
        if (value) {
          truthyCount++;
        }
      }

      // 推荐

      const array = [1, 2, 3];
      let num = 1;
      num += 1;
      num -= 1;

      const sum = array.reduce((a, b) => a + b, 0);
      const truthyCount = array.filter(Boolean).length;

```

**[⬆ back to top](#table-of-contents)**

## [](#hoisting) 提升

*   [14.1](#hoisting--about) `var` 声明会被提升至该作用域的顶部，但它们赋值不会提升。let 和 const 被赋予了一种称为 [暂时性死区（Temporal Dead Zones, TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_le)的概念。这对于了解为什么  [typeof 不再安全](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15)相当重要。

```
    // 我们知道这样不会工作 (假设没有 notDefined 全局变量)
    function example() {
      console.log(notDefined); // => 抛出一个引用错误
    }

    // 由于变量提升，创建一个变量声明之后，引用的变量将会工作。
    // 注: 赋值的 `true` 不会被提升。
    function example() {
      console.log(declaredButNotAssigned); // => undefined
      var declaredButNotAssigned = true;
    }

    //解释器将提升变量声明到作用域的顶部
    //这意味着我们的示例可以重写为：
    function example() {
      let declaredButNotAssigned;
      console.log(declaredButNotAssigned); // => undefined
      declaredButNotAssigned = true;
    }

    // 使用 const 和 let
    function example() {
      console.log(declaredButNotAssigned); // => 抛出一个引用错误
      console.log(typeof declaredButNotAssigned); // => 抛出一个引用错误
      const declaredButNotAssigned = true;
    }

```

*   [14.2](#hoisting--anon-expressions) 匿名函数表达式的变量名会被提升，但函数内容并不会。

```
    function example() {
      console.log(anonymous); // => undefined

      anonymous(); // => TypeError anonymous is not a function

      var anonymous = function () {
        console.log('anonymous function expression');
      };
    }

```

*   [14.3](#hoisting--named-expresions) 命名的函数表达式的变量名会被提升，但函数名和函数函数内容并不会。
```
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      superPower(); // => ReferenceError superPower is not defined

      var named = function superPower() {
        console.log('Flying');
      };
    }

    // the same is true when the function name
    // is the same as the variable name.
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      var named = function named() {
        console.log('named');
      };
    }

```

*   [14.4](#hoisting--declarations) 函数声明的名称和函数体都会被提升。

```
    function example() {
      superPower(); // => Flying

      function superPower() {
        console.log('Flying');
      }
    }

```

* 想了解更多信息，参考 [Ben Cherry](http://www.adequatelygood.com/) 的 [JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting/)。

**[⬆ back to top](#table-of-contents)**

## [](#comparison-operators--equality)比较运算符 & 等号

*   [15.1](#comparison--eqeqeq) 使用 `===` 和 `!==` 而不是 `==` 和 `!=`。 eslint: [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq.html)

*   [15.2](#comparison--if) 条件表达式例如 `if` 语句通过抽象方法 `ToBoolean` 强制计算它们的表达式并且总是遵守下面的规则：

*   **对象** 被计算为 **true**

*   **Undefined** 被计算为 **false**

*   **Null** 被计算为 **false**

*   **布尔值** 被计算为 **布尔的值**

*   **数字** 被计算为 **false** 如果是 **+0, -0, 被计算为  NaN**, 否则为 **true**

*   **字符串** 被计算为 **false** 如果是空字符串 `''`, 否则为 **true**

```
    if ([0] && []) {
      // true
      // 数组 (即使是空数组)是对象, 对象将计算成true
    }

```

*   [15.3](#comparison--shortcuts) 布尔类型的判断使用简写, 但是显式的比较字符串和数字类型。

```
    // 反例
    if (isValid === true) {
      // ...
    }

    // 推荐
    if (isValid) {
      // ...
    }

    // 反例
    if (name) {
      // ...
    }

    // 推荐
    if (name !== '') {
      // ...
    }

    // 反例
    if (collection.length) {
      // ...
    }

    // 推荐
    if (collection.length > 0) {
      // ...
    }

```


*   [15.5](#comparison--switch-blocks) `case` 和 `default` 子句的代码使用花括号包裹，词法声明也包含在内。(例如： `let`, `const`, `function`, 和 `class`).eslint: [`no-case-declarations`](http://eslint.org/docs/rules/no-case-declarations.html)

> 为什么？词法声明在整个 `switch` 代码块内是可见的， 仅仅当到达该 `case` 子句，被赋值的语句才会初始化。当多个 `case` 子句尝试定义同一个事物时，这会导致问题。

```
      // 反例
      switch (foo) {
        case 1:
          let x = 1;
          break;
        case 2:
          const y = 2;
          break;
        case 3:
          function f() {
            // ...
          }
          break;
        default:
          class C {}
      }

      // 推荐
      switch (foo) {
        case 1: {
          let x = 1;
          break;
        }
        case 2: {
          const y = 2;
          break;
        }
        case 3: {
          function f() {
            // ...
          }
          break;
        }
        case 4:
          bar();
          break;
        default: {
          class C {}
        }
      }

```

*   [15.6](#comparison--nested-ternaries) 三元表达式不应该嵌套使用，一般每个表达式单独一行。

eslint rules: [`no-nested-ternary`](http://eslint.org/docs/rules/no-nested-ternary.html).

```
    // 反例
    const foo = maybe1 > maybe2
      ? "bar"
      : value1 > value2 ? "baz" : null;

    // 更好
    const maybeNull = value1 > value2 ? 'baz' : null;

    const foo = maybe1 > maybe2
      ? 'bar'
      : maybeNull;

    // 最好
    const maybeNull = value1 > value2 ? 'baz' : null;

    const foo = maybe1 > maybe2 ? 'bar' : maybeNull;

```

*   [15.7](#comparison--unneeded-ternary) 避免不必要的三元表达式

eslint rules: [`no-unneeded-ternary`](http://eslint.org/docs/rules/no-unneeded-ternary.html).

```
    // 反例
    const foo = a ? a : b;
    const bar = c ? true : false;
    const baz = c ? false : true;

    // 推荐
    const foo = a || b;
    const bar = !!c;
    const baz = !c;

```

**[⬆ back to top](#table-of-contents)**

## [](#blocks)代码块

*   [16.1](#blocks--braces) 使用大括号包裹所有的多行代码块。

```
    // 反例
    if (test)
      return false;

    // 推荐
    if (test) return false;

    // 推荐
    if (test) {
      return false;
    }

    // 反例
    function foo() { return false; }

    // 推荐
    function bar() {
      return false;
    }

```

  *   [16.2](#blocks--cuddled-elses) 如果通过 `if` 和 `else` 使用多行代码块，把 `else` 放在 `if` 代码块关闭括号的同一行。eslint: [`brace-style`](http://eslint.org/docs/rules/brace-style.html) jscs:  [`disallowNewlineBeforeBlockStatements`](http://jscs.info/rule/disallowNewlineBeforeBlockStatements)

```
    // 反例
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }

    // 推荐
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }

```

**[⬆ back to top](#table-of-contents)**

## Control Statements

  <a name="control-statements"></a>
  - [17.1](#control-statements) In case your control statement (`if`, `while` etc.) gets too long or exceeds the maximum line length, each (grouped) condition could be put into a new line. It’s up to you whether the logical operator should begin or end the line.

    ```javascript
    // bad
    if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
      thing1();
    }

    // bad
    if (foo === 123 &&
      bar === 'abc') {
      thing1();
    }

    // bad
    if (foo === 123
      && bar === 'abc') {
      thing1();
    }

    // good
    if (
      (foo === 123 || bar === "abc") &&
      doesItLookGoodWhenItBecomesThatLong() &&
      isThisReallyHappening()
    ) {
      thing1();
    }

    // good
    if (foo === 123 && bar === 'abc') {
      thing1();
    }

    // good
    if (
      foo === 123 &&
      bar === 'abc'
    ) {
      thing1();
    }

    // good
    if (
      foo === 123
      && bar === 'abc'
    ) {
      thing1();
    }
    ```

## [](#comments)注释

*   [18.1](#comments--multiline) 多行注释使用 `/** ... */` 。

```
    // 反例
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {

      // ...

      return element;
    }

    // 推荐
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {

      // ...

      return element;
    }

```

*   [18.2](#comments--singleline) 单行注释使用 `//` 。 在评论对象上面另起一行使用单行注释。在注释前插入空行，除非是代码的第一行。

```
    // 反例
    const active = true;  // is current tab

    // 推荐
    // is current tab
    const active = true;

    // 反例
    function getType() {
      console.log('fetching type...');
      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }

    // 推荐
    function getType() {
      console.log('fetching type...');

      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }

    // 这样也不错
    function getType() {
      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }

```

*   [18.3](#comments--spaces) 注释前面加一个空格可以提高可读性。eslint: [`spaced-comment`](http://eslint.org/docs/rules/spaced-comment)

```
    // 反例
    //is current tab
    const active = true;

    // 推荐
    // is current tab
    const active = true;

    // 反例
    /**
     *make() returns a new element
     *based on the passed-in tag name
     */
    function make(tag) {

      // ...

      return element;
    }

    // 推荐
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {

      // ...

      return element;
    }

```

*   [18.4](#comments--actionitems) 给注释增加 `FIXME` 或 `TODO` 的前缀可以帮助其他开发者快速了解这是一个需要复查的问题，或是给需要实现的功能提供一个解决方式。这将有别于常见的注释，因为它们是可操作的。使用 `FIXME -- need to figure this out` 或者 `TODO -- need to implement`。

*   [18.5](#comments--fixme) 使用 `// FIXME:` 标注问题。

```
    class Calculator extends Abacus {
      constructor() {
        super();

        // FIXME: 这里不应该使用一个全局变量
        total = 0;
      }
    }

```

*   [18.6](#comments--todo) 使用 `// TODO:` 标注要解决的问题。

```
    class Calculator extends Abacus {
      constructor() {
        super();

        // TODO: total 应该可以通过一个参数实现可配置
        this.total = 0;
      }
    }

```

**[⬆ back to top](#table-of-contents)**

## [](#whitespace) 空白

*   [19.1](#whitespace--spaces) 使用 2 个空格作为缩进。 eslint: [`indent`](http://eslint.org/docs/rules/indent.html) jscs: [`validateIndentation`](http://jscs.info/rule/validateIndentation)
*   [19.1](#whitespace--spaces) Use soft tabs (space character) set to 2 spaces. eslint: [`indent`](http://eslint.org/docs/rules/indent.html) jscs: [`validateIndentation`](http://jscs.info/rule/validateIndentation)

```
    // 反例
    function foo() {
    ∙∙∙∙const name;
    }

    // 反例
    function bar() {
    ∙const name;
    }

    // 推荐
    function baz() {
    ∙∙const name;
    }

```

*   [19.2](#whitespace--before-blocks) 在花括号前放一个空格。 eslint: [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks.html) jscs: [`requireSpaceBeforeBlockStatements`](http://jscs.info/rule/requireSpaceBeforeBlockStatements)

```
    // 反例
    function test(){
      console.log('test');
    }

    // 推荐
    function test() {
      console.log('test');
    }

    // 反例
    dog.set('attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });

    // 推荐
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });

```

*   [19.3](#whitespace--around-keywords) 在控制语句（`if`、`while` 等）的小括号前放一个空格。在函数调用及声明中，不在函数的参数列表前加空格。 eslint: [`keyword-spacing`](http://eslint.org/docs/rules/keyword-spacing.html) jscs: [`requireSpaceAfterKeywords`](http://jscs.info/rule/requireSpaceAfterKeywords)

```
    // 反例
    if(isJedi) {
      fight ();
    }

    // 推荐
    if (isJedi) {
      fight();
    }

    // 反例
    function fight () {
      console.log ('Swooosh!');
    }

    // 推荐
    function fight() {
      console.log('Swooosh!');
    }

```

*   [19.4](#whitespace--infix-ops) 使用空格把运算符隔开。 eslint: [`space-infix-ops`](http://eslint.org/docs/rules/space-infix-ops.html) jscs: [`requireSpaceBeforeBinaryOperators`](http://jscs.info/rule/requireSpaceBeforeBinaryOperators), [`requireSpaceAfterBinaryOperators`](http://jscs.info/rule/requireSpaceAfterBinaryOperators)

```
    // 反例
    const x=y+5;

    // 推荐
    const x = y + 5;

```

*   [19.5](#whitespace--newline-at-end) 在文件末尾插入一个空行。 eslint: [`eol-last`](https://github.com/eslint/eslint/blob/master/docs/rules/eol-last.md)

```
    // 反例
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;

```

```
    // 反例
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵
    ↵

```

```
    // 推荐
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵

```

*   [19.6](#whitespace--chains) 在使用长方法链时进行缩进。使用前面的点 . 强调这是方法调用而不是新语句。eslint: [`newline-per-chained-call`](http://eslint.org/docs/rules/newline-per-chained-call) [`no-whitespace-before-property`](http://eslint.org/docs/rules/no-whitespace-before-property)

```
    // 反例
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // 反例
    $('#items').
      find('.selected').
        highlight().
        end().
      find('.open').
        updateCount();

    // 推荐
    $('#items')
      .find('.selected')
        .highlight()
        .end()
      .find('.open')
        .updateCount();

    // 反例
    const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);

    // 推荐
    const leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .classed('led', true)
        .attr('width', (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);

    // 推荐
    const leds = stage.selectAll('.led').data(data);

```

*   [19.7](#whitespace--after-blocks) 在块末和新语句前插入空行。 jscs: [`requirePaddingNewLinesAfterBlocks`](http://jscs.info/rule/requirePaddingNewLinesAfterBlocks)

```
    // 反例
    if (foo) {
      return bar;
    }
    return baz;

    // 推荐
    if (foo) {
      return bar;
    }

    return baz;

    // 反例
    const obj = {
      foo() {
      },
      bar() {
      },
    };
    return obj;

    // 推荐
    const obj = {
      foo() {
      },

      bar() {
      },
    };

    return obj;

    // 反例
    const arr = [
      function foo() {
      },
      function bar() {
      },
    ];
    return arr;

    // 推荐
    const arr = [
      function foo() {
      },

      function bar() {
      },
    ];

    return arr;

```

*   [19.8](#whitespace--padded-blocks) 不要在代码块里面添加空行。eslint: [`padded-blocks`](http://eslint.org/docs/rules/padded-blocks.html) jscs:  [`disallowPaddingNewlinesInBlocks`](http://jscs.info/rule/disallowPaddingNewlinesInBlocks)

```
    // 反例
    function bar() {

      console.log(foo);

    }

    // 也不是很好
    if (baz) {

      console.log(qux);
    } else {
      console.log(foo);

    }

    // 推荐
    function bar() {
      console.log(foo);
    }

    // 推荐
    if (baz) {
      console.log(qux);
    } else {
      console.log(foo);
    }

```

*   [19.9](#whitespace--in-parens) 不要在圆括号里添加空格。eslint: [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens.html) jscs: [`disallowSpacesInsideParentheses`](http://jscs.info/rule/disallowSpacesInsideParentheses)

```
    // 反例
    function bar( foo ) {
      return foo;
    }

    // 推荐
    function bar(foo) {
      return foo;
    }

    // 反例
    if ( foo ) {
      console.log(foo);
    }

    // 推荐
    if (foo) {
      console.log(foo);
    }

```

*   [19.10](#whitespace--in-brackets) 在中括号里不要添加空格。 eslint: [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing.html) jscs: [`disallowSpacesInsideArrayBrackets`](http://jscs.info/rule/disallowSpacesInsideArrayBrackets)

```
    // 反例
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // 推荐
    const foo = [1, 2, 3];
    console.log(foo[0]);

```

*   [19.11](#whitespace--in-braces) 在花括号里添加空格。 eslint: [`object-curly-spacing`](http://eslint.org/docs/rules/object-curly-spacing.html) jscs: [`requireSpacesInsideObjectBrackets`](http://jscs.info/rule/requireSpacesInsideObjectBrackets)

```
    // 反例
    const foo = {clark: 'kent'};

    // 推荐
    const foo = { clark: 'kent' };

```

*   [19.12](#whitespace--max-len) 避免一行代码太长超过100个字符（包括空格）。 Note: per [above](#strings--line-length), long strings are exempt from this rule, and should not be broken up. eslint: [`max-len`](http://eslint.org/docs/rules/max-len.html) jscs: [`maximumLineLength`](http://jscs.info/rule/maximumLineLength)

> 为什么？这是为了确保代码的可读性和可维护性。

```
    // 反例
    const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

    // 反例
    $.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

    // 推荐
    const foo = jsonData
      && jsonData.foo
      && jsonData.foo.bar
      && jsonData.foo.bar.baz
      && jsonData.foo.bar.baz.quux
      && jsonData.foo.bar.baz.quux.xyzzy;

    // 推荐
    $.ajax({
      method: 'POST',
      url: 'https://airbnb.com/',
      data: { name: 'John' },
    })
      .done(() => console.log('Congratulations!'))
      .fail(() => console.log('You have failed this city.'));

```

**[⬆ back to top](#table-of-contents)**

## [](#commas) 逗号

*   [20.1](#commas--leading-trailing) 行首逗号：**不需要**。 eslint: [`comma-style`](http://eslint.org/docs/rules/comma-style.html) jscs: [`requireCommaBeforeLineBreak`](http://jscs.info/rule/requireCommaBeforeLineBreak)

```
    // 反例
    const story = [
        once
      , upon
      , aTime
    ];

    // 推荐
    const story = [
      once,
      upon,
      aTime,
    ];

    // 反例
    const hero = {
        firstName: 'Ada'
      , lastName: 'Lovelace'
      , birthYear: 1815
      , superPower: 'computers'
    };

    // 推荐
    const hero = {
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthYear: 1815,
      superPower: 'computers',
    };

```

*   [20.2](#commas--dangling) 增加结尾的逗号: **需要**。 eslint: [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle.html) jscs: [`requireTrailingComma`](http://jscs.info/rule/requireTrailingComma)

> 这会让 git diffs 更干净。另外，像 babel 这样的转译器会移除结尾多余的逗号，也就是说你不必担心老旧浏览器的尾[逗号问题](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas)。

```
    // 反例 - git diff 没有逗号
    const hero = {
         firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing']
    };

    // 推荐 - git diff 有逗号
    const hero = {
         firstName: 'Florence',
         lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing'],
    };

```

```
    // 反例
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully'
    };

    const heroes = [
      'Batman',
      'Superman'
    ];

    // 推荐
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully',
    };

    const heroes = [
      'Batman',
      'Superman',
    ];

    // 反例
    function createHero(
      firstName,
      lastName,
      inventorOf
    ) {
      // does nothing
    }

    // 推荐
    function createHero(
      firstName,
      lastName,
      inventorOf,
    ) {
      // does nothing
    }

    // 推荐 (请注意，逗号不得出现在 `rest` 元素之后)
    function createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    ) {
      // does nothing
    }

    // 反例
    createHero(
      firstName,
      lastName,
      inventorOf
    );

    // 推荐
    createHero(
      firstName,
      lastName,
      inventorOf,
    );

    // 推荐 (请注意，逗号不得出现在 `rest` 元素之后)
    createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    )

```

**[⬆ back to top](#table-of-contents)**

## [](#semicolons) 分号

*   [21.1](#semicolons--required) **使用分号** eslint: [`semi`](http://eslint.org/docs/rules/semi.html) jscs: [`requireSemicolons`](http://jscs.info/rule/requireSemicolons)

```
    // 反例
    (function () {
      const name = 'Skywalker'
      return name
    })()

    // 推荐
    (function () {
      const name = 'Skywalker';
      return name;
    }());

    // 推荐, (防止函数在两个 IIFE 合并时被当成一个参数)
    ;(() => {
      const name = 'Skywalker';
      return name;
    }());

```

[Read more](https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214%237365214).

**[⬆ back to top](#table-of-contents)**

## [](#type-casting--coercion) 类型转换

*   [22.1](#coercion--explicit) 在语句开始时执行类型转换。

*   [22.2](#coercion--strings)  字符串

```
    // => this.reviewScore = 9;

    // 反例
    const totalScore = this.reviewScore + ''; //  调用 this.reviewScore.valueOf()

    // 反例
    const totalScore = this.reviewScore.toString(); // 不保证返回的是字符串

    // 推荐
    const totalScore = String(this.reviewScore);

```

*   [22.3](#coercion--numbers) 数字：对数字使用 `Number` 或者 `parseInt` 转换， 使用后者时带上类型转换的基数。 eslint: [`radix`](http://eslint.org/docs/rules/radix)

```
    const inputValue = '4';

    // 反例
    const val = new Number(inputValue);

    // 反例
    const val = +inputValue;

    // 反例
    const val = inputValue >> 0;

    // 反例
    const val = parseInt(inputValue);

    // 推荐
    const val = Number(inputValue);

    // 推荐
    const val = parseInt(inputValue, 10);

```

*   [22.4](#coercion--comment-deviations) 如果因为某些原因 `parseInt` 成为你所做的事的瓶颈而需要使用位操作解决[性能问题](https://jsperf.com/coercion-vs-casting/3)时，留个注释说清楚原因和你的目的。

```
    // 推荐
    /**
     * parseInt was the reason my code was slow.
     * Bitshifting the String to coerce it to a
     * Number made it a lot faster.
     */
    const val = inputValue >> 0;

```

*   [22.5](#coercion--bitwise) **注**: 小心使用位操作运算符。数字会被当成 [64位值](https://es5.github.io/#x4.3.19)，但是位操作运算符总是返回32位的整数（[参考](https://es5.github.io/#x11.7)）。位操作处理大于32位的整数值时还会导致意料之外的行为。关于这个问题的[讨论](https://github.com/airbnb/javascript/issues/109)。最大的32位整数是 2,147,483,647：

```
    2147483647 >> 0 //=> 2147483647
    2147483648 >> 0 //=> -2147483648
    2147483649 >> 0 //=> -2147483647

```

*   [22.6](#coercion--booleans) 布尔:

```
    const age = 0;

    // 反例
    const hasAge = new Boolean(age);

    // 推荐
    const hasAge = Boolean(age);

    // 最好
    const hasAge = !!age;

```

**[⬆ back to top](#table-of-contents)**

## [](#naming-conventions) 命名规则

*   [23.1](#naming--descriptive) 避免单字母命名。命名应具备描述性。eslint: [`id-length`](http://eslint.org/docs/rules/id-length)

```
    // 反例
    function q() {
      // ...
    }

    // 推荐
    function query() {
      // ...
    }

```

*   [23.2](#naming--camelCase) 使用驼峰式命名对象、函数和实例。eslint: [`camelcase`](http://eslint.org/docs/rules/camelcase.html) jscs: [`requireCamelCaseOrUpperCaseIdentifiers`](http://jscs.info/rule/requireCamelCaseOrUpperCaseIdentifiers)

```
    // 反例
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}

    // 推荐
    const thisIsMyObject = {};
    function thisIsMyFunction() {}

```

*   [23.3](#naming--PascalCase) 使用帕斯卡式命名构造函数或类。 eslint: [`new-cap`](http://eslint.org/docs/rules/new-cap.html) jscs: [`requireCapitalizedConstructors`](http://jscs.info/rule/requireCapitalizedConstructors)

```
    // 反例
    function user(options) {
      this.name = options.name;
    }

    const bad = new user({
      name: 'nope',
    });

    // 推荐
    class User {
      constructor(options) {
        this.name = options.name;
      }
    }

    const good = new User({
      name: 'yup',
    });

```

*   [23.4](#naming--leading-underscore) 不要用前置或者后置的下划线命名私有属性。 eslint: [`no-underscore-dangle`](http://eslint.org/docs/rules/no-underscore-dangle.html) jscs: [`disallowDanglingUnderscores`](http://jscs.info/rule/disallowDanglingUnderscores)

> 为什么？JavaScript 没有私有属性或者私有方法的概念。虽然前面加下划线是一个常见的约定，意思是“私有”，事实上，这些属性是完全公开的，因此，是您的公共API合同的一部分。 这个约定可能会导致开发人员错误地认为更改不会被视为破坏，或者不需要测试。 简练点说，就是：如果你想要的东西是“私有的”，它的存在不能可观察到。

```
    // 反例
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';
    this._firstName = 'Panda';

    // 推荐
    this.firstName = 'Panda';

```

*   [23.5](#naming--self-this) 别保存 `this` 的引用。使用箭头函数或 [Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)。 jscs: [`disallowNodeTypes`](http://jscs.info/rule/disallowNodeTypes)

```
    // 反例
    function foo() {
      const self = this;
      return function () {
        console.log(self);
      };
    }

    // 反例
    function foo() {
      const that = this;
      return function () {
        console.log(that);
      };
    }

    // 推荐
    function foo() {
      return () => {
        console.log(this);
      };
    }

```

*   [23.6](#naming--filename-matches-export) 如果你的文件只输出一个类，那你的文件名必须和类名完全保持一致。

```
    // 文件 1 内容
    class CheckBox {
      // ...
    }
    export default CheckBox;

    // 文件 2 内容
    export default function fortyTwo() { return 42; }

    // 文件 3 内容
    export default function insideDirectory() {}

    // 另外的文件
    // 反例
    import CheckBox from './checkBox'; // import/export 使用帕斯卡命名法, 文件名使用驼峰命名法
    import FortyTwo from './FortyTwo'; // import/文件名 使用帕斯卡命名法， export 使用驼峰命名法
    import InsideDirectory from './InsideDirectory'; // import/文件名 使用帕斯卡命名法, export 使用驼峰命名法

    // 反例
    import CheckBox from './check_box'; // import/export使用帕斯卡命名法， 文件名使用下划线
    import forty_two from './forty_two'; // import/文件名 使用下划线， export 使用驼峰命名法
    import inside_directory from './inside_directory'; // import 使用下划线， export 使用驼峰命名法
    import index from './inside_directory/index'; // 明显的导入了 index 文件
    import insideDirectory from './insideDirectory/index'; // 明显的导入了 index 文件

    // 推荐
    import CheckBox from './CheckBox'; // export/import/文件名 使用帕斯卡命名法
    import fortyTwo from './fortyTwo'; // export/import/文件名 使用驼峰命名法
    import insideDirectory from './insideDirectory'; // export/import/文件夹名/隐藏 "index"
    // ^ insideDirectory.js 和 insideDirectory/index.js 都支持

```

*   [23.7](#naming--camelCase-default-export) 当你导出默认的函数时使用驼峰式命名。你的文件名必须和函数名完全保持一致。

```
    function makeStyleGuide() {
      // ...
    }

    export default makeStyleGuide;

```

*   [23.8](#naming--PascalCase-singleton) 当你导出单例、类、函数库、空对象时使用帕斯卡式命名。

```
    const AirbnbStyleGuide = {
      es6: {
      }
    };

    export default AirbnbStyleGuide;

```

*   [23.9](#naming--Acronyms-and-Initialisms) 首字母缩略词应该全部大写，或者全部小写。

> Why? Names are for readability, not to appease a computer algorithm.

```
    // 反例
    import SmsContainer from './containers/SmsContainer';

    // 反例
    const HttpRequests = [
      // ...
    ];

    // 推荐
    import SMSContainer from './containers/SMSContainer';

    // 推荐
    const HTTPRequests = [
      // ...
    ];

    // 最好
    import TextMessageContainer from './containers/TextMessageContainer';

    // 最好
    const Requests = [
      // ...
    ];

```

**[⬆ back to top](#table-of-contents)**

## [](#accessors) 存取器

*   [24.1](#accessors--not-required) 属性的存取函数不是必须的。

*   [24.2](#accessors--no-getters-setters) 不要使用JavaScript `getters` / `setter`，因为它们会导致意想不到的副作用，并且更难测试，维护和寻找出错的原因。 相反的, 如果你需要存取函数时使用 `getVal()` 和 `setVal('hello')`。

```
    // 反例
    class Dragon {
      get age() {
        // ...
      }

      set age(value) {
        // ...
      }
    }

    // 推荐
    class Dragon {
      getAge() {
        // ...
      }

      setAge(value) {
        // ...
      }
    }

```

*   [24.3](#accessors--boolean-prefix) 如果属性是布尔值，使用 `isVal()` 或 `hasVal()`。

```
    // 反例
    if (!dragon.age()) {
      return false;
    }

    // 推荐
    if (!dragon.hasAge()) {
      return false;
    }

```

*   [24.4](#accessors--consistent) 创建 `get()` 和 `set()` 函数是可以的，但要保持一致。

```
    class Jedi {
      constructor(options = {}) {
        const lightsaber = options.lightsaber || 'blue';
        this.set('lightsaber', lightsaber);
      }

      set(key, val) {
        this[key] = val;
      }

      get(key) {
        return this[key];
      }
    }

```

**[⬆ back to top](#table-of-contents)**

## [](#events) 事件

*   [25.1](#events--hash) 当给事件附加数据时（无论是 DOM 事件还是私有事件），传入一个哈希而不是原始值。这样可以让后面的贡献者增加更多数据到事件数据而无需找出并更新事件的每一个处理器。例如，不好的写法：

```
    // 反例
    $(this).trigger('listingUpdated', listing.id);

    ...

    $(this).on('listingUpdated', (e, listingId) => {
      // do something with listingId
    });

```

prefer:

```
    // 推荐
    $(this).trigger('listingUpdated', { listingId: listing.id });

    ...

    $(this).on('listingUpdated', (e, data) => {
      // do something with data.listingId
    });

```

**[⬆ back to top](#table-of-contents)**

## [](#jquery)jQuery

*   [26.1](#jquery--dollar-prefix) 使用 `$` 作为存储 jQuery 对象的变量名前缀。 jscs: [`requireDollarBeforejQueryAssignment`](http://jscs.info/rule/requireDollarBeforejQueryAssignment)

```
    // 反例
    const sidebar = $('.sidebar');

    // 推荐
    const $sidebar = $('.sidebar');

    // 推荐
    const $sidebarBtn = $('.sidebar-btn');

```

*   [26.2](#jquery--cache)  缓存 jQuery 查询。

```
    // 反例
    function setSidebar() {
      $('.sidebar').hide();

      // ...

      $('.sidebar').css({
        'background-color': 'pink'
      });
    }

    // 推荐
    function setSidebar() {
      const $sidebar = $('.sidebar');
      $sidebar.hide();

      // ...

      $sidebar.css({
        'background-color': 'pink'
      });
    }

```

*   [26.3](#jquery--queries) 对 DOM 查询使用层叠 `$('.sidebar ul')` 或 父元素 > 子元素 `$('.sidebar > ul')`。 [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)

*   [25.4](#jquery--find) 对有作用域的 jQuery 对象查询使用 `find`。

```
    // 反例
    $('ul', '.sidebar').hide();

    // 反例
    $('.sidebar').find('ul').hide();

    // 推荐
    $('.sidebar ul').hide();

    // 推荐
    $('.sidebar > ul').hide();

    // 推荐
    $sidebar.find('ul').hide();

```

**[⬆ back to top](#table-of-contents)**

## [](#ecmascript-5-compatibility)ECMAScript 5 Compatibility

*   [27.1](#es5-compat--kangax) 参考 [Kangax](https://twitter.com/kangax/)的 ES5 [兼容性](https://kangax.github.io/es5-compat-table/).

**[⬆ back to top](#table-of-contents)**

## [](#ecmascript-6-es-2015-styles) ECMAScript 6+ (ES 2015+) 规范

*   [28.1](#es6-styles)  以下是链接到 ES6+ 的各个特性的列表。

*   [Arrow Functions](#arrow-functions)

*   [Classes](#classes--constructors)

*   [Object Shorthand](#es6-object-shorthand)

*   [Object Concise](#es6-object-concise)

*   [Object Computed Properties](#es6-computed-properties)

*   [Template Strings](#es6-template-literals)

*   [Destructuring](#destructuring)

*   [Default Parameters](#es6-default-parameters)

*   [Rest](#es6-rest)

*   [Array Spreads](#es6-array-spreads)

*   [Let and Const](#references)
* [Exponentiation Operator](#es2016-properties--exponentiation-operator)

*   [Iterators and Generators](#iterators-and-generators)

*   [Modules](#modules)

*   [28.2](#tc39-proposals) Do not use [TC39 proposals](https://github.com/tc39/proposals) that have not reached stage 3.

> Why? [They are not finalized](https://tc39.github.io/process-document/), and they are subject to change or to be withdrawn entirely. We want to use JavaScript, and proposals are not JavaScript yet.

**[⬆ back to top](#table-of-contents)**

## [](#testing)测试

*   [29.1](#testing--yup) **Yup.**

```
    function foo() {
      return true;
    }

```

*   [29.2](#testing--for-real) **No, but seriously**:

*   Whichever testing framework you use, you should be writing tests!

*   Strive to write many small pure functions, and minimize where mutations occur.

*   Be cautious about stubs and mocks - they can make your tests more brittle.

*   We primarily use [`mocha`](https://www.npmjs.com/package/mocha) at Airbnb. [`tape`](https://www.npmjs.com/package/tape) is also used occasionally for small, separate modules.

*   100% test coverage is a good goal to strive for, even if it's not always practical to reach it.

*   Whenever you fix a bug, _write a regression test_. A bug fixed without a regression test is almost certainly going to break again in the future.

**[⬆ back to top](#table-of-contents)**

## [](#performance) 性能

*   [On Layout & Web Performance](https://www.kellegous.com/j/2013/01/26/layout-performance/)

*   [String vs Array Concat](https://jsperf.com/string-vs-array-concat/2)

*   [Try/Catch Cost In a Loop](https://jsperf.com/try-catch-in-loop-cost)

*   [Bang Function](https://jsperf.com/bang-function)

*   [jQuery Find vs Context, Selector](https://jsperf.com/jquery-find-vs-context-sel/13)

*   [innerHTML vs textContent for script text](https://jsperf.com/innerhtml-vs-textcontent-for-script-text)

*   [Long String Concatenation](https://jsperf.com/ya-string-concat)

*   [Are Javascript functions like `map()`, `reduce()`, and `filter()` optimized for traversing arrays?](https://www.quora.com/JavaScript-programming-language-Are-Javascript-functions-like-map-reduce-and-filter-already-optimized-for-traversing-array/answer/Quildreen-Motta)

*   Loading...

**[⬆ back to top](#table-of-contents)**

## [](#resources)资源

**学习 ES6**

*   [Draft ECMA 2015 (ES6) Spec](https://people.mozilla.org/%7Ejorendorff/es6-draft.html)

*   [ExploringJS](http://exploringjs.com/)

*   [ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/)

*   [Comprehensive Overview of ES6 Features](http://es6-features.org/)

**阅读这里**

*   [Standard ECMA-262](http://www.ecma-international.org/ecma-262/6.0/index.html)

**工具**

*   Code Style Linters

*   - [ESlint](http://eslint.org/) - [Airbnb Style .eslintrc](https://github.com/airbnb/javascript/blob/master/linters/.eslintrc)
    - [JSHint](http://jshint.com/) - [Airbnb Style .jshintrc](https://github.com/airbnb/javascript/blob/master/linters/.jshintrc)
    - [JSCS](https://github.com/jscs-dev/node-jscs) - [Airbnb Style Preset](https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json) (Deprecated, please use [ESlint](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base))
  - Neutrino preset - [neutrino-preset-airbnb-base](https://neutrino.js.org/presets/neutrino-preset-airbnb-base/)

**其他的风格指南**

*   [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)

*   [jQuery Core Style Guidelines](https://contribute.jquery.org/style-guide/js/)

*   [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)

**其他风格**

*   [Naming this in nested functions](https://gist.github.com/cjohansen/4135065) - Christian Johansen

*   [Conditional Callbacks](https://github.com/airbnb/javascript/issues/52) - Ross Allen

*   [Popular JavaScript Coding Conventions on GitHub](http://sideeffect.kr/popularconvention/#javascript) - JeongHoon Byun

*   [Multiple var statements in JavaScript, not superfluous](http://benalman.com/news/2012/05/multiple-var-statements-javascript/) - Ben Alman

**进一步阅读**

*   [Understanding JavaScript Closures](https://javascriptweblog.wordpress.com/2010/10/25/understanding-javascript-closures/) - Angus Croll

*   [Basic JavaScript for the impatient programmer](http://www.2ality.com/2013/06/basic-javascript.html) - Dr. Axel Rauschmayer

*   [You Might Not Need jQuery](http://youmightnotneedjquery.com/) - Zack Bloom & Adam Schwartz

*   [ES6 Features](https://github.com/lukehoban/es6features) - Luke Hoban

*   [Frontend Guidelines](https://github.com/bendc/frontend-guidelines) - Benjamin De Cock

**书籍**

*   [JavaScript: The Good Parts](https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) - Douglas Crockford

*   [JavaScript Patterns](https://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752) - Stoyan Stefanov

*   [Pro JavaScript Design Patterns](https://www.amazon.com/JavaScript-Design-Patterns-Recipes-Problem-Solution/dp/159059908X)  - Ross Harmes and Dustin Diaz

*   [High Performance Web Sites: Essential Knowledge for Front-End Engineers](https://www.amazon.com/High-Performance-Web-Sites-Essential/dp/0596529309) - Steve Souders

*   [Maintainable JavaScript](https://www.amazon.com/Maintainable-JavaScript-Nicholas-C-Zakas/dp/1449327680) - Nicholas C. Zakas

*   [JavaScript Web Applications](https://www.amazon.com/JavaScript-Web-Applications-Alex-MacCaw/dp/144930351X) - Alex MacCaw

*   [Pro JavaScript Techniques](https://www.amazon.com/Pro-JavaScript-Techniques-John-Resig/dp/1590597273) - John Resig

*   [Smashing Node.js: JavaScript Everywhere](https://www.amazon.com/Smashing-Node-js-JavaScript-Everywhere-Magazine/dp/1119962595) - Guillermo Rauch

*   [Secrets of the JavaScript Ninja](https://www.amazon.com/Secrets-JavaScript-Ninja-John-Resig/dp/193398869X) - John Resig and Bear Bibeault

*   [Human JavaScript](http://humanjavascript.com/) - Henrik Joreteg

*   [Superhero.js](http://superherojs.com/) - Kim Joar Bekkelund, Mads Mobæk, & Olav Bjorkoy

*   [JSBooks](http://jsbooks.revolunet.com/) - Julien Bouquillon

*   [Third Party JavaScript](https://www.manning.com/books/third-party-javascript) - Ben Vinegar and Anton Kovalyov

*   [Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript](http://amzn.com/0321812182) - David Herman

*   [Eloquent JavaScript](http://eloquentjavascript.net/) - Marijn Haverbeke

*   [You Don't Know JS: ES6 & Beyond](http://shop.oreilly.com/product/0636920033769.do) - Kyle Simpson

**博客**

*   [JavaScript Weekly](http://javascriptweekly.com/)

*   [JavaScript, JavaScript...](https://javascriptweblog.wordpress.com/)

*   [Bocoup Weblog](https://bocoup.com/weblog)

*   [Adequately Good](http://www.adequatelygood.com/)

*   [NCZOnline](https://www.nczonline.net/)

*   [Perfection Kills](http://perfectionkills.com/)

*   [Ben Alman](http://benalman.com/)

*   [Dmitry Baranovskiy](http://dmitry.baranovskiy.com/)

*   [Dustin Diaz](http://dustindiaz.com/)

*   [nettuts](http://code.tutsplus.com/?s=javascript)

**Podcasts**

*   [JavaScript Air](https://javascriptair.com/)

*   [JavaScript Jabber](https://devchat.tv/js-jabber/)

**[⬆ 返回顶部 ](#table-of-contents)**

## [](#in-the-wild) 使用人群

下面是使用这份风格指南的组织清单。给我们发送pull request ，我们将把你的组织添加到这份清单里。

*   **3blades**: [3Blades/javascript](https://github.com/3blades/javascript)

*   **4Catalyzer**: [4Catalyzer/javascript](https://github.com/4Catalyzer/javascript)

*   **Aan Zee**: [AanZee/javascript](https://github.com/AanZee/javascript)

*   **Adult Swim**: [adult-swim/javascript](https://github.com/adult-swim/javascript)

*   **Airbnb**: [airbnb/javascript](https://github.com/airbnb/javascript)

**AltSchool**: [AltSchool/javascript](https://github.com/AltSchool/javascript)

*   **Apartmint**: [apartmint/javascript](https://github.com/apartmint/javascript)

*   **Ascribe**: [ascribe/javascript](https://github.com/ascribe/javascript)

*   **Avalara**: [avalara/javascript](https://github.com/avalara/javascript)

*   **Avant**: [avantcredit/javascript](https://github.com/avantcredit/javascript)
* **Axept**: [axept/javascript](https://github.com/axept/javascript)

*   **BashPros**: [BashPros/javascript](https://github.com/BashPros/javascript)

*   **Billabong**: [billabong/javascript](https://github.com/billabong/javascript)

*   **Bisk**: [bisk/javascript](https://github.com/Bisk/javascript/)


*   **Bonhomme**: [bonhommeparis/javascript](https://github.com/bonhommeparis/javascript)

*   **Brainshark**: [brainshark/javascript](https://github.com/brainshark/javascript)
* **CaseNine**: [CaseNine/javascript](https://github.com/CaseNine/javascript)

*   **Chartboost**: [ChartBoost/javascript-style-guide](https://github.com/ChartBoost/javascript-style-guide)

*   **ComparaOnline**: [comparaonline/javascript](https://github.com/comparaonline/javascript-style-guide)

*   **Compass Learning**: [compasslearning/javascript-style-guide](https://github.com/compasslearning/javascript-style-guide)

*   **DailyMotion**: [dailymotion/javascript](https://github.com/dailymotion/javascript)

*   **DoSomething**: [DoSomething/eslint-config](https://github.com/DoSomething/eslint-config)

*   **Digitpaint** [digitpaint/javascript](https://github.com/digitpaint/javascript)

*   **Ecosia**: [ecosia/javascript](https://github.com/ecosia/javascript)

*   **Evernote**: [evernote/javascript-style-guide](https://github.com/evernote/javascript-style-guide)

*   **Evolution Gaming**: [evolution-gaming/javascript](https://github.com/evolution-gaming/javascript)

*   **EvozonJs**: [evozonjs/javascript](https://github.com/evozonjs/javascript)

*   **ExactTarget**: [ExactTarget/javascript](https://github.com/ExactTarget/javascript)

*   **Expensify** [Expensify/Style-Guide](https://github.com/Expensify/Style-Guide/blob/master/javascript.md)

*   **Flexberry**: [Flexberry/javascript-style-guide](https://github.com/Flexberry/javascript-style-guide)

*   **Gawker Media**: [gawkermedia/javascript](https://github.com/gawkermedia/javascript)

*   **General Electric**: [GeneralElectric/javascript](https://github.com/GeneralElectric/javascript)
* **Generation Tux**: [GenerationTux/javascript](https://github.com/generationtux/styleguide)

*   **GoodData**: [gooddata/gdc-js-style](https://github.com/gooddata/gdc-js-style)

*   **Grooveshark**: [grooveshark/javascript](https://github.com/grooveshark/javascript)
* **Honey**: [honeyscience/javascript](https://github.com/honeyscience/javascript)

*   **How About We**: [howaboutwe/javascript](https://github.com/howaboutwe/javascript-style-guide)

*   **Huballin**: [huballin/javascript](https://github.com/huballin/javascript)

*   **HubSpot**: [HubSpot/javascript](https://github.com/HubSpot/javascript)

*   **Hyper**: [hyperoslo/javascript-playbook](https://github.com/hyperoslo/javascript-playbook/blob/master/style.md)

**InterCity Group**: [intercitygroup/javascript-style-guide](https://github.com/intercitygroup/javascript-style-guide)

*   **Jam3**: [Jam3/Javascript-Code-Conventions](https://github.com/Jam3/Javascript-Code-Conventions)

*   **JeopardyBot**: [kesne/jeopardy-bot](https://github.com/kesne/jeopardy-bot/blob/master/STYLEGUIDE.md)

*   **JSSolutions**: [JSSolutions/javascript](https://github.com/JSSolutions/javascript)

*   **KickorStick**: [kickorstick/javascript](https://github.com/kickorstick/javascript)

*   **Kinetica Solutions**: [kinetica/javascript](https://github.com/kinetica/Javascript-style-guide)
* **LEINWAND**: [LEINWAND/javascript](https://github.com/LEINWAND/javascript)

*   **Lonely Planet**: [lonelyplanet/javascript](https://github.com/lonelyplanet/javascript)

*   **M2GEN**: [M2GEN/javascript](https://github.com/M2GEN/javascript)

*   **Mighty Spring**: [mightyspring/javascript](https://github.com/mightyspring/javascript)

*   **MinnPost**: [MinnPost/javascript](https://github.com/MinnPost/javascript)

*   **MitocGroup**: [MitocGroup/javascript](https://github.com/MitocGroup/javascript)

*   **ModCloth**: [modcloth/javascript](https://github.com/modcloth/javascript)

*   **Money Advice Service**: [moneyadviceservice/javascript](https://github.com/moneyadviceservice/javascript)

*   **Muber**: [muber/javascript](https://github.com/muber/javascript)

*   **National Geographic**: [natgeo/javascript](https://github.com/natgeo/javascript)


*   **Nimbl3**: [nimbl3/javascript](https://github.com/nimbl3/javascript)

*   **Nulogy**: [nulogy/javascript](https://github.com/nulogy/javascript)
* **Orange Hill Development**: [orangehill/javascript](https://github.com/orangehill/javascript)

*   **Orion Health**: [orionhealth/javascript](https://github.com/orionhealth/javascript)

*   **OutBoxSoft**: [OutBoxSoft/javascript](https://github.com/OutBoxSoft/javascript)

*   **Peerby**: [Peerby/javascript](https://github.com/Peerby/javascript)

*   **Razorfish**: [razorfish/javascript-style-guide](https://github.com/razorfish/javascript-style-guide)

*   **reddit**: [reddit/styleguide/javascript](https://github.com/reddit/styleguide/tree/master/javascript)

**React**: [facebook.github.io/react/contributing/how-to-contribute.html#style-guide](https://facebook.github.io/react/contributing/how-to-contribute.html#style-guide)
*   **REI**: [reidev/js-style-guide](https://github.com/rei/code-style-guides/blob/master/docs/javascript.md)

*   **Ripple**: [ripple/javascript-style-guide](https://github.com/ripple/javascript-style-guide)
**Sainsbury's Supermarkets**: [github/jsainsburyplc](https://github.com/jsainsburyplc)
*   **SeekingAlpha**: [seekingalpha/javascript-style-guide](https://github.com/seekingalpha/javascript-style-guide)

*   **Shutterfly**: [shutterfly/javascript](https://github.com/shutterfly/javascript)
* **Sourcetoad**: [sourcetoad/javascript](https://github.com/sourcetoad/javascript)

*   **Springload**: [springload/javascript](https://github.com/springload/javascript)

*   **StratoDem Analytics**: [stratodem/javascript](https://github.com/stratodem/javascript)

*   **SteelKiwi Development**: [steelkiwi/javascript](https://github.com/steelkiwi/javascript)

*   **StudentSphere**: [studentsphere/javascript](https://github.com/studentsphere/guide-javascript)

*   **SwoopApp**: [swoopapp/javascript](https://github.com/swoopapp/javascript)

*   **SysGarage**: [sysgarage/javascript-style-guide](https://github.com/sysgarage/javascript-style-guide)

*   **Syzygy Warsaw**: [syzygypl/javascript](https://github.com/syzygypl/javascript)

*   **Target**: [target/javascript](https://github.com/target/javascript)

*   **TheLadders**: [TheLadders/javascript](https://github.com/TheLadders/javascript)

*   **The Nerdery**: [thenerdery/javascript-standards](https://github.com/thenerdery/javascript-standards)

*   **T4R Technology**: [T4R-Technology/javascript](https://github.com/T4R-Technology/javascript)

*   **VoxFeed**: [VoxFeed/javascript-style-guide](https://github.com/VoxFeed/javascript-style-guide)

*   **WeBox Studio**: [weboxstudio/javascript](https://github.com/weboxstudio/javascript)

*   **Weggo**: [Weggo/javascript](https://github.com/Weggo/javascript)

*   **Zillow**: [zillow/javascript](https://github.com/zillow/javascript)

*   **ZocDoc**: [ZocDoc/javascript](https://github.com/ZocDoc/javascript)

**[⬆ back to top](#table-of-contents)**

## Translation

  This style guide is also available in other languages:

  - ![br](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Brazilian Portuguese**: [armoucar/javascript-style-guide](https://github.com/armoucar/javascript-style-guide)
  - ![bg](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Bulgaria.png) **Bulgarian**: [borislavvv/javascript](https://github.com/borislavvv/javascript)
  - ![ca](https://raw.githubusercontent.com/fpmweb/javascript-style-guide/master/img/catala.png) **Catalan**: [fpmweb/javascript-style-guide](https://github.com/fpmweb/javascript-style-guide)
  - ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: [sivan/javascript-style-guide](https://github.com/sivan/javascript-style-guide)
  - ![tw](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Taiwan.png) **Chinese (Traditional)**: [jigsawye/javascript](https://github.com/jigsawye/javascript)
  - ![fr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/France.png) **French**: [nmussy/javascript-style-guide](https://github.com/nmussy/javascript-style-guide)
  - ![de](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Germany.png) **German**: [timofurrer/javascript-style-guide](https://github.com/timofurrer/javascript-style-guide)
  - ![it](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Italy.png) **Italian**: [sinkswim/javascript-style-guide](https://github.com/sinkswim/javascript-style-guide)
  - ![jp](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Japanese**: [mitsuruog/javascript-style-guide](https://github.com/mitsuruog/javascript-style-guide)
  - ![kr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) **Korean**: [tipjs/javascript-style-guide](https://github.com/tipjs/javascript-style-guide)
  - ![pl](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Poland.png) **Polish**: [mjurczyk/javascript](https://github.com/mjurczyk/javascript)
  - ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Russian**: [leonidlebedev/javascript-airbnb](https://github.com/leonidlebedev/javascript-airbnb)
  - ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Spanish**: [paolocarrasco/javascript-style-guide](https://github.com/paolocarrasco/javascript-style-guide)
  - ![th](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Thailand.png) **Thai**: [lvarayut/javascript-style-guide](https://github.com/lvarayut/javascript-style-guide)
  - ![ua](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Ukraine.png) **Ukrainian**: [ivanzusko/javascript](https://github.com/ivanzusko/javascript)
  - ![vn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Vietnam.png) **Vietnam**: [hngiang/javascript-style-guide](https://github.com/hngiang/javascript-style-guide)

## The JavaScript Style Guide Guide

  - [Reference](https://github.com/airbnb/javascript/wiki/The-JavaScript-Style-Guide-Guide)

## Chat With Us About JavaScript

  - Find us on [gitter](https://gitter.im/airbnb/javascript).

## Contributors

  - [View Contributors](https://github.com/airbnb/javascript/graphs/contributors)

## License

(The MIT License)

Copyright (c) 2014-2017 Airbnb

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**[⬆ back to top](#table-of-contents)**

## Amendments

We encourage you to fork this guide and change the rules to fit your team’s style guide. Below, you may list some amendments to the style guide. This allows you to periodically update your style guide without having to deal with merge conflicts.

# };
