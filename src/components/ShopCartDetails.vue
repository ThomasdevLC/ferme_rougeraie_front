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
      <div v-if="product.unit === 'kg'">
        <input
          class="weight"
          type="number"
          placeholder="quantité "
          min="0"
          :step="product.interval"
          v-model="quantity"
          @input="handleChange()"
        />
      </div>

      <div v-else class="cart-icons">
        <button
          @click="
            decrementQuantity();
            handleChange();
          "
        >
          -
        </button>
        <div class="quantity">{{ quantity }}</div>
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
    <div></div>
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
  computed: {
    totalPrice() {
      return (this.quantity * this.product.price).toFixed(2);
    },
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
  justify-content: center;
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

.weight {
  border: 1px solid #000000;
  padding: 3px;
  width: 76px;
  outline: none;
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
  display: flex;
  place-items: center;
  width: 8px;
  line-height: 15px;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  padding: 3px 10px;
  font-size: 14px;
}

.price-item {
  font-size: 18px;
  width: 90px;
}
</style>
