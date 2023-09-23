<template>
  <div class="product" :style="{ 'background-image': `url(${image})` }">
    <div class="loading" v-if="productStore.loading">Chargement...</div>
    <div v-else>
      <div>
        <h1 class="product__title">PRODUITS DE LA SEMAINE</h1>

        <div class="product__container">
          <div v-for="product in productStore.displayed" :key="product">
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import background from "../assets/images/background.png";
import ProductCard from "../components/products/ProductCard.vue";

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
  padding-top: 240px;
  @include mixin.sm-lt {
    padding-top: 360px;
  }
  &__title {
    text-align: center;
    font-size: 46px;
    font-weight: 600;
    padding-top: 20px;

    @include mixin.sm-lt {
      font-size: 32px;
      padding: 40px 0;
    }
  }

  &__container {
    max-width: 1200px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
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
</style>
