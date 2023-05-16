<template>
  <div class="cartform">
    <div v-if="!validatedCart" class="cartform__validate">
      <button @click="handleValidate">Valider panier</button>
    </div>
    <form v-else @submit.prevent="handleSubmit">
      <div>
        <label for="name"></label>
        <input
          type="text"
          id="name"
          placeholder="Nom "
          v-model="name"
          required
        />
      </div>
      <div>
        <label for="email"></label>
        <input
          type="email"
          id="email"
          placeholder="email "
          v-model="email"
          required
        />
      </div>
      <div>
        <label for="telephone"></label>
        <input
          type="text"
          id="telephone"
          placeholder="Téléphone "
          v-model="telephone"
          required
        />
      </div>

      <button type="submit">Passer commande</button>
    </form>
  </div>
</template>
<script>
import { useProductStore } from "../stores/ProductStore";
import { formatDate } from "../utils/dateFormat.js";

export default {
  setup() {
    const productStore = useProductStore();

    return { productStore };
  },
  data() {
    return {
      name: "",
      email: "",
      telephone: "",
      validatedCart: false,
    };
  },

  methods: {
    handleValidate() {
      return (this.validatedCart = true);
    },

    handleSubmit() {
      const productStore = useProductStore();

      const order = {
        name: this.name,
        email: this.email,
        telephone: this.telephone,

        products: this.productStore.cart.map((product) => ({
          name: product.name,
          quantity: product.quantity.toFixed(2),
          unit: product.unit,
          totalPrice: product.totalPrice,
        })),
        total: productStore.totalCart,
        date: formatDate(new Date()),
        status: "pending",
      };
      productStore.addOrder(order);
      this.productStore.clearCart();
      // emit event to trigger thanksModal in the parent component
      this.$emit("submit-form");
    },
  },
};
</script>
<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;

.cartform__validate {
  display: flex;
  margin: 40px auto 0;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
}

input {
  display: grid;
  grid-template-columns: auto 1fr;
  margin: auto;
  margin-bottom: 10px;
  border: 1px solid #555;
  width: 360px;
  padding: 10px;
  color: #555;
  font-size: 16px;
  outline: none;

  @include mixin.xs {
    width: 230px;
  }
}

button {
  background: #fe8401;
  color: white;
  padding: 10px;
  border: 0;
  font-size: 16px;
  margin: 10px auto 0;
  cursor: pointer;
}
</style>
