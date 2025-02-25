import {createRouter, createWebHistory} from 'vue-router'
import ModelManagement from '../views/ModelManagement.vue'
import MockRules from '../views/MockRules.vue'
import ModelEdit from '../components/Model/ModelEdit.vue'
import {useClerkStore} from "@/stores/clerk";

const routes = [
    {
        path: '/',
        redirect:'/model-management'
    }, {
        path: '/model-management',
        name: 'model-management',
        component: ModelManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/mock-rules',
        name: 'mock-rules',
        component: MockRules,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/model-edit',
        name: 'ModelEdit',
        component: ModelEdit,
        meta: {
            requiresAuth: true
        }
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const clerkStore = useClerkStore();

    // 确保 Clerk 已加载
    if (!clerkStore.isLoaded) {
        await clerkStore.load();
    }

    if (to.meta.requiresAuth && !clerkStore.user) {
        // 如果用户未登录，重定向到登录页面
        clerkStore.openSignIn();
    } else {
        next();
    }
});

export default router
