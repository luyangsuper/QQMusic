import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/test1",
        component: () => import("./components/HelloWorld.vue"),
    },
    {
        path: "/searchPage",
        name: "SearchPage",
        component: () => import("./pages/SearchPage/index.vue"),
    },
    {
        path: "/songList",
        name: "SongList",
        component: () => import("./pages/SongPage/index.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
