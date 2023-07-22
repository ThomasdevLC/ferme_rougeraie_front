<template>
  <div class="product">
    <div class="product__image">
      <img :src="product.image" alt="photo produit" />
      <div class="product__image__limited" v-if="product.limited"></div>
    </div>
    <div class="product__infos">
      <p class="product__infos__name">{{ product.name }}</p>
      <p class="product__infos__price">
        {{ priceToEuros(product.price) }} / <span> {{ product.unit }}</span>
      </p>
    </div>

    <div class="product__quantity">
      <div class="product__quantity__eval">
        <button
          class="product__quantity__eval__btn"
          @click="
            decrementQuantity();
            handleChange();
          "
        >
          -
        </button>
        <div
          v-if="product.interval"
          class="product__quantity__eval__unit"
          style="width: 23px"
        >
          {{ quantity.toFixed(1) }}
          <span class="product__quantity__eval__weight"> kg</span>
        </div>
        <div v-else class="product__quantity__eval__unit">{{ quantity }}</div>
        <button
          class="product__quantity__eval__btn"
          @click="
            incrementQuantity();
            handleChange();
          "
        >
          +
        </button>
      </div>
    </div>
    <div class="product__total">
      {{ priceToEuros(totalPrice) }}
    </div>
    <div
      class="material-icons product__delete"
      @click="productStore.deleteCartProduct(product.id)"
    >
      clear
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import { priceToEuros } from "../utils/priceToEuros";

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
      return this.quantity * this.product.price;
    },
  },
  methods: {
    priceToEuros,

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
        totalPrice: this.totalPrice,
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

<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;

.product {
  display: flex;
  align-items: center;
  justify-content: space-around;
  // width: 600px;
  column-gap: 30px;
  border-bottom: 1px solid #ddd;
  padding: 15px;

  @include mixin.xs {
    flex-direction: column;
    padding: 10px;
  }

  &__image {
    display: flex;
    align-items: center;
    position: relative;

    & img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      object-fit: cover;
    }
    &__limited {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background-color: var(--primary);
      border: 2px solid white;
      position: absolute;
      top: 0;
      left: 1px;
    }
  }

  &__infos {
    width: 180px;

    @include mixin.xs {
      display: flex;
      justify-content: space-around;
      align-items: center;
      row-gap: 20px;
    }

    &__name {
      line-height: 20px;
      font-weight: 500;
    }

    &__price {
      font-size: 14px;
      line-height: 0px;

      @include mixin.xs {
        display: none;
      }
    }
  }

  &__quantity {
    &__eval {
      display: flex;
      @include mixin.xs {
        margin-bottom: 10px;
      }

      &__btn {
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
  &__total {
    font-size: 18px;
    width: 90px;
    text-align: right;

    @include mixin.sm-lt {
      font-size: 14px;
    }
    @include mixin.xs {
      font-size: 14px;
      text-align: center;
      margin-bottom: 16px;
    }
  }

  &__delete:hover {
    color: black;
    cursor: pointer;
  }
}
</style>
