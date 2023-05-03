<template>
  <div class="orders-list">
    <p>{{ productStore.orderCount }} commandes</p>
    <table>
      <thead v-if="productStore.orders.length > 0">
        <tr>
          <th>N°</th>
          <th>date</th>
          <th>contact</th>
          <th>produits</th>
          <th>total</th>
          <th>status</th>
        </tr>
      </thead>
      <AdminSingleOrder
        v-for="order in productStore.orders"
        :key="order.id"
        :order="order"
      />
    </table>
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import AdminSingleOrder from "./AdminSingleOrder.vue";

export default {
  components: { AdminSingleOrder },

  setup() {
    const productStore = useProductStore();
    productStore.getOrders();

    return { productStore };
  },
};
</script>

<style scoped>
.orders-list {
  max-width: 1200px;
  padding: 40px;
  margin: auto;
}
table {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
</style>
