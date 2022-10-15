import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/mv",
        name: "mv",
        component: () => import("@/pages/video/index.vue"),
    },
    {
        path: "/mvPlay",
        name: "mvPlay",
        props: route => ({ vid: route.query.vid }),
        component: () => import("@/pages/video/components/MvPlay.vue"),
    },
    {
        path: "/searchPage",
        name: "searchPage",
        component: () => import("./pages/SearchPage/index.vue")
    },
    {
        path: "/musicHall",
        name: "musicHall",
        component: () => import("./pages/MusicHall/index.vue"),
    },
    {
        path: '/rankingDetail',
        name: 'rankingDetail',
        props: route => ({ id: route.query.id, period: route.query.period }),
        component: () => import("@/pages/MusicHall/components/RankingDetail.vue"),
    },
    {
        path: '/singerDetail',
        name: 'singerDetail',
        props: route => ({ singermid: route.query.singermid }),
        component: () => import("@/pages/MusicHall/components/SingerDetail.vue"),
    },
    {
        path: '/albumDetail',
        name: 'albumDetail',
        props: route => ({ albummid: route.query.albummid }),
        component: () => import("@/pages/MusicHall/components/AlbumDetail.vue"),
    },
    {
        path: '/myFavorite',
        name: 'myFavorite',
        props: route => ({ albummid: route.query.albummid }),
        component: () => import("@/pages/MyFavorite/index.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
