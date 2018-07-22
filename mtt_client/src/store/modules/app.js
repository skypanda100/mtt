import {appRouter} from '@/router/router';

const app = {
    state: {
        shrink: false,
        routers: [
            ...appRouter
        ],
        layers: [
            {
                id: 'dietary-management',
                title: '膳食管理',
                icon: 'android-upload',
                children: [
                    {
                        id: 'shopping-list',
                        title: '购物清单',
                        icon: 'android-sad',
                        active: false
                    },
                    {
                        id: 'daily-record',
                        title: '日常记录',
                        icon: 'ios-infinite',
                        active: false
                    }
                ]
            }
        ]
    },
    mutations: {
        SHRINK: (state) => {
            state.shrink = !state.shrink;
        }
    },
    actions: {
        Shrink ({commit}) {
            return new Promise(resolve => {
                commit('SHRINK');
                resolve();
            });
        }
    }
};

export default app;
