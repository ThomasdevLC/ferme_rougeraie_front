<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Produit..." v-model="newProduct" />
    <button>Ajouter</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useProductStore } from "../stores/ProductStore";

export default {
  setup() {
    const productStore = useProductStore();

    const newProduct = ref("");

    const handleSubmit = () => {
      if (newProduct.value.length > 0) {
        productStore.addProduct({
          title: newProduct.value,
          isDisplayed: true,
          id: Math.floor(Math.random() * 10000),
        });
        newProduct.value = "";
      }
    };

    return { newProduct, handleSubmit };
  },
};
</script>
