<template>
  <header>
    <img class="logo" :src="image" alt=" logo" />
    <div class="nav-cart">
      <nav>
        <router-link :to="{ name: 'home' }">À propos</router-link>
        <router-link :to="{ name: 'ProductsView' }">Produits</router-link>
        <router-link :to="{ name: 'AdminView' }">Admin</router-link>
      </nav>
      <div class="overlay" v-if="showModal" @click="closeModal"></div>
      <div class="modal" v-if="showModal"><ShopCart /></div>
      <div v-if="$route.path !== '/admin'" class="cart-container">
        <img
          class="shop-cart"
          @click="openModal"
          :src="basketImage"
          alt=" panier"
        />
        <div class="cart-total" v-if="productStore.cartCount">
          {{ productStore.cartCount }}
        </div>
      </div>
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
  font-size: 20px;
  background-color: white;
  border-bottom: 1px solid #444;
}

.logo {
  height: 120px;
}

.nav-cart {
  display: flex;
  justify-content: center;
  align-items: center;
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

.cart-container {
  position: relative;
  z-index: 1;
}

.shop-cart {
  height: 45px;
  cursor: pointer;
  margin-left: 80px;
}

.cart-total {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: -10px;
  right: -10px;
  background-color: #fe8401;
  color: white;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 0;
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
