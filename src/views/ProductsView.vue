<template>
  <div class="background">
    <div class="background-image">
      <div class="loading" v-if="productStore.loading">Chargement...</div>

      <div v-else class="card-container">
        <div v-for="product in productStore.displayed" :key="product">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import background from "../assets/images/background.png";
import ProductCard from "../components/ProductCard.vue";

export default {
  components: { ProductCard },

  setup() {
    const productStore = useProductStore();

    return { productStore };
  },

  data() {
    return { image: background };
  },
};
</script>

<style>
.background-image {
  /* background-image: url("../assets/images/background.png"); */
  background-repeat: repeat-y;
  background-size: 100% 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}

.card-container {
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
  padding: 60px 0 60px 0;
}

@media screen and (max-width: 1200px) {
  .card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 900px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .card-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
