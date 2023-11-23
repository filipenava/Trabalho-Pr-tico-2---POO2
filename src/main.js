/*! main.js */

import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store";


// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";
import BootstrapVue from 'bootstrap-vue';

// router setup
import routes from "./routes/routes";

import "./registerServiceWorker";
// plugin setup
Vue.use(VueRouter);
Vue.use(LightBootstrap);
Vue.use(BootstrapVue);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "nav-item active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
});
