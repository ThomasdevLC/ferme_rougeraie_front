<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home' }">Présentation</router-link>
      <router-link :to="{ name: 'ProductsView' }">Produits</router-link>
      <router-link :to="{ name: 'AdminView' }">Admin</router-link>
    </nav>
    <div class="">
      <div class="overlay" v-if="showModal" @click="closeModal"></div>
      <div class="modal" v-if="showModal"><ShopCart /></div>
      <span>{{ productStore.cartCount }}</span>
      <i @click="openModal" class="fa-solid fa-basket-shopping"></i>
    </div>
  </header>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import ShopCart from "../components/ShopCart.vue";

export default {
  components: { ShopCart },

  setup() {
    const productStore = useProductStore();

    return { productStore };
  },

  data() {
    return {
      showModal: false,
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

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 10px;
}
header h1 {
  color: #dfdfdf;
  font-size: 48px;
}
header a {
  color: #bbb;
  text-decoration: none;
  margin-left: 20px;
}
header a.router-link-active {
  color: #444;
  font-weight: bold;
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
