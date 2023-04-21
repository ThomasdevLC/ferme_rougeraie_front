<template>
  <!-- heading -->
  <header>
    <img :src="image" alt=" logo" />
  </header>

  <!-- form -->
  <div class="new-product-form">
    <ProductForm />
  </div>

  <div class="loading" v-if="productStore.loading">Chargement...</div>

  <div v-else class="container">
    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">Tous les produits</button>
      <button @click="filter = 'displayed'">Produits affichés</button>
    </nav>

    <!-- LIST -->
    <div class="product-list" v-if="filter === 'all'">
      <p>{{ productStore.totalCount }} produits enregistrés</p>
      <div v-for="product in productStore.products" :key="product">
        <ProductDetails :product="product" />
      </div>
    </div>
    <div class="product-list" v-if="filter === 'displayed'">
      <p>{{ productStore.displayedCount }} produits affichés</p>
      <div v-for="product in productStore.displayed" :key="product">
        <ProductDetails :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import logo from "./assets/logo.png";
import { ref } from "vue";
import { useProductStore } from "./stores/ProductStore";
import ProductDetails from "./components/ProductDetails.vue";
import ProductForm from "./components/ProductForm.vue";
export default {
  components: { ProductDetails, ProductForm },
  data() {
    return { image: logo };
  },

  setup() {
    const productStore = useProductStore();

    // fetch  products
    productStore.getProducts();
    const filter = ref("all");

    return { productStore, filter };
  },
};
</script>

<style scoped>
header {
  text-align: center;
  background: #e7e7e7;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
header img {
  height: 120px;
}
header h1 {
  margin: 0;
  font-size: 2em;
  padding-top: 25px;
  margin-left: 15px;
  color: #777;
  transform: rotate(2deg);
}

.new-product-form {
  background: #e7e7e7;
  padding: 20px 0;
}

.container {
  width: 1000px;
  margin: auto;
}

/* filter nav */
.filter {
  margin: 10px auto;
  text-align: right;
}
.filter button {
  /* display: inline-block; */
  font-size: 15px;
  background: #fff;
  border: 2px solid #555;
  border-radius: 4px;
  margin-left: 10px;
  padding: 4px 8px;
  cursor: pointer;
}

/* product list */
.product-list {
  max-width: 640px;
  margin: 20px auto;
}
</style>
