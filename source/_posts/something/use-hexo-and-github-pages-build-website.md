---
title: Hexo + Github Pages 搭建个人博客详细教程
toc: true
permalink: use_hexo_and_github_pages_build_website/
date: 2024-03-05 17:52:48
cover:
tags:
    - hexo
    - github
categories: 网站搭建
---

# 什么是 Hexo

Hexo 是一个快速、简洁且高效的博客框架。它允许用户使用 Markdown 语言编写内容，并将其渲染为静态网页。它相当于与一个网站的主题模板，只需要做简单的配置就能够完成页面的渲染。其主要特点包括快速部署，Markdown 支持，灵活的布局，丰富的插件。

<!-- more -->

官方文档：[Hexo 官方文档](https://hexo.io/zh-cn/docs/index.html)，包括插件库和主题库。

# 环境准备

- Git：电脑需要安装 Git。
- Github：一个 Github 仓库。
- Node.js：框架运行需要 Node.js 环境。

# Hexo 安装

执行命令安装 Hexo：

```Shell
npm install -g hexo-cli
```

在 Github 上新建一个仓库后，git clone 到本地，进入到项目的根目录下，执行：

```Plain
hexo init
npm install
```

执行完毕后启动 hexo：

```Shell
hexo server
```

启动完毕后访问 localhost:4000，如果成功打开并看到一下界面，即代表安装成功：

![](/img/use-hexo-and-github-pages-build-website/1.png)

完成初始化的项目目录如下：

```Shell
.
├── _config.yml
├── package.json
├── scaffolds
|   └── post.md
├── source
|   └── _posts
└── themes
```

其中，常用配置文件如下：

- _config.yml：是 hexo 的主要配置文件，网页的基本配置都在这里完成。
- package.json：记录项目安装的 npm 插件。
- scaffolds/post.md：新建文章时的文章模板。
- source/_posts：文章的默认创建与读取目录。
- themes：主题文件的默认安装目录。

# 基本配置与文章发布

## 基本配置

首先配置一些比较必要的网站基本配置，打开 _config.yml 文件，以下是部分需要关注的配置：

```YAML
# 网站标题
title: 
# 你的名称
author: 
# 网站使用语言
language: zh-CN
# 网站使用时区
timezone: 'Asia/Shanghai'

# 你的网址, 必须以 http:// 或 https:// 开头
url: 
# 文档的默认读取路径，不建议修改
permalink: :year/:month/:day/:title/  

# 你的各类资源默认存放目录，建议可以默认
# 当你在文章中填写资源路径时，都是以此目录为根目录的相对路径
source_dir: source 
# 静态页面编译后的存放目录
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories

# 网站使用主题
theme: 

# 资源部署
deploy:
  type: git
  # 部署仓库地址
  repo: 
  # 部署分支
  branch: main
  # 提交信息
  message: 
```

## 文章发布

在项目根目录下执行一下命令创建文档：

```Shell
hexo new yourtitle
```

此命令会以 scaffolds/post.md 文件为模板，在 source/_posts 目录下创建一个新的 Markdown 文档，其中，yourtitle 是你的文档名称。

进入 source/_posts 目录下编辑创建的文档，执行命令：

```Shell
hexo server
```

打开 localhost:4000 就可以在首页看到你新创建的文档。

Hexo 网站分为几个主要模块：

- 首页（Home）：由创建时间由近到远显示你的文档。
- 归档（archives）：文档的创建时间轴。
- 分类（categories）：文档分类，文档根据设定的分类展示。
- 标签（tags）：文档标签，文档分局设定的标签分类展示。

其中分类与标签可以在文档的头部 Front-Matter 中配置，比如我为一个文档配置了分类与标签，在网站就可以通过分类或者标签筛选到这篇文档。

```Markdown
---
title: Test
date: 2024-03-05 15:09:19
tags: test
categories: test
---

# Title
test
```

![](/img/use-hexo-and-github-pages-build-website/2.png)

## 主题

除了 Hexo 的默认主题，Hexo 支持自由切换主题，主题可以在官方网站上寻找，选择好一个主题后，安装其对应的 npm 插件（一般对应主题的文档都会教你如何执行与配置），在 _config.yml 的 theme 配置主题名称，重启服务，即可生效：

```YAML
theme: themename
```

通常每个主题都会有一个自己的主题样式配置文件，具体就参考每个主题的文档说明。

# Github Pages 部署

Github Pages 是 Github 官方提供的一个静态站点托管服务，它允许用户将 GitHub 仓库中的代码转换为可访问的网站。借助 Github Pages，我们不需要购买服务器也能部署我们的网站。

使用 Github Pages 有一个限制，就是你的仓库名称必须是你的 GitHub 账号用户名 + github.io，网站才能部署成功，即：

```YAML
yourusername.github.io
```

首先我们修改配置文件 _config.yml 中的 deploy 配置，填上我们的仓库的地址与提交信息：

```YAML
# 资源部署
deploy:
  type: git
  # 部署仓库地址
  repo: 
  # 部署分支
  branch: main
  # 提交信息
  message: 
```

在项目下执行部署命令，它就会自动帮我们编译项目并推送代码到仓库中：

```Shell
hexo deploy
```

Hexo 编译生成的静态文件资源都默认存放在 public 目录下，这条命令会推送 public 目录下的文件强制覆盖到指定的仓库中，且 Github 就会自动开启部署任务，只要 Github Pages 服务是开启的，每次推送代码都会自动启动部署任务。

在仓库的 Setting 目录下可以看到 Github Pages 相关的配置，默认部署的是 main 分支根目录下的文件：

![](/img/use-hexo-and-github-pages-build-website/3.png)

将分支设置为 none 即为关闭 Github Pages 服务。

![](/img/use-hexo-and-github-pages-build-website/4.png)

每次的推送成功后，我们可以从 Actions 选项卡下看到我们的部署任务是否完成：

![](/img/use-hexo-and-github-pages-build-website/5.png)

由于网站部署只需要我们的静态资源文件，即 public 目录下的资源文件，所以官方建议把源码与编译后的资源文件分开存储，所以在仓库中新建一个分支用于关于我们的源码，修改源码提交源码在这个分支上，Hexo 的部署配置写的是仓库的 main 分支，执行 deploy 命令时会提交到 main 分支上。

任务完成之后，就可以登录我们的网站查看啦~

# 最后

本站是我在 Github Pages 搭建的网站，使用的 Hexo 主题的是 icarus，小魔改了一下，可以作为参考。

以上就是本文所有的所有内容了，希望对你有所帮助，感谢阅读。

> [一键升级 ChatGPT Plus](/upgrude-chatgpt-plus-2024/)
> [如何注册 Onlyfans 与订阅](/how-to-useonlyfans/)