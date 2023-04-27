<template>
  <form @submit.prevent="handleSubmit">
    <h3>Formulaire de commande</h3>
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
      // Envoi de l'objet order au backend pour traiter la commande
      // Vide le panier après avoir validé la commande
      this.productStore.clearCart();
    },
  },
};
</script>
