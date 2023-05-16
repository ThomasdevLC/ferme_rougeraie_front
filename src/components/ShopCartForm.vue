<template>
  <div class="cartform">
    <div v-if="!validatedCart" class="cartform__validate">
      <button @click="handleValidate">Valider panier</button>
    </div>
    <form v-else @submit.prevent="handleSubmit">
      <div>
        <label for="name"></label>
        <input
          class="custom-input"
          type="text"
          id="name"
          placeholder="Nom "
          v-model="name"
          required
        />
      </div>
      <div>
        <select v-model="pickup" required class="custom-input">
          <option value="null" disabled selected hidden>jour de retrait</option>
          <option value="mardi">mardi</option>
          <option value="vendredi">vendredi</option>
        </select>
      </div>
      <div>
        <label for="telephone"></label>
        <input
          class="custom-input"
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
      pickup: "",
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
        pickup: this.pickup,
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
  row-gap: 10px;
  margin-top: 40px;
}

input {
  border: 1px solid var(--gray-3);
  margin: auto;
  @include mixin.xs {
    width: 230px;
  }
}

select {
  border: 1px solid var(--gray-3);
  padding: 11px;
  margin: auto;
  color: var(--gray-3);

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
