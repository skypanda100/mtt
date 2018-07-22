import Cookies from 'js-cookie';

const user = {
    state: {},
    mutations: {
        login (state, usr, pwd) {
            Cookies.set('user', usr);
            Cookies.set('password', pwd);
        },
        logout (state) {
            Cookies.remove('user');
            Cookies.remove('password');
            localStorage.clear();
        }
    }
};

export default user;
