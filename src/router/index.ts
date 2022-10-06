import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login',
        children: [
            {
                path: '/login',
                name: 'Login',
                component: () => import('@/views/Login/index.vue')
            },
            {
                path: '/home',
                name: 'Home',
                redirect: '/home/charts',
                component: () => import('@/views/Home/index.vue'),
                children: [{
                    path: '/home/charts',
                    name: 'Charts',
                    component: () => import('@/views/Home/Charts/index.vue'),
                }, {
                    path: '/home/userManagement',
                    name: 'UserManagement',
                    redirect: '/home/userManagement/userList',
                    component: () => import('@/views/Home/UserManagement/index.vue'),
                    children: [{
                        path: '/home/userManagement/userList',
                        name: 'UserList',
                        component: () => import('@/views/Home/UserManagement/UserList/index.vue'),
                    }, {
                        path: '/home/userManagement/userDetail',
                        name: 'UserDetail',
                        component: () => import('@/views/Home/UserManagement/UserDetail/index.vue'),
                    }]
                }, {
                    path: '/home/orderManagement',
                    name: 'OrderManagement',
                    component: () => import('@/views/Home/OrderManagement/index.vue'),
                    redirect: '/home/orderManagement/orderList',
                    children: [{
                        path: '/home/orderManagement/orderList',
                        name: 'OrderList',
                        component: () => import('@/views/Home/OrderManagement/OrderList/index.vue'),
                    }]
                }, {
                    path: '/home/movieManagement',
                    name: 'MovieManagement',
                    redirect: '/home/movieManagement/movieList',
                    component: () => import('@/views/Home/MovieManagement/index.vue'),
                    children: [{
                        path: '/home/movieManagement/movieList',
                        name: 'MovieList',
                        component: () => import('@/views/Home/MovieManagement/MovieList/index.vue'),
                    }, {
                        path: '/home/movieManagement/movieDetail',
                        name: 'MovieDetail',
                        component: () => import('@/views/Home/MovieManagement/MovieDetail/index.vue'),
                    }, {
                        path: '/home/movieManagement/addMovie',
                        name: 'AddMovie',
                        component: () => import('@/views/Home/MovieManagement/AddMovie/index.vue'),
                    }]
                }, {
                    path: '/home/cinemaManagement',
                    name: 'CinemaManagement',
                    redirect: '/home/cinemaManagement/cinemaList',
                    component: () => import('@/views/Home/CinemaManagement/index.vue'),
                    children: [{
                        path: '/home/cinemaManagement/cinemaList',
                        name: 'CinemaList',
                        component: () => import('@/views/Home/CinemaManagement/CinemaList/index.vue'),
                    }, {
                        path: '/home/cinemaManagement/cinemaDetail',
                        name: 'CinemaDetail',
                        component: () => import('@/views/Home/CinemaManagement/CinemaDetail/index.vue'),
                    },{
                        path: '/home/cinemaManagement/addCinema',
                        name: 'AddCinema',
                        component: () => import('@/views/Home/CinemaManagement/AddCinema/index.vue'),
                    }]
                },{
                    path: '/home/newsManagement',
                    name: 'NewsManagement',
                    redirect: '/home/newsManagement/newsList',
                    component: () => import('@/views/Home/NewsManagement/index.vue'),
                    children: [{
                        path: '/home/newsManagement/newsList',
                        name: 'NewsList',
                        component: () => import('@/views/Home/NewsManagement/NewsList/index.vue'),
                    }, {
                        path: '/home/newsManagement/newsDetail',
                        name: 'NewsDetail',
                        component: () => import('@/views/Home/NewsManagement/NewsDetail/index.vue'),
                    },{
                        path: '/home/newsManagement/addNews',
                        name: 'AddNews',
                        component: () => import('@/views/Home/NewsManagement/AddNews/index.vue'),
                    }]
                }]
            },
        ]
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router