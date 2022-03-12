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
    name: 'Home',
    component: () => import('../views/Home'),
    meta: {
      index: 1,
    },
  },
  {
    path: '/morelist',
    name: 'MoreList',
    component: () => import('../views/MoreList'),
    meta: {
      index: 2,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
