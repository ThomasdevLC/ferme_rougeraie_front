<template>
  <form class="form" @submit.prevent="submitPassword">
    <div class="form__top">
      <i class="material-icons">lock_outline</i>
      <input type="password" id="password" v-model="inputPassword" />
    </div>

    <button class="btn" type="submit">connexion</button>
    <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useProductStore } from "../stores/ProductStore";

export default {
  setup() {
    const productStore = useProductStore();

    const inputPassword = ref("DixFruitsEtlegumes!");
    const errorMessage = ref(null);

    const submitPassword = async (event) => {
      event.preventDefault();

      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: inputPassword.value,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const token = data.token; // get token from  backend

          // Set token in storage
          sessionStorage.setItem("token", token);
          productStore.isLoggedIn = true;
          productStore.accessToken = token;
          console.log(productStore.accessToken);

          //call initialize
          await initialize();
        } else {
          throw new Error(data.message); //  backend errors
        }

        inputPassword.value = "";
      } catch (error) {
        console.error(error);
        errorMessage.value = error.message;
      }
    };

    const initialize = () => {
      return new Promise((resolve, reject) => {
        const token = sessionStorage.getItem("token");
        if (token) {
          // Placeholder pour votre logique d'initialisation

          console.log("accessToken ", productStore.accessToken);
          resolve();
        } else {
          reject(new Error("Token not found"));
        }
      });
    };

    return { inputPassword, submitPassword, errorMessage };
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
