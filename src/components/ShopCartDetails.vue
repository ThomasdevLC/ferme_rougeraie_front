<template>
  <div class="product-infos">
    <div class="image"><img :src="product.image" alt="photo produit" /></div>
    <h4>{{ product.name }}</h4>
    <p>
      {{ product.price }} € / <span> {{ product.unit }}</span>
    </p>

    <div class="item-quantity">
      <div class="cart-icons">
        <button
          @click="
            decrementQuantity();
            handleChange();
          "
        >
          -
        </button>
        <span>{{ quantity }}</span>
        <button
          @click="
            incrementQuantity();
            handleChange();
          "
        >
          +
        </button>
      </div>
    </div>
    <span
      class="material-icons"
      @click="productStore.deleteCartProduct(product.id)"
    >
      clear
    </span>
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
    handleChange() {
      const productStore = useProductStore();
      const editedProduct = {
        quantity: this.quantity,
      };
      if (this.product.id) {
        console.log("Quantity");
        productStore.editCart(this.product.id, editedProduct).catch((error) => {
          console.log(error);
        });
      }
    },
  },
};
</script>

<style scoped>
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
