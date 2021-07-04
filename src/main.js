import Vue from "vue";
//!import as* , otherwise error //
import * as VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router";
import "bulma"; //!css library//
import store from "./store";
//import axios from "axios";

Vue.config.productionTip = false;
// import VueAxios from "vue-axios";
Vue.use(VeeValidate);
//axios.defaults.withCredentials = true;
// const base = axios.create({
//   baseURL: "http://localhost:3200/",
// });

//Vue.prototype.$http = base;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
