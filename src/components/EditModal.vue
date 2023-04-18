<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Produit..." v-model="editName" />
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

    const editName = ref(props.product.name);

    const handleSubmit = () => {
      console.log("handleSubmit");
      productStore.editProduct(props.product.id, {
        name: editName.value,
      });
    };

    return { editName, handleSubmit };
  },
};
</script>
