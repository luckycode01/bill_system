import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'swiper/css/swiper.min.css';
import '@/utils/index';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './style/index.css';

Vue.config.productionTip = false;

//路由跳转后页面定位到顶部
router.afterEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
