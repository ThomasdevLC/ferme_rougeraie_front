import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "../views/ProductsView.vue";
import AboutView from "../views/AboutView.vue";
import AdminView from "../views/AdminView.vue";
import ClosedView from "../views/ClosedView.vue";
import { useProductStore } from "../stores/ProductStore";

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
    {
      path: "/closed",
      name: "closed",
      component: ClosedView,
    },
  ],
});
routerApp.beforeEach(async (to, from, next) => {
  const productStore = useProductStore();
  await productStore.getClosedShop();

  to.name === "ProductsView" && productStore.closedShop
    ? next({ name: "closed" })
    : next();
});

export default routerApp;
