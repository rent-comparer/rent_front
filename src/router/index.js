import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Tasador from "../views/TasadorView.vue";
import Comparador from "../views/ComparadorView.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/tasador", component: Tasador },
  { path: "/comparador", component: Comparador },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
