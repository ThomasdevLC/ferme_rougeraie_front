<template>
  <!-- form -->
  <div class="product__form">
    <ProductForm />
  </div>

  <div class="loading" v-if="productStore.loading">Chargement...</div>

  <div v-else class="product__container">
    <nav class="filter">
      <i
        class="fa-solid fa-store-slash"
        @click="productStore.setProductsNotDisplayed"
      ></i>

      <button @click="filter = 'all'" :class="{ selected: filter === 'all' }">
        Tous les produits
      </button>
      <button
        @click="filter = 'displayed'"
        :class="{ selected: filter === 'displayed' }"
      >
        Produits affichés
      </button>
    </nav>

    <!-- LIST -->
    <div class="product__list" v-if="filter === 'all'">
      <p class="product__list__count">
        {{ productStore.totalCount }} produit<span
          v-if="productStore.totalCount > 1"
          >s</span
        >
        enregistré<span v-if="productStore.totalCount > 1">s</span>
      </p>

      <div v-for="product in productStore.products" :key="product">
        <ProductDetails :product="product" />
      </div>
    </div>
    <div class="product-list" v-if="filter === 'displayed'">
      <p class="product__list__count">
        {{ productStore.displayedCount }} produit<span
          v-if="productStore.displayedCount > 1"
          >s</span
        >
        affiché<span v-if="productStore.displayedCount > 1">s</span>
      </p>
      <div v-for="product in productStore.displayed" :key="product">
        <ProductDetails :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useProductStore } from "../stores/ProductStore";
import ProductDetails from "../components/ProductDetails.vue";
import ProductForm from "../components/ProductForm.vue";
import NavBar from "../components/NavBar.vue";

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
  padding: 40px 0;
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
