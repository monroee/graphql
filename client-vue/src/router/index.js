import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Songs from "../views/Songs.vue";
import Artists from "../views/Artists.vue";
import About from "../views/About.vue";
import NotFound from "../views/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/songs",
    name: "Songs",
    component: Songs
  },
  {
    path: "/artists",
    name: "Artists",
    component: Artists
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "*",
    name: "404",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
