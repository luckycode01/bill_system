import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home'),
    meta: {
      index: '0',
    },
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail'),
    meta: {
      index: '1',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register'),
  },
  {
    path: '/usercenter',
    name: 'usercenter',
    component: () => import('../views/Usercenter'),
    meta: {
      index: '3',
    },
  },
  {
    path: '/plot',
    name: 'plot',
    component: () => import('../views/Plot'),
    meta: {
      index: '2',
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
