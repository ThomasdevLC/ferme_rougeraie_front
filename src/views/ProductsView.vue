<template>
  <div class="product" :style="{ 'background-image': `url(${image})` }">
    <div class="loading" v-if="productStore.loading">Chargement...</div>
    <div v-else>
      <p class="product__noproduct" v-if="productStore.closedShop">
        Pas de produit cette semaine, à bientôt !
      </p>

      <div v-else>
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

  &__noproduct {
    height: 100vh;
    margin: 0;
    font-size: 40px;
    display: grid;
    place-items: center;
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
</style>
