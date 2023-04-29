<template>
  <div class="product-infos">
    <div class="image"><img :src="product.image" alt="photo produit" /></div>
    <div class="">
      <p class="product-infos-name">{{ product.name }}</p>
      <p class="price">
        {{ product.price }} € / <span> {{ product.unit }}</span>
      </p>
    </div>

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
        <div v-if="product.interval" class="quantity" style="width: 23px">
          {{ quantity.toFixed(1) }} <span class="weight"> kg</span>
        </div>
        <div v-else class="quantity">{{ quantity }}</div>
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
    <div class="price-item">{{ totalPrice }} <span>€</span></div>
    <div
      class="material-icons remove-item"
      @click="productStore.deleteCartProduct(product.id)"
    >
      clear
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
      quantity: this.product.quantity,
    };
  },
  computed: {
    totalPrice() {
      return (this.quantity * this.product.price).toFixed(2);
    },
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
    handleChange() {
      const productStore = useProductStore();
      const editedProduct = {
        quantity: this.quantity,
      };
      if (this.product.id) {
        if (this.quantity < 0.1) {
          productStore.deleteCartProduct(this.product.id);
        } else {
          productStore
            .editCart(this.product.id, editedProduct)
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
  },
};
</script>

<style scoped>
.product-infos {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 600px;
  column-gap: 30px;
  border-bottom: 1px solid #ddd;
  padding: 15px;
}

.image {
  display: flex;
  align-items: center;
}
.image img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
}

.product-infos-name {
  line-height: 10px;
  font-weight: 500;
}

.price {
  width: 180px;
  font-size: 14px;
  line-height: 0px;
}

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

.price-item {
  font-size: 18px;
  width: 90px;
  text-align: right;
}

.remove-item:hover {
  color: black;
  cursor: pointer;
}
</style>
