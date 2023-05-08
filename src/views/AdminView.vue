<template>
  <div class="admin">
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
      <i class="fa-solid fa-list-ol"></i>
    </div>
    <div v-if="selected === 'products'">
      <AdminProducts />
    </div>
    <div v-else-if="selected === 'orders'">
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
    const selected = ref("products");
    return { selected };
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
  font-size: 28px;
  padding: 0 10px;
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
