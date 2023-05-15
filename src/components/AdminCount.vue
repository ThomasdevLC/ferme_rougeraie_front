<template>
  <div class="count">
    <div class="count__head">
      <p>produit</p>
      <p>quantité</p>
    </div>
    <div
      class="count__product"
      v-for="(product, name) in productStore.totalProductsByName"
      :key="name"
    >
      <p>{{ name }}</p>
      <p>
        {{ product.quantity.toFixed(2) }} {{ product.unit
        }}<span v-if="product.quantity > 1">s</span>
      </p>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";

export default {
  setup() {
    const productStore = useProductStore();

    return { productStore };
  },
};
</script>

<style scoped lang="scss">
.count {
  max-width: 640px;
  padding: 40px;
  margin: auto;

  &__head {
    display: flex;
    justify-content: space-around;
    background-color: var(--light-primary);
    font-size: 20px;
    font-weight: 500;
    line-height: 0;
  }
  &__product {
    display: flex;
    justify-content: space-around;
    font-size: 18px;
    border-bottom: 1px solid var(--gray-2);
  }
}
</style>
