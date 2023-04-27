<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Nom :</label>
      <input type="text" id="name" v-model="name" required />
    </div>
    <div>
      <label for="email">Email :</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="telephone">Téléphone :</label>
      <input type="text" id="telephone" v-model="telephone" required />
    </div>

    <button type="submit">Passer commande</button>
  </form>
</template>
<script>
import { useProductStore } from "../stores/ProductStore";

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
    };
  },
  methods: {
    handleSubmit() {
      const order = {
        name: this.name,
        email: this.email,
        telephone: this.telephone,

        products: this.productStore.cart.map((product) => ({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
        })),
      };
      console.log(order);

      this.productStore.clearCart();

      // emit an event to trigger thanksModal in the parent component
      this.$emit("submit-form");
    },
  },
};
</script>
