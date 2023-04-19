<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Produit..." v-model="editName" />
    <input type="number" placeholder="prix" step="0.1" v-model="editPrice" />
    <div class="input-field">
      <select v-model="editUnit">
        <option value="kg">kg</option>
        <option value="piece">pièce</option>
      </select>
      <label>unité</label>
    </div>

    <div v-if="editUnit === 'kg'" class="input-field">
      <input
        type="number"
        placeholder="interval "
        step="0.1"
        v-model="editInterval"
      />
    </div>

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
    const editPrice = ref(props.product.price);
    const editUnit = ref(props.product.unit);
    const editInterval = ref(props.product.interval);

    const handleSubmit = () => {
      console.log("handleSubmit");
      productStore.editProduct(props.product.id, {
        name: editName.value,
        price: editPrice.value,
        unit: editUnit.value,
        interval: editInterval,
      });
    };

    return { editName, editPrice, editUnit, editInterval, handleSubmit };
  },
};
</script>
