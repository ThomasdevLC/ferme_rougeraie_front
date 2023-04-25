<template>
  <div class="product-infos">
    <div class="image"><img :src="product.image" alt="photo produit" /></div>
    <h4>{{ product.name }}</h4>
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
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      quantity: this.product.quantity,
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
  },
};
</script>

<style>
.product-infos {
  display: flex;
  align-items: center;
  width: 420px;
  align-items: center;
}

.image img {
  width: 55px;
  height: 55px;
  border-radius: 6px;
  object-fit: cover;
}
</style>
