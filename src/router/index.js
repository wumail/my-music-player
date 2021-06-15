import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Index",
        component: () => import('../views/index/index.vue'),
        children: [
            {
                path: '/user',
                name: 'User',
                redirect: 'setting',
                component: () => import('@/components/userbar/user/index.vue'),
                children: [
                    {
                        path: '/setting',
                        name: 'Setting',
                        component: () => import('@/components/userbar/user/user.vue'),
                        meta: {
                            keepAlive: true
                        }
                    },
                    {
                        path: '/favorite',
                        name: 'Favorite',
                        component: () => import('@/components/userbar/user/favorite.vue'),
                        meta: {
                            keepAlive: true
                        }
                    },
                    {
                        path: '/songlist',
                        name: 'SongList',
                        component: () => import('@/components/userbar/user/songlist.vue'),
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