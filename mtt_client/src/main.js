import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.use(iView);

new Vue({
    el: '#app',
    router: router,
    store: store,
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            tagsList.push(...item.children);
        });
        this.$store.commit('setTagsList', tagsList);
    },
    render: h => h(App)
});
