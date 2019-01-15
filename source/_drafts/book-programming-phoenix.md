---
title: 《Programming Phoenix》读书笔记
date: 2018-08-05 08:42:11
updated: 2018-08-05 08:42:11
tags:
categories: 编程
---

> Every twenty years or so, new programming paradigms emerge. The industry is currently in the midst of a shift from object-oriented programming to functional programming. 

编程范式真的是在从面向对象向函数式编程过渡吗？有待考究。

> Phoenix measures response times in microseconds, and it has been shown to handle millions of concurrent WebSocket connections on a single machine without sacrificing the productivity we’ve come to appreciate.
> phoenix以微秒为单位测量响应时间，并且已经证明它可以在一台机器上处理数百万个并发web socket连接，而不会牺牲我们已经开始欣赏的生产力。

Elixir 是一门函数式编程的动态语言，建立在经过30年实战考验的 Erlang 虚拟机上。

> You’ll see a syntax that provides Clojure-style metaprogramming on syntax that we think is richer and cleaner than Scala’s. 
> 
> 你会看到一种语法，它提供了语法上的Clojure风格的元编程，我们认为它比Scala更丰富，更清晰。
> 
> Simply put, Phoenix is about fast, concurrent, beautiful, interactive, and reliable applications.
> 简而言之，Phoenix是一个快速、并发、美观、交互和可靠的应用程序。

**Fast**
* Erlang has a great model for concurrency. Facebook bought WhatsApp for $21 billion. That application achieved two million concurrently running connections on a single node.
* The router compiles down to the cat-quick pattern matching. You won’t have to spend days on performance tuning before you even leave the routing layer.
* Templates are precompiled. Phoenix doesn’t need to copy strings for each rendered template. At the hardware level, you’ll see caching come into play for these strings where it never did before.
* Functional languages do better on the web. 

**Concurrency**
In fact, many people that come to Phoenix find us precisely because concurrency is so easy.

语言层面的多核并发任务处理能力

宏和并发，之后要试一下

> None of them comes with the simple guarantees that Phoenix has: isolation and concurrency. Isolation guarantees that if a bug affects one channel, all other channels continue running. Breaking one feature won’t bleed into other site functionality. Concurrency means one channel can never block another one, whether code is waiting on the database or crunching data. This key advantage means that the UI never becomes unresponsive because the user started a heavy action. 
> 


connection
|> endpoint()
|> router()
|> pipelines()
|> controller()

Endpoints are the chain of functions at the beginning of each request.

Let’s also install Hex, Elixir’s package manager:
$ mix local.hex
* creating ~/.mix/archives/hex-0.10.4.ez


mix phx.new hello

$ cd hello
$ mix ecto.create
$ mix phx.server


$ iex -S mix phx.server

Atom Keys vs. String Keys?
 
In the world action in our controllers, the external parameters have string keys, "name" => name, while internally we use name: name. That’s a convention followed throughout Phoenix. External data can’t safely be converted to atoms, because the atom table isn’t garbage-collected. Instead, we explicitly match on the string keys, and then our application boundaries like controllers and channels will convert them into atom keys, which we’ll rely on everywhere else inside Phoenix.

We’ve already encountered the .ex files. These contain Elixir code which you’ll compile to the .beam files that run on the Erlang virtual machine. The .exs files are Elixir scripts. They’re not compiled to .beam files. The compilation happens in memory, each time they are run. They’re excellent for quick-changing scripts or stand-alone development-time tasks.

Summarizing what we have so far: an endpoint is a plug, one that’s made up of other plugs. Your application is a series of plugs, beginning with an endpoint and ending with a controller:

connection
|> endpoint()
|> plug()
|> plug()
...
|> router()
|> HelloWebController()


![-w626](/media/15335332495672.jpg)

Web applications in Phoenix are pipelines of plugs.

mix ecto.gen.migration create_users

mix ecto.migrate

mix phx.routes


create table(:credentials) do
add :email, :string, null: false
add :password_hash, :string, null: false
add :user_id, references(:users, on_delete: :delete_all, null: false)
  timestamps()
end

context 的概念是干什么的？

add :user_id, references(:users, on_delete: :delete_all, null: false)

允许没有
数据库内删除该记录，则删除相关的所有内容


 field :password, :string, virtual: true
 belongs_to :user, Rumbl.Accounts.User
