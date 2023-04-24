import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "../views/ProductsView.vue";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";

const routerApp = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/products",
      name: "ProductsView",
      component: ProductsView,
    },
    {
      path: "/admin",
      name: "AdminView",
      component: AdminView,
    },
  ],
});

export default routerApp;
