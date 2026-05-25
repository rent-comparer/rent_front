import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Tasador from "../views/TasadorView.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/tasador", component: Tasador },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
