import {createRouter, createWebHistory} from 'vue-router'
import ModelManagement from '../views/ModelManagement.vue'
import MockRules from '../views/MockRules.vue'
import ModelEdit from '../components/Model/ModelEdit.vue'

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

export default router
