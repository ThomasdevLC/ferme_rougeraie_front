<template>
  <div class="card">
    <div class="card__image">
      <img :src="product.image" alt="photo produit" />
    </div>
    <div class="card__text">
      <p class="card__text__name">{{ product.name }}</p>
      <p class="card__text__price">
        {{ product.price }} € / <span> {{ product.unit }}</span>
      </p>
      <div class="card__text__quantity">
        <div class="card__text__quantity__eval">
          <button
            @click="decrementQuantity"
            class="card__text__quantity__eval__button"
          >
            -
          </button>
          <div
            v-if="product.interval"
            class="card__text__quantity__eval__unit"
            style="width: 23px"
          >
            {{ quantity.toFixed(1) }}
            <span class="card__text__quantity__eval__weight"> kg</span>
          </div>
          <div v-else class="card__text__quantity__eval__unit">
            {{ quantity }}
          </div>
          <button
            @click="incrementQuantity"
            class="card__text__quantity__eval__button"
          >
            +
          </button>
        </div>
      </div>
      <!-- <QuantityManager
        :product="product"
        :quantity="quantity"
        @quantity-updated="quantity = $event"
        :key="product.id"
      /> -->
      <p class="card__text__addcart" @click="addToCart">AJOUTER AU PANIER</p>
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
          (p) => p.id === this.product._id
        );
        if (existingProduct) {
          // Show modal that the product is already selected
          this.showModal = true;
        } else {
          const compressedImage = await compressImage(this.product.image);
          productStore.addToCart({
            name: this.product.name,
            price: this.product.price,
            unit: this.product.unit,
            quantity: this.quantity,
            interval: this.product.interval,
            totalPrice: this.totalPrice,
            image: compressedImage,
            id: this.product._id,
          });
          this.quantity = 0;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  border: 1px solid gray;
  background: white;
  display: flex;
  flex-direction: column;
  margin: 10px;
  max-width: 260px;
  height: 440px;
  overflow: hidden;

  &__image {
    height: 280px;
    overflow: hidden;
    /* position: relative; */

    & img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  &__text {
    width: 260px;
    padding: 0 10px;
    line-height: 0;
    display: flex;
    flex-direction: column;
    row-gap: 5px;

    &__name {
      font-family: var(--font-family-titles);
      font-size: 30px;
      margin-bottom: 20px;
    }

    &__quantity {
      &__eval {
        display: flex;

        &__button {
          background-color: white;
          border: 1px solid #000000;
          color: #000000;
          font-size: 10px;
          padding: 3px 10px;
          cursor: pointer;
        }

        &__unit {
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

        &__weight {
          font-size: 12px;
        }
      }
    }

    &__addcart {
      font-weight: 500;
      margin-top: 20px;
      cursor: pointer;

      &:hover {
        color: black;
      }
    }
  }
}
</style>
