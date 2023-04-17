<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Produit..." v-model="EditTitle" />
    <button>Valider</button>
  </form>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";

export default {
  setup() {
    const productStore = useProductStore();
  },

  data() {
    return {
      EditTitle: "",
    };
  },

  mounted() {
    this.EditTitle = product.title;
  },
};
</script>
