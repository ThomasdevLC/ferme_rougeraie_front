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
    <input type="number" placeholder="prix" step="0.10" v-model="editPrice" />
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

<style scoped>
.file {
  position: relative;
  display: inline-block;
}

.file input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;

  cursor: pointer;
}

.file img {
  display: block;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
}

form {
  max-width: 400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
}
form button {
  background: #ffd859;
  border: 0;
  padding: 10px;
  font-family: "Poppins";
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
}
form input {
  border: 0;
  padding: 10px;
  border-radius: 6px;
  color: #555;
  font-size: 1em;
}
</style>
