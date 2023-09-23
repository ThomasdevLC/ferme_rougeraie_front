<template>
  <div class="product__form">
    <ProductForm />
  </div>

  <div class="loading" v-if="productStore.loading">Chargement...</div>

  <div v-else class="product__container">
    <nav class="filter">
      <button @click="filter = 'all'" :class="{ selected: filter === 'all' }">Tous les produits</button>
      <button @click="filter = 'displayed'" :class="{ selected: filter === 'displayed' }">Produits affichés</button>
    </nav>

    <!-- LIST -->
    <div class="product__list" v-if="filter === 'all'">
      <p class="product__list__count">
        {{ productStore.totalCount }} produit<span v-if="productStore.totalCount > 1">s</span> enregistré<span v-if="productStore.totalCount > 1">s</span>
      </p>

      <div v-for="product in productStore.products" :key="product">
        <ProductDetails :product="product" />
      </div>
    </div>
    <div class="product__list" v-if="filter === 'displayed'">
      <p class="product__list__count">
        {{ productStore.displayedCount }} produit<span v-if="productStore.displayedCount > 1">s</span> affiché<span v-if="productStore.displayedCount > 1"
          >s</span
        >
      </p>
      <div v-for="product in productStore.displayed" :key="product">
        <ProductDetails :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useProductStore } from "../../stores/ProductStore";
import ProductDetails from "./ProductDetails.vue";
import ProductForm from "./ProductForm.vue";
import NavBar from "../nav/NavBar.vue";

export default {
  components: {
    ProductDetails,
    ProductForm,
    NavBar,
  },

  setup() {
    const productStore = useProductStore();
    const filter = ref("all");

    return { productStore, filter };
  },
};
</script>

<style scoped lang="scss">
.product__form {
  background: var(--gray-2);
  max-width: 640px;
  margin: auto;
  padding: 40px 0;
  margin-top: 40px;
}

.product__container {
  max-width: 640px;
  margin: 20px auto;
  padding: 25px;
}

.product__list {
  &__count {
    font-size: 18px;
  }
}
</style>
