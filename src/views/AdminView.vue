<template>
  <div class="admin">
    <div v-if="!isLoggedIn">
      <form @submit.prevent="submitPassword">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="inputPassword" />
        <button type="submit">Submit</button>
      </form>
    </div>
    <div v-else>
      <div class="admin-btn">
        <i
          class="fa-solid fa-carrot"
          :class="{ selected: selected === 'products' }"
          @click="selected = 'products'"
        ></i>
        <i
          class="fa-solid fa-receipt"
          :class="{ selected: selected === 'orders' }"
          @click="selected = 'orders'"
        ></i>
        <i
          class="fa-solid fa-list-ol"
          :class="{ selected: selected === 'count' }"
          @click="selected = 'count'"
        >
        </i>
        <i class="fa-solid fa-arrow-right-from-bracket" @click="logout"></i>
      </div>
      <div v-if="selected === 'products'">
        <AdminProducts />
      </div>
      <div v-else-if="selected === 'orders'">
        <AdminOrders />
      </div>
      <div v-else-if="selected === 'count'">
        <AdminCount />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import AdminOrders from "../components/AdminOrders.vue";
import AdminProducts from "../components/AdminProducts.vue";
import AdminCount from "../components/AdminCount.vue";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default {
  components: {
    AdminOrders,
    AdminProducts,
    AdminCount,
  },
  setup() {
    const selected = ref("products");
    const inputPassword = ref("DixFruitsEtlegumes!");
    const isLoggedIn = ref(false);

    return { selected, inputPassword, isLoggedIn };
  },

  methods: {
    submitPassword(event) {
      event.preventDefault(); // prevent form submission
      // Simulate server authentication
      if (this.inputPassword.value === ADMIN_PASSWORD) {
        const token = "mytoken"; // Generate a random token
        sessionStorage.setItem("token", token); // Store token in session storage
        this.isLoggedIn = true; // Set isLoggedIn to true
      }
      this.inputPassword = "";
    },

    logout() {
      sessionStorage.removeItem("token"); // Remove token from session storage
      this.isLoggedIn = false; // Set isLoggedIn to false
      this.$router.push({ name: "ProductsView" });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-btn {
  display: flex;
  justify-content: center;
  column-gap: 20px;
  padding: 30px;
}

button {
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
  width: 140px;
  cursor: pointer;
  color: #333;
  background: #bbbbbb;
  transition: all 0.6s;
}

i {
  font-size: 34px;
  padding: 0 20px;
  cursor: pointer;
}

i.selected {
  color: var(--primary);
}
i:hover {
  color: var(--light-primary);
  opacity: 0.7;
}
</style>
