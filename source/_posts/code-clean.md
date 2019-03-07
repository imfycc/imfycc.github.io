---
title: 代码整洁之道
date: 2018-12-02 00:05:52
updated: 2018-12-15 00:05:52
tags:
categories: 编程
---

> 学习和实践过程中，如果遇到其他的内容，我会逐渐完善这篇文章。以致于写出更好的代码。

> 以下内容选自 《代码整洁之道》 和 《重构》

沃德原则：“如果每个例程都让你感到深合己意，那就是整洁代码。

代码应当讲述事实，不引人猜测。

软件项目的主要成本在于长期维护。所以，代码应当清晰地表达其作者的意图。作者把代码写得越清晰，其他人花在理解代码上的时间也就越少，从而减少缺陷，缩减维护成本。

写整洁代码，需要遵循大量的小技巧，贯彻刻苦习得的“整洁感”。

## 通用规则

* 别重复自己的代码。

### 命名

* 有意义的命名。

      让读代码的人，一下看到变量名、文件名、函数名，就知道这是做什么的。

      比如写了一个函数，里面的每一个命名，都可以让大家明白这个语句是做什么的。

* 提防使用不同之处较小的名称。

      补全的时候不方便。

      也难以区分。


* 类名和对象名应该是名词或名词短语，不应该使用动词。

* 方法名应该是动词或者动词短语。

### 函数

* 函数要保持短小，20行封顶最佳。

* 函数应该只做一件事。

      要判断函数是否不止做了一件事，办法就是看是否能再拆出一个函数。
      函数承诺只做一件事，但还是会做其他被藏起来的事。
      有时，它会对自己类中的变量做出未能预期的改动。
      有时，它会把变量搞成向函数传递的参数或是系统全局变量。
      无论哪种情况，都是具有破坏性的，会导致古怪的时序性耦合及顺序依赖。

      函数要么做什么事，要么回答什么事，但二者不可得兼。
      函数应该修改某对象的状态，或是返回该对象的有关信息。
      两样都干常会导致混乱。

* 无副作用。

* 自顶向下读代码：向下规则。
      
      我们想要让每个函数后面都跟着位于下一抽象层级的函数，这样在查看函数列表时，就能偱抽象层级向下阅读了。

* 函数越短小、功能越集中，就越便于取个好名字。

* 参数应该尽量少，最理想的参数数量是零（零参数函数）。

      1、参数需要理解
      2、从测试的角度看，参数叫人为难。要编写能确保参数的各种组合运行正常的测试用例，是多么困难的事。

* 给函数取个好名字，能较好地解释函数的意图，以及参数的顺序和意图。

      对于一元函数，函数和参数应当形成一种非常良好的动词/名词对形式。例如，write(name) 就相当令人认同。不管这个 name 是什么，都要被 write。

> 写代码和写别的东西很像。在写论文或文章时，你先想什么就写什么，然后再打磨它。初稿也许粗陋无序，你就斟酌推敲，直至达到你心目中的样子。我写函数时，一开始都冗长而复杂。有太多缩进和嵌套循环。有过长的参数列表。名称是随意取的，也会有重复的代码。不过我会配上一套单元测试，覆盖每行丑陋的代码。然后我打磨这些代码，分解函数、修改名称、消除重复。我缩短和重新安置方法。有时我还拆散类。同时保持测试通过。最后，遵循本章列出的规则，我组装好这些函数。我并不从一开始就按照规则写函数。我想没人做得到。

## 注释

如果你发现自己需要写注释，再想想看是否有办法翻盘，用代码来表达。每次用代码表达，你都该夸奖一下自己。每次写注释，你都该做个鬼脸，感受自己在表达能力上的失败。

## 代码格式

代码格式关乎沟通，而沟通是专业开发者的头等大事。 

这说明，应该尽力保持代码行短小。死守80个字符的上限有点僵化，而且我也并不反对代码行长度达到100个字符或120个字符。

## 类

* 类应该短小。

* 类的名称应当描述其权责。
        
      实际上，命名正是帮助判断类的长度的第一个手段。如果无法为某个类命以精确的名称，这个类大概就太长了。类名越含混，该类越有可能拥有过多权责。

* 类只应有一个权责——只有一条修改的理由。

      单一权责原则（SRP）[2]认为，类或模块应有且只有一条加以修改的理由。该原则既给出了权责的定义，又是关于类的长度的指导方针。

      系统应该由许多短小的类而不是少量巨大的类组成。每个小类封装一个权责，只有一个修改的原因，并与少数其他类一起协同达成期望的系统行为。

如开放-闭合原则（OCP）：类应当对扩展开放，对修改封闭。

只要遵循以下规则，设计就能变得“简单”：
- 运行所有测试；
- 不可重复；
- 表达了程序员的意图；
- 尽可能减少类和方法的数量；

以上规则按其重要程度排列。

只要系统可测试，就会导向保持类短小且目的单一的设计方案。遵循SRP的类，测试起来较为简单。测试编写得越多，就越能持续走向编写较易测试的代码。所以，确保系统完全可测试能帮助我们创建更好的设计。

有了测试，就能保持代码和类的整洁，方法就是递增式地重构代码。添加了几行代码后，就要暂停，琢磨一下变化了的设计。设计退步了吗？如果是，就要清理它，并且运行测试，保证没有破坏任何东西。测试消除了对清理代码就会破坏代码的恐惧。

## 重构

本质上说，重构就是「在代码写好之后改进它的设计」。

### 重构的第一步

每当要进行重构的时候，第一个步骤永远相同：我得为即将修改的代码建立一组可靠的测试环境。这些测试是必要的，因为尽管遵循重构准则可以使我避免绝大多数的 bug 引入机会，但我毕竞是人，毕竟有可能犯错。所以我需要可靠的测试。

重构技术系以微小的步伐修改程序。如果你犯下错误，很容易便可发现它。

### 重构的节奏

测试、小修改、测试、小修改、测试、小修改……。正是这种节奏让重构得以快速而安全地前进。

### 何时重构

三次法则
Don Roberts给了我一条准则：第一次做某件事时只管去做；第二次做类似的事会产生反感，但无论如何还是做了；第三次再做类似的事，你就应该重构。

Tip: 事不过三，三则重构（Three strikes and you refactor）

添加功能时一并重构

修补错误吋一并重构

复审代码吋一并重构


我们都曾经说过有朝一日再回头清理。当然，在那些日子里，我们都没听过勒布朗（LeBlanc）法则：稍后等于永不（Later equals never）。

所以，多少尊重一下你的手艺吧。花一点点时间在每个函数和类上。选用较好的名称，将大函数切分为小函数，时时照拂自己创建的东西。用心是最珍贵的资源。