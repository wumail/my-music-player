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
                component: () => import('@/components/base/list/playlist/index.vue'),
                children: [
                    {
                        path: '/historylist',
                        name: 'HistoryList',
                        component: () => import('@/components/base/list/playlist/historylist.vue'),
                        meta: {
                            keepAlive: true
                        }
                    },
                    {
                        path: '/playlist',
                        name: 'PlayList',
                        component: () => import('@/components/base/list/playlist/playlist.vue'),
                        meta: {
                            keepAlive: true
                        }
                    },
                    {
                        path: '/searchlist',
                        name: 'SearchList',
                        component: () => import('@/components/base/list/playlist/searchlist.vue'),
                        meta: {
                            keepAlive: true
                        }
                    },
                ]
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;