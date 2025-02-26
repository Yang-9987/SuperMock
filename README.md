# SuperMock 🚀

[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Vue3](https://img.shields.io/badge/Vue-3.4.21-brightgreen)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.39.8-blue)](https://supabase.com)
[![Clerk](https://img.shields.io/badge/@clerk/vue-1.2.1-blue)](https://clerk.com/)


下一代Mock数据管理平台，基于现代Web技术栈构建，提供高效的接口模拟与团队协作能力。

![Project Screenshot](./docs/screenshot.png) <!-- 建议添加实际项目截图 -->

## ✨ 核心功能

- 🧩 可视化Mock接口配置
- ⚡ 实时请求响应模拟
- 🔐 基于Clerk的团队权限管理
- 📦 Supabase数据持久化存储
- 🛠️ OpenAPI规范支持
- 📊 请求日志分析

## 🛠️ 技术栈

**前端框架**: Vue3 + TypeScript + Vite  
**认证服务**: Clerk  
**后端即服务**: Supabase  
**构建工具**: npm  
**测试框架**: Vitest (推荐添加)

## 🚀 快速开始

### 前置条件
- Node.js ≥20.12.2
- npm ≥10.8.3
```bash
   克隆仓库
   git clone https://github.com/Yang-9987/SuperMock.git cd SuperMock
   安装依赖
   npm install
   配置环境
   cp .env.example .env.development
```

### 环境配置
1. 获取Supabase凭证：
   - 创建项目后获取 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_KEY`
   - [Supabase快速入门](https://supabase.com/docs/guides/with-vue-3)

2. 配置Clerk认证：
   - 获取 `VITE_CLERK_PUBLISHABLE_KEY`
   - [Clerk Vue集成指南](https://clerk.com/docs/quickstarts/vue)

### 启动开发
```bash
  npm run dev
```

## 📂 项目结构
```plaintext
   SuperMock/
   ├── public/ # 静态资源文件 
   ├── src/ 
   │ ├── assets/ # 全局资源文件 (图片/字体等) 
   │ ├── components/ # 通用Vue组件 
   │ ├── views/ # 页面级组件 │ ├── router/ # 路由配置
   │ ├── requests/ # API服务层 (Supabase交互)
   │ ├── utils/ # 工具函数库 
   │ ├── App.vue # 根组件 
   │ └── main.ts # 入口文件
   ├── .env.development # 开发环境变量 
   ├── vite.config.ts # Vite配置 
   ├── tsconfig.json # TypeScript配置 
   └── package.json # 依赖管理
```


## 🤝 贡献指南
欢迎提交Pull Request，请遵循以下步骤：
1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 发起Pull Request

## 📄 许可证
本项目采用 [MIT License](LICENSE)

---

> 💡 温馨提示：使用前请确保已正确配置Supabase和Clerk服务。遇到问题请查看 [问题讨论区](https://github.com/Yang-9987/SuperMock/issues)
