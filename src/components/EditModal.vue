<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Produit..." v-model="editTitle" />
    <button>Valider</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useProductStore } from "../stores/ProductStore";

export default {
  props: ["product"],

  setup(props) {
    const productStore = useProductStore();

    const editTitle = ref(props.product.title);

    return { editTitle };
  },
};
</script>
