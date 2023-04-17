<template>
  <div class="task">
    <h3>{{ product.title }}</h3>
    <div class="icons">
      <div class="overlay" v-if="showModal" @click="closeModal"></div>

      <div class="modal" v-if="showModal">Hello modal</div>

      <i class="material-icons" @click="openModal">edit</i>

      <i class="material-icons" @click="productStore.deleteProduct(product.id)"
        >delete</i
      >
      <i
        v-if="product.isDisplayed"
        class="material-icons"
        @click="productStore.toggleDisplay(product.id)"
        >visibility</i
      >
      <i
        v-else
        class="material-icons"
        :class="{ active: !product.isDisplayed }"
        @click="productStore.toggleDisplay(product.id)"
        >visibility_off</i
      >
    </div>
  </div>
</template>

<script>
// import { useProductStore } from "";
import { useProductStore } from "../stores/ProductStore";

export default {
  props: ["product"],

  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },

  setup() {
    const productStore = useProductStore();

    return { productStore };
  },
};
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background: white;
}
</style>
