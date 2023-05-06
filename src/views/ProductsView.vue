<template>
  <div class="product">
    <div class="loading" v-if="productStore.loading">Chargement...</div>

    <div
      v-else
      class="background-image"
      :style="{ 'background-image': `url(${image})` }"
    >
      <h1 class="product__title">PRODUITS DE LA SEMAINE</h1>

      <div class="product__container">
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

<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;

.product {
  &__title {
    padding-top: 60px;
    text-align: center;
    font-size: 40px;

    @include mixin.sm-lt {
      grid-template-columns: repeat(1, 1fr);
      font-size: 30px;
      padding: 40px;
    }
  }

  &__container {
    max-width: 1200px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    justify-items: center;
    padding: 60px;
    margin: auto;

    @include mixin.lg-lt {
      grid-template-columns: repeat(3, 1fr);
    }
    @include mixin.md-lt {
      grid-template-columns: repeat(2, 1fr);
    }
    @include mixin.sm-lt {
      grid-template-columns: repeat(1, 1fr);
      padding: 0px;
    }
  }
}

// @media screen and (max-width: 1200px) {
//   .card-container {
//     grid-template-columns: repeat(3, 1fr);
//   }
// }

// @media screen and (max-width: 900px) {
//   .card-container {
//     grid-template-columns: repeat(2, 1fr);
//   }
// }

// @media screen and (max-width: 600px) {
//   .card-container {
//     grid-template-columns: repeat(1, 1fr);
//   }
// }
</style>
