import { createRouter, createWebHistory } from "vue-router";
import login from "../views/LoginView.vue";
import register from "../views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/register",
      name: "register",
      component: register,
    },
  ],
});

export default router;
