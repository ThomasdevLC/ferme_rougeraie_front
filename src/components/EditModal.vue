<template>
  <div class="edit">
    <form @submit.prevent="handleSubmit">
      <div class="file">
        <label for="input-file">
          <img :src="editImage" alt="produit" />
        </label>
        <input class="edit-file" id="input-file" type="file" ref="fileInput" @change="handleImage" />
      </div>
      <input class="custom-input" type="text" placeholder="nom" v-model="editName" />

      <input class="custom-input" type="number" placeholder="prix" step="0.01" v-model="editPrice" />
      <div>
        <select v-model="editUnit" class="custom-input">
          <option value="piece">Pièce</option>
          <option value="kg">kg</option>
          <option value="Botte">Botte</option>
          <option value="Bouquet">Bouquet</option>
          <option value="Litre">Litre</option>
        </select>
      </div>

      <div v-if="editUnit === 'kg'" class="input-field">
        <input class="custom-input" type="number" placeholder="interval " step="0.1" v-model="editInterval" />
      </div>
      <button class="btn">Valider</button>
    </form>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useProductStore } from "../stores/ProductStore";
import { convertPriceToCents } from "../utils/priceInCents";

export default {
  props: ["product"],

  setup(props) {
    const productStore = useProductStore();

    const fileInput = ref(null);
    let selectedFile = null;
    const editName = ref(props.product.name);
    const editPrice = ref((props.product.price / 100).toFixed(2));
    const editUnit = ref(props.product.unit);
    const editInterval = ref(props.product.interval);
    const editImage = ref(props.product.imagePath);

    const capitalized = computed(() => {
      return editName.value.charAt(0).toUpperCase() + editName.value.slice(1);
    });
    const priceInCents = computed(() => {
      return convertPriceToCents(editPrice.value);
    });
    const handleSubmit = () => {
      if (editName.value.length > 0) {
        const updatedProduct = {
          name: capitalized.value,
          price: priceInCents.value,
          unit: editUnit.value,
          interval: editInterval.value,
          isDisplayed: props.product.isDisplayed,
        };

        if (selectedFile !== null) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageData = event.target.result;
            updatedProduct.image = imageData;
            productStore.editProduct(props.product._id, updatedProduct);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          productStore.editProduct(props.product._id, updatedProduct);
        }

        console.log("Product", updatedProduct);
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
  margin: 0 auto;
  display: grid;
  gap: 10px;
}

.file {
  position: relative;
  margin: auto;
  cursor: pointer;
}

.edit-file {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.file img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

form input {
  border: 1px solid var(--gray-3);

  @include mixin.xs {
    width: 275px;
  }
}

select {
  border: 1px solid var(--gray-3);

  @include mixin.xs {
    width: 275px;
  }
}
</style>
