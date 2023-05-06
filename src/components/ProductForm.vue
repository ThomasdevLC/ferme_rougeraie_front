<template>
  <form class="product-form" @submit.prevent="handleSubmit">
    <div class="file-name-form">
      <input
        class="custom-input"
        id="name"
        type="text"
        placeholder="nom produit"
        v-model="name"
      />
      <div class="file">
        <label for="input-file" :class="{ 'no-padding': selectedImage }">
          <img
            v-if="selectedImage"
            :src="selectedImage"
            alt="selected image"
            class="selectedProduct"
          />
          <i v-else class="material-icons">photo_camera</i>
        </label>
        <input
          id="input-file"
          type="file"
          ref="fileInput"
          @change="handleImage"
        />
      </div>
    </div>
    <input
      class="custom-input"
      type="number"
      placeholder="prix"
      step="0.001"
      v-model="price"
    />

    <div>
      <select v-model="unit" required class="custom-input">
        <option value="null" disabled selected hidden>unité</option>
        <option value="piece">Pièce</option>
        <option value="Botte">Botte</option>
        <option value="kg">kg</option>
        <option value="Litre">Litre</option>
      </select>
    </div>

    <div v-if="unit === 'kg'">
      <input
        class="custom-input"
        type="number"
        placeholder="interval "
        step="0.1"
        v-model="interval"
      />
    </div>

    <button>Ajouter</button>
    <p v-if="errorMessage" class="error-message">
      Merci de remplir tous les champs.
    </p>
  </form>
</template>

<script>
import { computed, ref } from "vue";
import { useProductStore } from "../stores/ProductStore";

export default {
  setup() {
    const productStore = useProductStore();

    const fileInput = ref(null);
    const selectedImage = ref(null); //ajout de la propriété selectedImage
    let selectedFile = null;
    const name = ref("");
    const price = ref("");
    const unit = ref(null);
    const interval = ref("");
    const errorMessage = ref(false);

    const capitalized = computed(() => {
      return name.value.charAt(0).toUpperCase() + name.value.slice(1);
    });

    const handleSubmit = () => {
      if (
        capitalized.value.length > 0 &&
        selectedFile !== null &&
        price.value !== "" &&
        unit.value !== null &&
        (unit.value !== "kg" || (unit.value === "kg" && interval.value !== ""))
      ) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target.result;
          productStore.addProduct({
            name: capitalized.value,
            price: price.value,
            unit: unit.value,
            interval: interval.value,
            isDisplayed: true,
            image: imageData,
            id: Math.floor(Math.random() * 10000),
          });
          name.value = "";
          price.value = "";
          unit.value = null;
          interval.value = "";
          selectedFile = null;
          fileInput.value.value = "";
          selectedImage.value = null; //réinitialisation de selectedImage
          errorMessage.value = false;
        };
        reader.readAsDataURL(selectedFile);
      } else {
        errorMessage.value = true;
      }
    };

    const handleImage = (event) => {
      selectedFile = event.target.files[0];
      selectedImage.value = URL.createObjectURL(selectedFile); //met à jour la valeur de selectedImage
    };

    return {
      name,
      price,
      unit,
      interval,
      handleSubmit,
      fileInput,
      handleImage,
      selectedImage,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.product-form {
  max-width: 400px;
  margin: 0 auto;
  display: grid;
  gap: 10px;
}

.file {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffd859;
  border-color: #ffd859;
  margin-left: -55px;
}

.file > input[type="file"] {
  display: none;
}

.file > label {
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

.file > label:hover {
  background-color: hsl(46, 100%, 92%);
}

.file > label.no-padding {
  padding: 0;
  border: none;
}

.file-name-form {
  display: flex;
}

#name {
  padding: 18px;
}

.selectedProduct {
  object-fit: cover;
  border-radius: 50%;
  width: 45px;
  height: 45px;
}

select {
  color: #444;
  background: #fff;
  font-family: "Poppins";
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

select option {
  font-family: "Poppins";
}
form button {
  background: #ffd859;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
  width: 140px;
  margin: auto;
  cursor: pointer;
}

.custom-input {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  border: 0;
  width: 400px;
  padding: 14px;
  border-radius: 6px;
  color: #555;
  font-size: 16px;
  outline: none;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.error-message {
  margin: auto;
}
</style>
