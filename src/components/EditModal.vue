<template>
  <form @submit.prevent="handleSubmit">
    <div class="file file--upload">
      <label for="input-file">
        <img :src="editImage" alt="" />
      </label>
      <input
        id="input-file"
        type="file"
        ref="fileInput"
        @change="handleImage"
      />
    </div>
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

    const fileInput = ref(null);
    let selectedFile = null;
    const editName = ref(props.product.name);
    const editPrice = ref(props.product.price);
    const editUnit = ref(props.product.unit);
    const editInterval = ref(props.product.interval);
    const editImage = ref(props.product.image);

    const handleSubmit = () => {
      if (editName.value.length > 0) {
        const updatedProduct = {
          name: editName.value,
          price: editPrice.value,
          unit: editUnit.value,
          interval: editInterval.value,
          isDisplayed: props.product.isDisplayed,
          id: props.product.id,
        };
        if (selectedFile !== null) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageData = event.target.result;
            updatedProduct.image = imageData;
            productStore.editProduct(props.product.id, updatedProduct);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          productStore.editProduct(props.product.id, updatedProduct);
        }
      }
    };

    const handleImage = (event) => {
      selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        editImage.value = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    };

    return {
      editImage,
      editName,
      editPrice,
      editUnit,
      editInterval,
      handleSubmit,
      fileInput,
      handleImage,
    };
  },
};
</script>
