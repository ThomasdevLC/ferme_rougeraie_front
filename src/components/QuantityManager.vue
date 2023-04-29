<template>
  <div class="item-quantity">
    <div class="cart-icons">
      <button @click="decrementQuantity">-</button>
      <div v-if="product.interval" class="quantity" style="width: 23px">
        {{ quantity.toFixed(1) }} <span class="weight"> kg</span>
      </div>
      <div v-else class="quantity">{{ quantity }}</div>
      <button @click="incrementQuantity">+</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],

  data() {
    return {
      quantity: 0,
    };
  },

  methods: {
    decrementQuantity() {
      const interval = this.product.interval || 1;
      if (this.quantity > 0) {
        this.quantity -= interval;
      }
    },
    incrementQuantity() {
      const interval = this.product.interval || 1;
      this.quantity += interval;
    },
  },
};
</script>

<style>
.cart-icons {
  display: flex;
}

button {
  background-color: white;
  border: 1px solid #000000;
  color: #000000;
  font-size: 10px;
  padding: 3px 10px;
  cursor: pointer;
}

.quantity {
  width: 12px;
  line-height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2px;
  padding: 3px 10px;
  font-size: 14px;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
}

.weight {
  font-size: 12px;
}
</style>
