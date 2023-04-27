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
    <div class="overlay" v-if="showModal" @click="closeModal"></div>
    <div class="modal" v-if="showModal"><p>produit déja ajouté !</p></div>
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
      showModal: false,
      quantity: 0,
    };
  },

  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    decrementQuantity() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },
    incrementQuantity() {
      this.quantity++;
    },
    async handleCart() {
      const productStore = useProductStore();
      if (this.quantity > 0) {
        const existingProduct = productStore.cart.find(
          (p) => p.id === this.product.id
        );
        if (existingProduct) {
          // Show modal that the product is already selected
          this.showModal = true;
        } else {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const img = new Image();
          img.src = this.product.image;
          await new Promise((resolve) => (img.onload = resolve));
          canvas.width = img.width / 2; // ajuster la largeur de l'image pour la compresser
          canvas.height = img.height / 2; // ajuster la hauteur de l'image pour la compresser
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedImage = canvas.toDataURL("image/jpeg", 0.5); // compression de l'image
          productStore.addToCart({
            name: this.product.name,
            price: this.product.price,
            unit: this.product.unit,
            quantity: this.quantity,
            image: compressedImage, // utilisation de l'image compressée
            id: this.product.id,
          });
        }
        this.quantity = 0;
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
