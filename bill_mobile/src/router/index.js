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
      icon: true,
      left: true,
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
    meta: {
      tabbar: true,
    },
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
      icon: false,
      left: false,
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
  {
    path: '/homelink/addpay',
    name: 'Addpay',
    component: () => import('../views/HomeLink/addpay'),
    meta: {
      tabbar: true,
      index: '3',
      icon: false,
      left: true,
    },
  },
  {
    path: '/homelink/addin',
    name: 'Addin',
    component: () => import('../views/HomeLink/addIn'),
    meta: {
      tabbar: true,
      index: '3',
      icon: false,
      left: true,
    },
  },
  {
    path: '/homelink/outandindetail',
    name: 'outandindetail',
    component: () => import('../views/HomeLink/outAndInDetail'),
    meta: {
      tabbar: true,
      index: '3',
      icon: false,
      left: true,
    },
  },
  {
    path: '/homelink/category',
    name: 'Category',
    component: () => import('../views/HomeLink/category'),
    meta: {
      tabbar: true,
      index: '3',
      icon: false,
      left: true,
    },
  },
  {
    path: '/lottery',
    name: 'Lottery',
    component: () => import('../views/Lottery'),
    meta: {
      tabbar: true,
      index: '3',
      icon: false,
      left: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
