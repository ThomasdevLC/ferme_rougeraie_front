<template>
  <form class="form" @submit.prevent="submitPassword">
    <div class="form__top">
      <i class="material-icons">lock_outline</i>
      <input type="password" id="password" v-model="inputPassword" />
    </div>

    <button class="btn" type="submit">connexion</button>
  </form>
</template>

<script>
import { ref } from "vue";

import { useProductStore } from "../stores/ProductStore";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default {
  setup() {
    const inputPassword = ref("DixFruitsEtlegumes!");
    const productStore = useProductStore();

    return { inputPassword, productStore };
  },
  methods: {
    submitPassword(event) {
      event.preventDefault(); // prevent form submission
      // Simulate server authentication
      if (this.inputPassword.value === ADMIN_PASSWORD) {
        const token = "mytoken"; // Generate a random token
        sessionStorage.setItem("token", token); // Store token in session storage
        this.productStore.isLoggedIn = true; // Set isLoggedIn to true
      }
      this.inputPassword = "";
    },
  },
};
</script>

<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;

.form {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 60px;
  &__top {
    display: flex;
  }
}

i {
  background: white;
  padding: 10px 14px;
  border: 1px solid var(--gray-4);
  border-right: none;
}

input {
  padding: 10px 14px;
  font-size: 16px;
  outline: none;
}
</style>
