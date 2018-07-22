import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    title: '登录',
    component: resolve => {
        require(['@/views/login/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    title: '页面不存在',
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve);
    }
};

export const page403 = {
    path: '/403',
    title: '权限不足',
    name: 'error-403',
    component: resolve => {
        require(['@/views/error-page/403.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    title: '服务端错误',
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve);
    }
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/',
        name: 'main',
        component: Main,
        children: [
            {
                path: '/home',
                name: 'home',
                title: '主页',
                component: resolve => {
                    require(['@/views/home/500.vue'], resolve);
                }
            },
            {
                path: '/shopping-list',
                name: 'shopping-list',
                title: '购物清单',
                component: resolve => {
                    require(['@/views/shopping-list/shopping-list.vue'], resolve);
                }
            },
            {
                path: '/daily-record',
                name: 'daily-record',
                title: '日常记录',
                component: resolve => {
                    require(['@/views/daily-record/daily-record.vue'], resolve);
                }
            },
            {
                path: '/error',
                name: 'error',
                title: '服务端错误',
                component: resolve => {
                    require(['@/views/error-page/403.vue'], resolve);
                }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
