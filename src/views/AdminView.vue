<template>
  <div class="admin br">
    <div class="admin-btn">
      <button
        @click="nested = 'products'"
        :class="{ selected: nested === 'products' }"
      >
        produits
      </button>
      <button
        @click="nested = 'orders'"
        :class="{ selected: nested === 'orders' }"
      >
        commandes
      </button>
    </div>
    <div v-if="nested === 'products'">
      <AdminProducts />
    </div>
    <div v-else-if="nested === 'orders'">
      <AdminOrders />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import AdminOrders from "../components/AdminOrders.vue";
import AdminProducts from "../components/AdminProducts.vue";

export default {
  components: {
    AdminOrders,
    AdminProducts,
  },
  setup() {
    const nested = ref("products");
    return { nested };
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

button.selected {
  background: #ffd859;
  font-weight: 700;
  color: #333;
}
button:hover {
  font-weight: 700;
}
</style>
