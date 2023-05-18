<template>
  <div class="product">
    <div class="product__infos">
      <div class="product__infos__image">
        <img :src="product.image" alt="photo produit" />
      </div>
      <h4 class="product__infos__name">{{ product.name }}</h4>
      <p class="product__infos__price">
        {{ priceToEuros(product.price) }} / <span> {{ product.unit }}</span>
        <span class="product__infos__inter" v-if="product.interval">
          - inter {{ product.interval }}
        </span>
      </p>
    </div>

    <div class="product__icons">
      <div class="overlay" v-if="showModal" @click="closeModal"></div>
      <div class="modal" v-if="showModal"><EditModal :product="product" /></div>

      <i
        v-if="product.isDisplayed"
        class="material-icons"
        @click="productStore.toggleDisplay(product._id)"
        >visibility</i
      >
      <i
        v-else
        class="material-icons"
        :class="{ active: !product.isDisplayed }"
        @click="productStore.toggleDisplay(product._id)"
        >visibility_off</i
      >

      <i
        class="material-icons"
        @click="productStore.toggleLimited(product._id)"
        :style="{ color: product.limited ? 'var(--primary)' : '' }"
        >priority_high</i
      >
      <i class="material-icons" @click="openModal">edit</i>

      <i class="material-icons" @click="productStore.deleteProduct(product._id)"
        >delete</i
      >
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import { priceToEuros } from "../utils/priceToEuros";

import EditModal from "./EditModal.vue";

export default {
  props: ["product"],
  components: { EditModal },
  setup() {
    const productStore = useProductStore();

    return { productStore };
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    priceToEuros,
  },
};
</script>

<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;

.product {
  padding: 10px;
  background: #fff;
  margin-top: 20px;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include mixin.xs {
    padding: 20px;

    flex-direction: column;
  }

  &__infos {
    display: flex;
    align-items: center;
    @include mixin.xs {
      flex-direction: column;
    }

    &__image {
      overflow: hidden;
      border-radius: 6px;
      width: 60px;
      height: 60px;
      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__name,
    &__price,
    &__inter {
      margin-left: 15px;
      @include mixin.xs {
        margin-left: 0px;
      }
    }
  }

  &__icons {
    & i {
      font-size: 22px;
      margin-left: 6px;
      color: var(--gray-3);
      cursor: pointer;
      @include mixin.xs {
        margin-left: 16px;
      }
    }
    & i.active {
      color: var(--text-color);
    }
    & i:hover {
      color: var(--gray-4);
    }
  }
}
</style>
