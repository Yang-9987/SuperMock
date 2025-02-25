# SuperMock

## 项目设置

### 开发环境

- Node.js = v20.12.2
- npm = 10.8.3
- 后台使用SupaBase(https://supabase.com)
- 登录认证使用Clerk(https://clerk.com/docs/quickstarts/vue)

### 安装

1. 克隆代码仓库:
    ```sh
    git clone https://github.com/Yang-9987/SuperMock.git
    cd SuperMock
    ```

2. 安装依赖:
    ```sh
    npm install
    ```
3. 配置环境变量:
    ```sh
    cp .env.example .env.development // 开发环境
    ```
4. 修改.env.development文件中的环境变量
    ```text
    VITE_SUPABASE_KEY= // SupaBase的key
    VITE_SUPABASE_URL= // SupaBase的url
    VITE_CLERK_PUBLISHABLE_KEY= // Clerk的key
    ```

### 启动dev环境

为了方便开发，可以通过以下命令启动开发环境:

```sh
  npm run dev
```
