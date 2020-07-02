import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import VueMeta from "vue-meta";
import VueAnalytics from "vue-analytics";
import {
  auth
} from "./firebase";

Vue.config.productionTip = false;
Vue.use(VueMeta);
Vue.use(VueAnalytics, {
  id: "UA-68268899-6",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");