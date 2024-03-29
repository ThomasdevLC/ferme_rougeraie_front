<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="file-name-form">
      <input class="custom-input" :class="{ 'error-input': name === '' && errorMessage }" id="name" type="text" placeholder="nom produit" v-model="name" />

      <div class="file">
        <label for="input" :class="{ 'no-padding': selectedImage }">
          <img v-if="selectedImage" :src="selectedImage" alt="selected image" class="selected-product" />
          <i v-else class="material-icons">photo_camera</i>
        </label>
        <input id="input" type="file" ref="fileInput" @change="handleImage" />
      </div>
    </div>
    <input class="custom-input" :class="{ 'error-input': errorMessage && price === null }" type="number" placeholder="prix" step="0.01" v-model="price" />

    <div>
      <select class="custom-input" :class="{ 'error-input': errorMessage && unit === null }" v-model="unit" required>
        <option value="null" disabled selected hidden>unité</option>
        <option value="piece">Pièce</option>
        <option value="kg">kg</option>
        <option value="Botte">Botte</option>
        <option value="Bouquet">Bouquet</option>
        <option value="Litre">Litre</option>
      </select>
    </div>

    <div v-if="unit === 'kg'">
      <input
        class="custom-input"
        :class="{ 'error-input': errorMessage && interval === '' }"
        type="number"
        placeholder="interval "
        step="0.1"
        v-model="interval"
      />
    </div>

    <button class="btn">AJOUTER</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </form>
</template>

<script>
import { computed, ref } from "vue";
import { useProductStore } from "../../stores/ProductStore";
import { convertPriceToCents } from "../../utils/priceInCents";

export default {
  setup() {
    const productStore = useProductStore();
    const fileInput = ref(null);
    const selectedImage = ref(null);
    let selectedFile = null;
    const name = ref("");
    const price = ref(null);
    const unit = ref(null);
    const interval = ref("");
    const errorMessage = ref("");

    const capitalized = computed(() => {
      return name.value.charAt(0).toUpperCase() + name.value.slice(1);
    });

    const priceInCents = computed(() => {
      return convertPriceToCents(price.value);
    });

    const handleSubmit = () => {
      if (
        capitalized.value.length > 0 &&
        selectedFile !== null &&
        price.value !== "" &&
        unit.value !== null &&
        (unit.value !== "kg" || (unit.value === "kg" && interval.value !== ""))
      ) {
        if (selectedFile.size > 1000000) {
          errorMessage.value = "Votre image doit faire moins de 1 méga-octet.";
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target.result;
          productStore.addProduct({
            name: capitalized.value,
            price: priceInCents.value,
            unit: unit.value,
            interval: interval.value,
            isDisplayed: true,
            limited: false,
            image: imageData,
          });
          name.value = "";
          price.value = null;
          unit.value = null;
          interval.value = "";
          selectedFile = null;
          fileInput.value.value = "";
          selectedImage.value = null;
          errorMessage.value = "";
        };
        reader.readAsDataURL(selectedFile);
      } else {
        errorMessage.value = "Merci de remplir tous les champs";
      }
    };

    const handleImage = (event) => {
      selectedFile = event.target.files[0];
      selectedImage.value = URL.createObjectURL(selectedFile);
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

<style scoped lang="scss">
@use "../../assets/styles/mixins" as mixin;

.form {
  max-width: 400px;
  margin: 0 auto;
  display: grid;
  gap: 10px;

  @include mixin.xs {
    width: 350px;
  }
}

.file {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: var(--light-primary);
  padding: 10px;
  display: flex;
  place-items: center;
  cursor: pointer;
}

.file > label:hover {
  color: var(--primary);
}

.file > label.no-padding {
  padding: 0;
  border: none;
}

.file-name-form {
  display: flex;
}

#name {
  padding: 18px 12px;
}

.selected-product {
  object-fit: cover;
  border-radius: 50%;
  width: 45px;
  height: 45px;
}

.custom-input {
  @include mixin.xs {
    width: 350px;
  }
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.btn {
  font-weight: 600;
  color: var(--text-color);
}

.error-message {
  margin: auto;
  text-align: center;
}

.error-input {
  border: 2px solid var(--primary);
}
</style>
