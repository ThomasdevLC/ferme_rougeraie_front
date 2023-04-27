<template>
  <header>
    <img class="logo" :src="image" alt=" logo" />

    <nav>
      <router-link :to="{ name: 'home' }">A propos</router-link>
      <router-link :to="{ name: 'ProductsView' }">Produits</router-link>
      <router-link :to="{ name: 'AdminView' }">Admin</router-link>
    </nav>
    <div class="shopping-cart">
      <div class="overlay" v-if="showModal" @click="closeModal"></div>
      <div class="modal" v-if="showModal"><ShopCart /></div>
      <span class="cart-total" v-if="productStore.cartCount">{{
        productStore.cartCount
      }}</span>

      <img
        class="shop-cart"
        v-if="$route.path !== '/admin'"
        @click="openModal"
        :src="basketImage"
        alt=" panier"
      />
    </div>
  </header>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import ShopCart from "../components/ShopCart.vue";
import logo from "../assets/logo.png";
import basket from "../assets/images/basket.png";

export default {
  components: { ShopCart },

  setup() {
    const productStore = useProductStore();

    return { productStore };
  },

  data() {
    return {
      showModal: false,
      image: logo,
      basketImage: basket,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 20px 40px;
  background-color: white;
  border-bottom: 1px solid #444;
}

.logo {
  height: 120px;
}

header h1 {
  color: #dfdfdf;
  font-size: 60px;
}
header a {
  color: #444;
  text-decoration: none;
  margin-left: 80px;
}
header a.router-link-active {
  color: #444;
  border-bottom: 2px solid #fe8401;
}

.shop-cart {
  height: 45px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: auto;
  margin-right: auto;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background: white;
  padding: 20px;
  /* border-radius: 8px; */
}
</style>
