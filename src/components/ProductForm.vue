<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Produit..." v-model="newProduct" />

    <div class="file file--upload">
      <label for="input-file">
        <i class="material-icons">photo_camera</i>
      </label>
      <input
        id="input-file"
        type="file"
        ref="fileInput"
        @change="handleFileInputChange"
      />
    </div>

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
    const fileInput = ref(null);
    let selectedFile = null;

    const handleSubmit = () => {
      if (newProduct.value.length > 0 && selectedFile !== null) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target.result;
          productStore.addProduct({
            title: newProduct.value,
            isDisplayed: true,
            image: imageData,
            id: Math.floor(Math.random() * 10000),
          });
          newProduct.value = "";
          fileInput.value.value = "";
          selectedFile = null;
        };
        reader.readAsDataURL(selectedFile);
      }
    };

    const handleFileInputChange = (event) => {
      selectedFile = event.target.files[0];
    };

    return { newProduct, fileInput, handleSubmit, handleFileInputChange };
  },
};
</script>

<style scoped>
.file {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file > input[type="file"] {
  display: none;
}

.file > label {
  cursor: pointer;
  outline: 0;
  user-select: none;
  border-style: solid;
  border-radius: 50%;
  border-width: 1px;
  background-color: hsl(0, 0%, 100%);
  color: #ffd859;
  padding: 10px;
  display: flex;
  place-items: center;
}

.file--upload > label {
  color: #ffd859;
  border-color: #ffd859;
}

.file--upload > label:hover {
  background-color: hsl(46, 100%, 92%);
}
</style>
