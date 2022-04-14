import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as API from './api';

import './styles/index.css'; // 全局公共样式

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import './plugin';

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$API = API;
  },
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
