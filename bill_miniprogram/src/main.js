import Vue from "vue";
import App from "./App";
import uView from "uview-ui";
import Header from "./components/Header";

Vue.use(uView);
Vue.component("Header", Header);
Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
