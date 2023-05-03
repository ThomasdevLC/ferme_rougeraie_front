import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "../views/ProductsView.vue";
import AboutView from "../views/AboutView.vue";
import AdminView from "../views/AdminView.vue";

const routerApp = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "AboutView",
      component: AboutView,
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
