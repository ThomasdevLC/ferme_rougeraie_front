<template>
  <div class="cart">
    <h3 class="cart__thanks" v-if="thanksModal">
      Merci pour votre commande <br />
      À
      <span v-if="productStore.pickupDay === productStore.currentDay"
        >tout à l'heure</span
      >
      <span v-else>{{ productStore.pickupDay }}</span> !
    </h3>
    <p class="cart__info" v-else>
      Votre panier <span v-if="!productStore.cartCount">est vide</span>
    </p>
    <div class="cart__list">
      <div v-for="product in productStore.cart" :key="product">
        <ShopCartDetails :product="product" />
      </div>
    </div>
    <p v-if="productStore.cartCount" class="cart__total">
      Total : {{ priceToEuros(productStore.totalCart) }}
    </p>
    <p v-if="productStore.limitedProducts" class="cart__alert">
      <span class="cart__alert__limited"></span>
      Votre panier contient des produits en quantité limitée. <br />
      Si ces produits ne sont plus disponibles lors du retrait le tarif sera
      actualisé
    </p>
    <div v-if="productStore.cartCount" class="cart__form">
      <ShopCartForm @submit-form="thanksModal = true" />
    </div>
  </div>
  <div v-if="thanksModal" class="vegie">
    <img class="veg veg-one" :src="tomatoe" />
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import ShopCartDetails from "../components/ShopCartDetails.vue";
import ShopCartForm from "../components/ShopCartForm.vue";
import { priceToEuros } from "../utils/priceToEuros.js";
import tomatoe from "../assets/images/tomatoe.png";
import butternut from "../assets/images/butternut.png";
import carrot from "../assets/images/carrot.png";

export default {
  components: { ShopCartDetails, ShopCartForm },

  setup() {
    const productStore = useProductStore();

    return { productStore };
  },
  data() {
    return {
      thanksModal: false,
      tomatoe: tomatoe,
      butternut: butternut,
      carrot: carrot,
    };
  },

  methods: {
    priceToEuros,
  },
};
</script>
<style scoped lang="scss">
.cart {
  position: relative;
  &__info {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  }
  &__total {
    font-size: 20px;
    font-weight: 500;
    text-align: right;
  }
  &__alert {
    font-weight: 400;
    text-align: center;
    &__limited {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background-color: var(--primary);
      display: inline-block;
    }
  }
  &__thanks {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    z-index: 99;
  }
}

.veg {
  position: absolute;
  z-index: 1;
  opacity: 70%;
}

.veg-one {
  top: -20px;
  left: -40px;
  transform: rotate(20deg);
  height: 80px;
}
</style>
