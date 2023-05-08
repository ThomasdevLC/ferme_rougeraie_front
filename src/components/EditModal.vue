<template>
  <div class="edit">
    <form @submit.prevent="handleSubmit">
      <div class="file">
        <label for="input-file">
          <img :src="editImage" alt="produit" />
        </label>
        <input
          class="edit-file"
          id="input-file"
          type="file"
          ref="fileInput"
          @change="handleImage"
        />
      </div>
      <input
        class="custom-input"
        type="text"
        placeholder="nom"
        v-model="editName"
      />

      <input
        class="custom-input"
        type="number"
        placeholder="prix"
        step="0.001"
        v-model="editPrice"
      />
      <div>
        <select v-model="editUnit" class="custom-input">
          <option value="kg">kg</option>
          <option value="piece">pièce</option>
          <option value="Litre">Litre</option>
        </select>
      </div>

      <div v-if="editUnit === 'kg'" class="input-field">
        <input
          class="custom-input"
          type="number"
          placeholder="interval "
          step="0.1"
          v-model="editInterval"
        />
      </div>
      <button>Valider</button>
    </form>
  </div>
</template>

<script>
import { computed, ref } from "vue";
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

    const capitalized = computed(() => {
      return editName.value.charAt(0).toUpperCase() + editName.value.slice(1);
    });

    const handleSubmit = () => {
      if (editName.value.length > 0) {
        const updatedProduct = {
          name: capitalized.value,
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
  watch: {
    editUnit(newUnit) {
      if (newUnit === "piece") {
        this.editInterval = "";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;

form {
  // max-width: 400px;
  margin: 0 auto;
  display: grid;
  gap: 10px;
}

.file {
  position: relative;
  margin: auto;
}

.edit-file {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  opacity: 0;
}

.file img {
  width: 70px;
  height: 70px;
  border-radius: 6px;
  object-fit: cover;
  cursor: pointer;
}

form button {
  background: #ffd859;
  border: 0;
  padding: 10px;
  font-family: "Poppins";
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

form input {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  border: 1px solid #ccc;
  width: 400px;
  padding: 14px;
  border-radius: 6px;
  color: #555;
  font-size: 16px;
  outline: none;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  @include mixin.xs {
    width: 275px;
  }
}

select {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  border: 1px solid #ccc;
  width: 400px;
  padding: 14px;
  border-radius: 6px;
  color: #555;
  font-size: 16px;
  outline: none;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  @include mixin.xs {
    width: 275px;
  }
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
</style>
