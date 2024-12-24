# 本地测试指导文档 - Territory Web Client

## 1. 项目简介

本项目是一个 MMO RTS 沙盒游戏的分布式Web客户端端实现，允许玩家通过编程来控制自己的单位 AI。玩家通过编写代码来驱动游戏中的单位进行各种操作，如资源收集、战斗、建造等。每个玩家的代码将与其他玩家的 AI 代码并行运行，在一个持久化的游戏世界中进行交互。该项目提供了一个前端游戏客户端，开发者可以通过该可视化界面，访问Territory服务。

本地测试文档旨在帮助开发者在本地计算机或局域网内快速启动前端界面，并测试和调试客户端代码

## 2. 环境要求

为了在本地运行并测试该服务端项目，您需要确保以下环境和工具已正确配置：

* **操作系统**：仅支持 Windows 操作系统。请确保您的计算机运行的是 Windows 10 或更新版本。
* **编程语言**: React (≥ 19.0.0) + Typescript
* **依赖工具**:
  * **Git**：Git 用于版本控制，您可以从 GitHub 克隆项目仓库并管理项目的源代码。参考[官方文档](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)
  * **Visual Studio Code**: Visual Studio Code 是推荐的编辑器，您可以用它来编写和调试Go代码。请参照`/.vscode/extension.json`安装建议插件
  * **Node**: Node.js(≥ 22.12)是一个免费、开源、跨平台的JavaScript运行时环境，允许开发人员创建服务器、web应用程序、命令行工具和脚本。参考[官方文档](https://nodejs.org/zh-cn/)

## 3. 安装与配置

### 3.1 克隆项目

从GitHub上克隆[Territory Web Client](https://github.com/TerritoryTeam/Territory_Web_Client)项目到本地

```shell
git clone https://github.com/TerritoryTeam/Territory_Web_Client.git
```

### 3.2 初始化Node环境

进入工程目录, 初始化Node环境

```shell
npm install
```

### 3.3 本地启动应用

进入工程目录, 在本地启动前端服务器, 并绑定默认端口(`8081`)

```shell
npm run dev
```

打开浏览器, 访问本地调试地址: [http://localhost:8081](http://localhost:8081)

> 当端口冲突时, 可以通过修改配置, 来绑定到其他可用端口上
> 修改文件: `/vite/config.dev.mjs` 修改配置 `server-port`, 并重新执行启动指令

