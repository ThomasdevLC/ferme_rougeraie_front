<template>
  <form @submit.prevent="handleSubmit">
    <div class="file file--upload">
      <label for="input-file">
        <i class="material-icons">photo_camera</i>
      </label>
      <input
        id="input-file"
        type="file"
        ref="fileInput"
        @change="handleImage"
      />
    </div>
    <input type="text" placeholder="nom produit" v-model="name" />
    <input type="number" placeholder="prix" step="0.1" v-model="price" />

    <div class="input-field">
      <select v-model="unit">
        <option value="kg">kg</option>
        <option value="piece">pièce</option>
      </select>
      <label>Unité</label>
    </div>

    <div v-if="unit === 'kg'" class="input-field">
      <input
        type="number"
        placeholder="interval "
        step="0.1"
        v-model="interval"
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

    const name = ref("");
    const price = ref(0.0);
    const fileInput = ref(null);
    const unit = ref(false);
    const interval = ref("");
    let selectedFile = null;

    const handleSubmit = () => {
      if (name.value.length > 0 && selectedFile !== null) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target.result;
          productStore.addProduct({
            name: name.value,
            price: price.value,
            unit: unit.value,
            interval: interval.value,
            isDisplayed: true,
            image: imageData,
            id: Math.floor(Math.random() * 10000),
          });
          name.value = "";
          price.value = 0.0;
          selectedFile = null;
          unit.value = false;
          interval.value = 0.0;
          fileInput.value.value = "";
        };
        reader.readAsDataURL(selectedFile);
      }
    };

    const handleImage = (event) => {
      selectedFile = event.target.files[0];
    };

    return {
      name,
      price,
      fileInput,
      unit,
      interval,
      handleSubmit,
      handleImage,
    };
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
