<template>
  <div class="product">
    <div class="product-infos">
      <div class="image"><img :src="product.image" alt="photo produit" /></div>
      <h4>{{ product.name }}</h4>
      <p>
        {{ product.price }} € / <span> {{ product.unit }}</span>
      </p>
      <p v-if="product.interval">- inter {{ product.interval }}</p>
    </div>

    <div class="icons">
      <div class="overlay" v-if="showModal" @click="closeModal"></div>

      <div class="modal" v-if="showModal"><EditModal :product="product" /></div>

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
import { useProductStore } from "../stores/ProductStore";
import EditModal from "./EditModal.vue";

export default {
  props: ["product"],
  components: { EditModal },
  setup() {
    const productStore = useProductStore();

    return { productStore };
  },
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
};
</script>

<style scoped>
.product {
  padding: 6px 10px;
  background: #fff;
  margin-top: 20px;
  border-radius: 2px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image {
  overflow: hidden;
  border-radius: 6px;
  width: 60px;
  height: 60px;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-infos {
  display: flex;
  align-items: center;
  width: 420px;
  align-items: center;
}

.product h4,
.product p {
  margin-left: 15px;
}

.product i {
  font-size: 22px;
  margin-left: 6px;
  cursor: pointer;
  color: #bbb;
}
.product i.active {
  color: #0f0b0d;
}
.product i:hover {
  color: #525252;
}

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
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: auto;
  margin-right: auto;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
