export default [
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
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {},
  },
  {
    path: '/morelist',
    name: 'MoreList',
    component: () => import('../views/MoreList'),
    meta: {
      index: 2,
    },
  },
  {
    path: '/mainactivite',
    name: 'MainActivite',
    component: () => import('../views/MainActivite'),
    meta: {
      index: 3,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About'),
    meta: {
      index: 3,
    },
  },
];
