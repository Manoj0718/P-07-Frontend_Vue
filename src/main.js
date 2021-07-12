import Vue from "vue";
//!import as* , otherwise error //
import * as VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router";
import "bulma"; //!css library//
import store from "./store";
//!import date format from 
import "./store/services/date_services"
//import axios from "axios";

Vue.config.productionTip = false;
// import VueAxios from "vue-axios";
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");