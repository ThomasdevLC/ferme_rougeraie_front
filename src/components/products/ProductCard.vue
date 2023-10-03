<template>
  <div class="card" :title="product.name">
    <div class="card__image">
      <p v-if="product.limited" class="card__image__limited">Quantité limitée</p>
      <img :src="product.imagePath" alt="photo produit" loading="lazy" />
    </div>
    <div class="card__text">
      <p class="card__text__name">
        {{ product.name }}
      </p>
      <p class="card__text__price">
        {{ priceToEuros(product.price) }} / <span> {{ product.unit }}</span>
      </p>
      <div class="card__text__quantity">
        <div class="card__text__quantity__eval">
          <button @click="decrementQuantity" class="card__text__quantity__eval__button">-</button>
          <div v-if="product.interval" class="card__text__quantity__eval__unit" style="width: 23px">
            {{ quantity.toFixed(1) }}
            <span class="card__text__quantity__eval__weight"> kg</span>
          </div>
          <div v-else class="card__text__quantity__eval__unit">
            {{ quantity }}
          </div>
          <button @click="incrementQuantity" class="card__text__quantity__eval__button">+</button>
        </div>
      </div>

      <p class="card__text__addcart" @click="addToCart">AJOUTER AU PANIER</p>
    </div>
    <div class="overlay" v-if="showModal" @click="closeModal"></div>
    <div class="modal" v-if="showModal">
      <p class="alert-add">produit déjà ajouté !</p>
      <div class="cross-modal" @click="closeModal">
        <i class="fa-solid fa-x"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../../stores/ProductStore";
import QuantityManager from "./QuantityManager.vue";
import { compressImage } from "../../utils/imageUtils";
import { priceToEuros } from "../../utils/priceToEuros";

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
      return this.quantity * this.product.price;
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
    priceToEuros,

    async addToCart() {
      const productStore = useProductStore();
      if (this.quantity > 0) {
        const existingProduct = productStore.cart.find((p) => p.id === this.product._id);
        if (existingProduct) {
          // Show modal that the product is already selected
          this.showModal = true;
          this.quantity = 0;
        } else {
          const compressedImage = await compressImage(this.product.imagePath);
          productStore.addToCart({
            name: this.product.name,
            price: this.product.price,
            unit: this.product.unit,
            quantity: this.quantity,
            interval: this.product.interval,
            limited: this.product.limited,
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
@use "../../assets/styles/mixins" as mixin;

.card {
  border: 1px solid gray;
  background: white;
  display: flex;
  flex-direction: column;
  max-width: 260px;
  height: 440px;
  position: relative;

  &__image {
    height: 280px;
    overflow: hidden;

    & img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }

    &__limited {
      position: absolute;
      bottom: 165px;
      background-color: var(--primary);
      color: white;
      padding: 5px 10px;
      font-weight: 500;
      margin-left: -5px;

      @include mixin.sm-lt {
        bottom: 210px;
      }
    }
  }

  &__text {
    width: 240px;
    padding: 10px 10px 0 10px;

    &__name {
      line-height: 1.3;
      margin: -1px 0;
      font-family: var(--font-family-titles);
      font-size: 31px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      @include mixin.sm-lt {
        text-overflow: clip;
        white-space: normal;
      }
    }
    &__price {
      line-height: 1;
    }
    &__quantity {
      &__eval {
        display: flex;

        &__button {
          background-color: white;
          border: 1px solid var(--text-color);
          color: var(--text-color);
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
          border-top: 1px solid var(--text-color);
          border-bottom: 1px solid var(--text-color);
        }

        &__weight {
          font-size: 12px;
        }
      }
    }

    &__addcart {
      font-weight: 500;
      margin-top: 12px;
      cursor: pointer;

      &:hover {
        color: var(--light-primary);
      }
    }
  }
}

.alert-add {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  margin-top: 30px;
}
</style>
