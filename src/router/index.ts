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
        component: ModelManagement
    },
    {
        path: '/mock-rules',
        name: 'mock-rules',
        component: MockRules},
    {
        path: '/model-edit',
        name: 'ModelEdit',
        component: ModelEdit
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
