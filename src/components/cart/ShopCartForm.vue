<template>
  <div class="cartform">
    <div v-if="!validatedCart" class="cartform__validate">
      <button @click="handleValidate">Valider panier</button>
    </div>
    <form v-else @submit.prevent="handleSubmit">
      <div>
        <label for="name"></label>
        <input class="custom-input" type="text" id="name" placeholder="Prénom " v-model="name" required />
      </div>
      <div>
        <label for="surname"></label>
        <input class="custom-input" type="text" id="surname" placeholder="Nom " v-model="surname" required />
      </div>

      <div>
        <label for="phone"></label>
        <input class="custom-input" type="text" id="phone" pattern="[0-9]{10,}" maxlength="10" placeholder="Téléphone " v-model="phone" required />
      </div>
      <div>
        <select v-model="pickup" required class="custom-input">
          <option value="" disabled selected hidden>Jour de retrait</option>
          <option value="mardi">mardi - 16h à 19h</option>
          <option value="vendredi">vendredi - 16h à 19h</option>
        </select>
      </div>

      <button type="submit">Passer commande</button>
      <div class="cartform__error" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>
<script>
import { useProductStore } from "../../stores/ProductStore";
import { formatDate } from "../../utils/dateFormat.js";

export default {
  setup() {
    const productStore = useProductStore();

    return { productStore };
  },
  data() {
    return {
      name: "",
      surname: "",
      pickup: "",
      phone: "",
      validatedCart: false,
      errorMessage: "",
    };
  },

  methods: {
    handleValidate() {
      this.validatedCart = true;
    },
    handleSubmit() {
      const productStore = useProductStore();

      if (
        (this.pickup === "mardi" && productStore.currentDay === "lundi" && productStore.currentHour > "21:00") ||
        (this.pickup === "vendredi" && productStore.currentDay === "jeudi" && productStore.currentHour > "21:00") ||
        productStore.currentDay === "mardi" ||
        productStore.currentDay === "vendredi"
      ) {
        this.errorMessage = "Désolé, les commandes doivent être passées avant 21h00 la veille du jour de vente. Veuillez choisir un autre jour de retrait";
        return;
      }

      const order = {
        name: this.name,
        surname: this.surname,
        pickup: this.pickup,
        phone: this.phone,
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
      this.$emit("submit-form");
    },
  },
};
</script>
<style scoped lang="scss">
@use "../../assets/styles/mixins" as mixin;

.cartform {
  &__validate {
    display: flex;
    margin: 40px auto 0;
  }
  &__error {
    text-align: center;
    margin: 10px auto 0;
    width: 500px;
  }
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
  color: var(--gray-4);

  @include mixin.xs {
    width: 230px;
  }
}

option {
  color: var(--text-color);
}

button {
  background: var(--primary);
  color: white;
  padding: 10px;
  border: 0;
  font-size: 16px;
  margin: 10px auto 0;
  cursor: pointer;
}
</style>
