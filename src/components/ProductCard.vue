<template>
  <div class="card">
    <div class="card-image">
      <img :src="product.image" alt="photo produit" />
    </div>
    <div class="card-text">
      <p class="product-name">{{ product.name }}</p>
      <p>
        {{ product.price }} € / <span> {{ product.unit }}</span>
      </p>
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
      <!-- <QuantityManager
        :product="product"
        :quantity="quantity"
        @quantity-updated="quantity = $event"
        :key="product.id"
      /> -->
      <p class="add-cart" @click="addToCart">AJOUTER AU PANIER</p>
    </div>
    <div class="overlay" v-if="showModal" @click="closeModal"></div>
    <div class="modal" v-if="showModal"><p>produit déja ajouté !</p></div>
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import QuantityManager from "../components/QuantityManager.vue";
import { compressImage } from "../utils/imageUtils";

export default {
  components: { QuantityManager },
  props: ["product"],

  data() {
    return {
      showModal: false,
      quantity: 0,
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
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    async addToCart() {
      const productStore = useProductStore();
      if (this.quantity > 0) {
        const existingProduct = productStore.cart.find(
          (p) => p.id === this.product.id
        );
        if (existingProduct) {
          // Show modal that the product is already selected
          this.showModal = true;
        } else {
          const compressedImage = await compressImage(this.product.image); // utiliser la fonction utilitaire
          productStore.addToCart({
            name: this.product.name,
            price: this.product.price,
            unit: this.product.unit,
            quantity: this.quantity,
            interval: this.product.interval,
            totalPrice: this.totalPrice,
            image: compressedImage,
            id: this.product.id,
          });
          this.quantity = 0;
          console.log("hello qty", this.quantity);
        }
      }
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  background: white;
  display: flex;
  flex-direction: column;
  margin: 10px;
  max-width: 277px;
  height: 450px;
  overflow: hidden;
}

.card-image {
  height: 280px;
  overflow: hidden;
  /* position: relative; */
}

.card-image img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.card-text {
  width: 277px;
  padding: 0 10px;
  line-height: 0;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}

.product-name {
  font-family: "Jacques Francois", serif;
  font-size: 34px;
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

.add-cart {
  font-weight: 500;
  cursor: pointer;
}

.add-cart:hover {
  color: black;
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
