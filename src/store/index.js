import Vue from "vue";
import Vuex from "vuex";
//import createPersistedState from "vuex-persistedstate";
//* we import modules to main VUEX
import { auth } from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth },
});
