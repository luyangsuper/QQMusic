import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/test1', component: () => import('./components/HelloWorld.vue')
    },
    {
        path: '/test2', component: () => import('./pages/SongTable/index.vue')
    },
    {
        path:'/songPage',
        name:'SongPage',
        component:() => import('./pages/SongPage/index.vue')
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router