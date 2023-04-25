<template>
  <div class="card">
    <div class="card-image">
      <img :src="product.image" alt="photo produit" width="277" height="280" />
    </div>
    <div class="card-text">
      <h3>{{ product.name }}</h3>
      <p>
        {{ product.price }} € / <span> {{ product.unit }}</span>
      </p>
      <div class="item-quantity">
        <div class="cart-icons">
          <button @click="decrementQuantity">-</button>
          <span>{{ quantity }}</span>
          <button @click="incrementQuantity">+</button>
        </div>
      </div>
      <p @click="handleCart">AJOUTER AU PANIER</p>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";

export default {
  props: ["product"],

  setup() {
    const productStore = useProductStore();

    return { productStore };
  },

  data() {
    return {
      quantity: 0,
    };
  },
  methods: {
    decrementQuantity() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },
    incrementQuantity() {
      this.quantity++;
    },
    handleCart() {
      const productStore = useProductStore();
      if (this.quantity > 0) {
        console.log("hello handle", this.product, this.quantity);
        productStore.addToCart({
          name: this.product.name,
          price: this.product.price,
          quantity: this.quantity,
        });
      }
    },
  },
};
</script>

<style>
.card {
  width: 277px;
  height: 448px;
  border: 1px solid #ccc;
}

.card-img {
  display: block;
  overflow: hidden;
  width: 277px;
  height: 280px;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-text {
  width: 277px;
  padding: 10px;
  line-height: 20px;
}
</style>
