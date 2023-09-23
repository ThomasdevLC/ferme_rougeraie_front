<template>
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
        this.$emit("quantity-updated", this.quantity);
      }
    },
    incrementQuantity() {
      const interval = this.product.interval || 1;
      this.quantity += interval;
      this.$emit("quantity-updated", this.quantity);
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  &__text {
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
  }
}
</style>
