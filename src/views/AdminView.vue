<template>
  <div class="admin">
    <div v-if="!productStore.isLoggedIn">
      <AuthLogin />
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
import { useProductStore } from "../stores/ProductStore";

import AdminOrders from "../components/AdminOrders.vue";
import AdminProducts from "../components/AdminProducts.vue";
import AdminCount from "../components/AdminCount.vue";
import AuthLogin from "../components/AuthLogin.vue";

export default {
  components: {
    AdminOrders,
    AdminProducts,
    AdminCount,
    AuthLogin,
  },
  setup() {
    const selected = ref("products");
    const productStore = useProductStore();
    productStore.getOrders();

    return { selected, productStore };
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
