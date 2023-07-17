import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "../views/ProductsView.vue";
import AboutView from "../views/AboutView.vue";
import AdminView from "../views/AdminView.vue";
// import IntroView from "../views/IntroView.vue";
import ClosedView from "../views/ClosedView.vue";
import { useProductStore } from "../stores/ProductStore";

const routerApp = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "IntroView",
    //   component: IntroView,
    // },
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
  if (to.name === "ProductsView") {
    // Vérifie si la route actuelle est "/products"
    const productStore = useProductStore();
    await productStore.getClosedShop();
    console.log(productStore.closedShop);
    if (productStore.closedShop) {
      next({ name: "closed" });
    } else {
      next();
    }
  } else {
    next(); // Passe à la route suivante sans appliquer la logique de beforeEach
  }
});

export default routerApp;
