import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 第三方库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 样式
import './style.css'
// Clerk
import {clerkPlugin} from "@clerk/vue";
import { zhCN } from '@clerk/localizations'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
// 初始化 Clerk
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env.local file')
}
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY, localization: zhCN })
app.mount('#app')
