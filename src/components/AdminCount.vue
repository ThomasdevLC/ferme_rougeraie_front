<template>
  <div class="count">
    <div class="count__print">
      <i class="fa-solid fa-print" @click="handlePrint"></i>
    </div>

    <div class="count__head">
      <p>quantités</p>
    </div>
    <div
      class="count__product"
      v-for="(product, name) in productStore.totalProductsByName"
      :key="name"
    >
      <p>{{ name }}</p>
      <p>
        <span v-if="product.unit === 'kg'">{{
          product.quantity.toFixed(2)
        }}</span>
        <span v-else>{{ product.quantity }}</span>
        {{ product.unit }}<span v-if="product.quantity > 1">s</span>
      </p>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";

export default {
  setup() {
    const productStore = useProductStore();
    const handlePrint = () => {
      window.print();
    };
    return { productStore, handlePrint };
  },
};
</script>

<style scoped lang="scss">
.count {
  max-width: 640px;
  padding: 40px;
  margin: auto;

  &__print {
    display: flex;
    justify-content: flex-end;
    font-size: 24px;
    padding-bottom: 10px;
    cursor: pointer;
    &:hover {
      color: var(--primary);
    }
  }

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
    justify-content: center;
    column-gap: 100px;
    font-size: 18px;
    line-height: 14px;
    border-bottom: 1px solid var(--gray-2);

    & p {
      text-align: left;
      width: 150px;
    }
  }
}
</style>
