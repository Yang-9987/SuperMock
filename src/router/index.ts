import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import ModelManagement from '../views/ModelManagement.vue'
import MockRules from '../views/MockRules.vue'
import ModelEdit from '../components/Model/ModelEdit.vue'
import MockLink from "@/views/MockLink.vue";

const routes: readonly RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/model-management'
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
    },
    {
        path: '/mock-link',
        name: 'mock-link',
        component: MockLink,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('../views/Test.vue'),
        meta: {
            requiresAuth: false
        }
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
