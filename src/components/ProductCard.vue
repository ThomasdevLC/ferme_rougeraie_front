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
      <p>AJOUTER AU PANIER</p>
    </div>
  </div>
</template>

<script scoped>
export default {
  props: ["product"],
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
