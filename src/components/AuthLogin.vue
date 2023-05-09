<template>
  <form @submit.prevent="submitPassword">
    <label for="password">Password:</label>
    <input type="password" id="password" v-model="inputPassword" />
    <button type="submit">Submit</button>
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

<style></style>
