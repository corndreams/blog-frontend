# blog-frontend

一个基于 Vue 3 + Vite + TypeScript 的博客前台项目，包含文章/随记/归档/留言/评论等页面，并在路由切换后进行访问埋点统计。

## 相关仓库

- 博客后台（管理端）：https://github.com/corndreams/blog-manage
- 博客后端（服务端）：https://github.com/corndreams/blog-server

## 技术栈

- Vue 3、Vue Router
- Pinia
- Element Plus（含 @element-plus/icons-vue）
- Axios
- Vite、TypeScript、Sass
- ESLint + Prettier

## 功能概览

- 首页 / 关于我
- 文章列表、文章详情（支持按分类/标签筛选的参数）
- 随记列表、随记详情
- 归档页
- 留言板（查看/新增）
- 评论（树形结构、支持回复）
- 访问统计：路由切换后上报访问路径（track）

## 本地运行

### 环境要求

- Node：`^20.19.0 || >=22.12.0`
- 包管理器：pnpm

### 安装依赖

```bash
pnpm install
```

### 启动开发服务

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 代码检查与格式化

```bash
pnpm lint
pnpm format
```

## 后端地址配置

当前请求基地址在 [http.ts](file:///d:/1study/bolg/blog-frontend/src/api/http.ts) 中配置（`baseURL`）。如需切换到本地后端，修改为你的后端地址，例如：

```ts
baseURL: 'http://localhost:3000'
```

## 目录结构

```text
src/
  api/            接口封装（articles/comments/diary/messages/...）
  assets/         静态资源与全局样式
  components/     通用组件（评论、页头页脚等）
  data/           页面数据/常量
  router/         路由配置（含访问埋点）
  stores/         Pinia 状态管理
  views/          页面（首页/文章/归档/留言/登录等）
  main.ts         入口
  App.vue         根组件
```
