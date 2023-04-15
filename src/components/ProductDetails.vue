<template>
  <div class="task">
    <h3>{{ product.title }}</h3>
    <div class="icons">
      <i class="material-icons">edit</i>
      <i class="material-icons" @click="productStore.deleteProduct(product.id)"
        >delete</i
      >
      <i
        v-if="product.isDisplayed"
        class="material-icons"
        @click="productStore.toggleDisplay(product.id)"
        >visibility</i
      >
      <i
        v-else
        class="material-icons"
        :class="{ active: !product.isDisplayed }"
        @click="productStore.toggleDisplay(product.id)"
        >visibility_off</i
      >
    </div>
  </div>
</template>

<script>
// import { useProductStore } from "";
import { useProductStore } from "../stores/ProductStore";

export default {
  props: ["product"],

  setup() {
    const productStore = useProductStore();

    return { productStore };
  },
};
</script>

<style></style>
