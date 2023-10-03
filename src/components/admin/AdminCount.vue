<template>
  <div class="count">
    <DayFilter />
    <div class="count__print">
      <i class="fa-solid fa-print" @click="handlePrint"></i>
    </div>

    <div class="count__head">
      <p>QUANTITÉS</p>
    </div>
    <div class="count__product" v-for="(product, name) in productStore.totalProductsByName" :key="name">
      <p class="count__product__name">{{ name }}</p>
      <p class="count__product__qty">
        <span v-if="product.unit === 'kg'">{{ product.quantity.toFixed(2) }}</span>
        <span v-else>{{ product.quantity }}</span>
        {{ product.unit }}<span v-if="product.quantity > 1">s</span>
      </p>
    </div>
  </div>
  <pre>{{ productStore.totalProductsByName }}</pre>
</template>

<script>
import { useProductStore } from "../../stores/ProductStore";
import DayFilter from "./DayFilter.vue";

export default {
  components: { DayFilter },

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
@use "../../assets/styles/mixins" as mixin;

.count {
  max-width: 640px;
  padding: 40px;
  margin: auto;

  &__print {
    display: flex;
    justify-content: flex-end;
    font-size: 24px;
    padding-bottom: 20px;
    & i:hover {
      color: var(--primary);
      cursor: pointer;
    }
  }

  &__head {
    display: flex;
    justify-content: center;
    background-color: var(--light-primary);
    font-size: 20px;
    font-weight: 500;
    line-height: 0;
  }
  &__product {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    column-gap: 120px;
    border-bottom: 1px solid var(--gray-2);
    padding: 0 15px;

    &__name {
      height: 20px;
      text-align: left;
      line-height: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &__qty {
      height: 20px;
      line-height: 1;
      white-space: nowrap;
    }
  }
}
</style>
