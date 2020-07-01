import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Paper from "../views/Paper.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/papers/:arxiv_id",
    name: "Paper",
    component: Paper,
    props: true
  },
  {
    path: "*",
    name: "404NotFound",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;