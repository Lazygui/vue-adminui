# Vue 3 + TypeScript + Vite 后台管理系统

这是一个基于Vue 3、TypeScript和Vite构建的后台管理系统模板，包含了常用的组件、路由、网络请求等基础功能。

## 技术栈
- Vue 3 (Composition API)
- TypeScript
- Vite
- SCSS

## 项目结构

```
vue-adminui/
├── public/                # 静态资源
│   ├── background.png     # 背景图片
│   ├── config.json        # 公共配置文件
│   └── vite.svg           # Vite logo
├── src/                   # 源代码
│   ├── assets/            # 静态资源
│   ├── components/        # 组件
│   │   ├── general/       # 通用组件(如Loading)
│   │   ├── layout/        # 布局组件
│   │   ├── library/       # UI组件库(如ZCard, ZInput)
│   │   └── svg/           # SVG图标组件
│   ├── hooks/             # 自定义Hook
│   │   ├── useFech.ts     # 网络请求Hook
│   │   ├── useLocalStore.ts # 本地存储Hook
│   │   └── useUtils.ts    # 工具类Hook
│   ├── network/           # 网络请求相关
│   │   ├── Fequest.ts     # 请求封装
│   │   └── FequestInstance.ts # 请求实例
│   ├── pages/             # 页面组件
│   │   ├── Dashboard.vue  # 仪表盘页面
│   │   └── Login.vue      # 登录页面
│   ├── router/            # 路由配置
│   │   └── index.ts       # 路由定义
│   ├── scss/              # 样式文件
│   │   ├── breakpoint.scss # 响应式断点
│   │   ├── className.scss # 类名定义
│   │   └── index.scss     # 主样式文件
│   ├── utils/             # 工具函数
│   │   └── tools.ts       # 常用工具函数
│   ├── App.vue            # 根组件
│   ├── main.ts            # 应用入口
│   └── style.css          # 全局样式
├── .gitignore             # Git忽略规则
├── index.html             # 主HTML文件
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript配置
└── vite.config.ts         # Vite配置
```

## 主要功能

1. **组件系统**
   - 通用组件：Loading加载状态
   - UI组件库：卡片(ZCard)、输入框(ZInput)等
   - SVG图标组件：用户(User)、锁(Lock)等图标

2. **路由系统**
   - 基于vue-router的路由配置
   - 包含登录页和仪表盘页

3. **网络请求**
   - 封装了Fequest请求类
   - 提供了请求实例管理

4. **状态管理**
   - 使用自定义Hook管理状态
   - 提供本地存储Hook

5. **样式系统**
   - 使用SCSS预处理器
   - 包含响应式断点定义
   - 提供常用类名工具

## 快速开始

1. 安装依赖
```bash
pnpm install
```

2. 启动开发服务器
```bash
pnpm run dev
```

3. 构建生产版本
```bash
pnpm run build
```

## 参考文档
- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
