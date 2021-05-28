import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Index",
        component: () => import('../views/index/index.vue'),
        children: [
            {
                path: '/list',
                name: 'List',
                redirect: 'playlist',
                component: () => import('@/components/base/list/index.vue'),
                children: [
                    {
                        path: '/historylist',
                        name: 'HistoryList',
                        component: () => import('@/components/base/list/historylist.vue'),
                    },
                    {
                        path: '/playlist',
                        name: 'PlayList',
                        component: () => import('@/components/base/list/playlist.vue'),
                    },
                    {
                        path: '/searchlist',
                        name: 'SearchList',
                        component: () => import('@/components/base/list/searchlist.vue'),
                    },
                ]
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;