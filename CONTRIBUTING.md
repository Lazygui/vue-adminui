# CONTRIBUTING

## 项目概述

本项目是一个基于vue3+vite的后台管理UI，使用TypeScript进行开发，采用现代化的前端技术栈。

## 项目结构

``` bash
src/
  ├── hooks/         // 常用hooks封装（如fetch网络请求、本地存储、方法函数等）
  ├── assets/        // 静态资源（图片、SVG等）
  ├── components/    // 复用组件
  │   ├── general/   // 通用编程式指令组件
  │   ├── library/   // 通用UI组件如输入框等
  │   ├── svg/       // svg图标组件
  │   ├── layout/    // 布局相关组件（如主布局）
  │   └── page/      // 各页面相关组件
  ├── pages/         // 各主页面组件（仪表盘、病例配置、流程面板等）
  ├── routes/        // 路由配置
  ├── vite-plugin/   // vite插件配置项及可能生成的.d.ts文件
  ├── scss           // 全局主题色配置、变量类
  └── main.ts       // 应用入口
```

## 技术栈

- **框架**：Vue3.5
- **构建工具**：Vite 6
- **语言**：TypeScript 5.7
- **路由**：Vue Router4
- **UI 库**：自己编写
- **图标库**：自己编写
- **表单处理**：暂无
- **HTTP 客户端**：fetch

## 编码规范

### 语言和类型

- 采用 TypeScript 开发，启用严格模式（strict: true）
- 所有组件、函数和变量必须有明确的类型定义
- 启用 noUnusedLocals、noUnusedParameters 等规则避免无用代码

### 组件开发

- 使用函数式组件和 自定义 Hooks
- 复杂状态逻辑优先考虑使用自定义 Hooks 抽象
- 组件文件使用 `.vue` 扩展名，工具函数使用 `.ts`

### 代码风格

- 遵循 ESLint 推荐规则，结合 typescript-eslint
- 确保自定义 Hooks 规则正确使用
- 代码格式保持一致性，建议使用编辑器的格式化工具

### 命名规范

- 文件/目录命名：使用小写字母加中划线（kebab-case）或驼峰式（camelCase）
- 组件名称：使用 PascalCase（如 `DataTable`）
- 函数名称：使用 camelCase（如 `fetchData`）
- 常量：使用大写下划线（如 `API_BASE_URL`）

### API 请求

- API 请求统一在 `network` 目录下封装，封装在`hooks`目录下使用函数
- 使用 fetch 实例进行请求管理，支持拦截器配置
- 请求响应类型明确定义，便于 TypeScript 类型推断

## UI开发规范

- 支持深色模式和主题切换
- 自定义组件应遵循现有设计语言和交互模式
- 响应式设计：确保在不同屏幕尺寸下的良好显示


## 项目运行

```bash
# 安装依赖
pnpm install

# 开发环境运行
pnpm dev

# 构建生产版本
pnpm build

# 本地预览生产版本
pnpm preview

# 代码检查
pnpm lint
```

## 提交规范

- 提交前确保代码通过 ESLint 检查
- 提交信息应简洁明了，描述变更内容
- 建议使用约定式提交格式：`<type>(<scope>): <description>`
  - 类型：feat(新功能)、fix(修复)、docs(文档)、style(样式)、refactor(重构)等

## 项目环境变量

项目使用 `.env` 文件管理环境变量，包括：

- `.env`：所有环境共享的基础配置
- `.env.development`：开发环境特定配置
- `.env.production`：生产环境特定配置

## 贡献流程

1. Fork 项目并克隆到本地
2. 创建新的功能分支
3. 实现功能并通过测试
4. 提交变更并创建 Pull Request
5. 等待代码审查和合并
