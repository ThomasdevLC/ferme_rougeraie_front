<template>
  <div class="admin">
    <div v-if="!productStore.isLoggedIn">
      <AuthLogin />
    </div>
    <div v-else>
      <div class="admin-btn">
        <i class="fa-solid fa-carrot" :class="{ selected: selected === 'products' }" @click="selected = 'products'"></i>
        <i class="fa-solid fa-receipt" :class="{ selected: selected === 'orders' }" @click="selected = 'orders'"></i>
        <i class="fa-solid fa-list-ol" :class="{ selected: selected === 'count' }" @click="selected = 'count'"> </i>
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
import AdminOrders from "../components/admin/AdminOrders.vue";
import AdminProducts from "../components/admin/AdminProducts.vue";
import AdminCount from "../components/admin/AdminCount.vue";
import AuthLogin from "../components/auth/AuthLogin.vue";

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
@use "../assets/styles/mixins" as mixin;

.admin {
  padding-top: 199px;

  @include mixin.sm-lt {
    margin-top: 140px;
  }
}

.admin-btn {
  display: flex;
  justify-content: center;
  column-gap: 20px;
  padding: 30px;
  background: var(--gray-3);
}

i {
  font-size: 34px;
  padding: 0 20px;
  cursor: pointer;
}

i.selected {
  color: var(--gray-1);
}
i:hover {
  color: var(--gray-2);
}
</style>
