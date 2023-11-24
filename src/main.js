/*! main.js */

import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store";
// router setup
import router from "./routes/routes";


// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";
import BootstrapVue from 'bootstrap-vue';


import "./registerServiceWorker";
// plugin setup
Vue.use(VueRouter);
Vue.use(LightBootstrap);
Vue.use(BootstrapVue);



/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
});
