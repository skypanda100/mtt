import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import tag from './modules/tag';

Vue.use(Vuex);

const store = new Vuex.Store({
    mutations: {
        //
    },
    actions: {},
    modules: {
        app,
        user,
        tag
    }
});

export default store;
