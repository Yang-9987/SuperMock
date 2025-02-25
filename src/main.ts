import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 第三方库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia';
import { useClerkStore } from './stores/clerk';
// 样式
import './style.css'

const app = createApp(App)
const pinia = createPinia();
// 使用 Pinia
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
// 初始化 Clerk
const clerkStore = useClerkStore();
clerkStore.load().then(() => {
    app.mount('#app');
});
