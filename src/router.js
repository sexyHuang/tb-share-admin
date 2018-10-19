import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login';
import { checkLogin } from './common/login';
Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (!checkLogin() && to.path.indexOf('login') < 0)
    return next({
      path: '/login',
      replace: true
    });
  return next();
});
export default router;
