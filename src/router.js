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
        path: "/musicHall",
        name: "musicHall",
        component: () => import("./pages/MusicHall/index.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
