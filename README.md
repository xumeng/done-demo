<h1 align="center">Done demo based Next.js, shadcn-ui, Supabase</h1>

# 本地部署

* 下载项目到本地

```
git clone https://github.com/xumeng/done-demo.git
```

* 进入项目目录并安装依赖

```
yarn install 
或
npm i 
```

* 重命名 `.env.local.example` 为 `.env.local` 并修改配置:

```Plaintext
NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
```

 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 可在此处获取 [Your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

* 本地运行

```
npm run dev
```

服务会运行在 [localhost:3000](http://localhost:3000/)

# **技术栈**

- 全栈框架：React + Next.js
- UI：shadcn-ui, Tailwind CSS
- Table：shadcn-ui/table, tanstack/react-table
- 数据库、Auth：Supabase(基于 Postgre)
- 部署：GitHub + Vercel

# 功能特点

- **React+Next.js 一站式开发**
- **Serverless**，Supabase + Vercel，省去单独部署服务和 DB 的工作
- **轻业务逻辑**，基于 Supabase 的 Auth 实现完善的用户体系，采用 Trigger 同步用户详细数据
- **shadcn-ui 响应式设计**，支持不同平台
