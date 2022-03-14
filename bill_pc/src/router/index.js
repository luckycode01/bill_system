import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './router';

Vue.use(VueRouter);

// 重写push和replace方法，，解决重复跳转到当前页的报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function push(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

export default router;
