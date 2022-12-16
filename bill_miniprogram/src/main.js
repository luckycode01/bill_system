import App from "./App.vue";

const host = "https://unidemo.dcloud.net.cn/";

// #ifndef VUE3
import Vue from "vue";

import uView from "uview-ui";
// import "uview-ui/theme.scss";
// import "uview-ui/index.scss";

Vue.config.productionTip = false;
Vue.prototype.$serverUrl = host;
Vue.use(uView);
App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  app.config.globalProperties.$serverUrl = "https://unidemo.dcloud.net.cn/";
  return {
    app,
  };
}
// #endif
