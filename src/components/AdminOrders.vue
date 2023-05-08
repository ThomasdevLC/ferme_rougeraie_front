<template>
  <!-- filter -->

  <div class="orders-list br">
    <nav class="filter">
      <button @click="filter = 'all'" :class="{ selected: filter === 'all' }">
        reçues
      </button>
      <button
        @click="filter = 'pending'"
        :class="{ selected: filter === 'pending' }"
      >
        en cours
      </button>
      <button @click="filter = 'done'" :class="{ selected: filter === 'done' }">
        traitées
      </button>
      <i class="fa-regular fa-circle-xmark" @click="handleDeleteAll"></i>
    </nav>

    <div v-if="filter === 'all'">
      <p>
        {{ productStore.orderCount }} commande<span
          v-if="productStore.orderCount > 1"
          >s</span
        >
      </p>
      <table v-if="filter === 'all'">
        <thead v-if="productStore.orders.length > 0">
          <tr>
            <th>N°</th>
            <th>date</th>
            <th>contact</th>
            <th>produits</th>
            <th>total</th>
            <th>statut</th>
          </tr>
        </thead>

        <AdminSingleOrder
          v-for="order in productStore.orders"
          :key="order.id"
          :order="order"
        />
      </table>
    </div>

    <div v-if="filter === 'pending'">
      <p>
        {{ productStore.pendingOrders.length }} commande<span
          v-if="productStore.pendingOrders > 1"
          >s</span
        >
        en cours
      </p>

      <table>
        <thead v-if="productStore.pendingOrders.length > 0">
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
          v-for="order in productStore.pendingOrders"
          :key="order.id"
          :order="order"
        />
      </table>
    </div>
    <div v-if="filter === 'done'">
      <p>
        {{ productStore.doneOrders.length }} commande
        <span v-if="productStore.doneOrders > 1">s</span> traitée<span
          v-if="productStore.doneOrders > 1"
          >s</span
        >
      </p>
      <table>
        <thead v-if="productStore.doneOrders.length > 0">
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
          v-for="order in productStore.doneOrders"
          :key="order.id"
          :order="order"
        />
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { useProductStore } from "../stores/ProductStore";
import AdminSingleOrder from "./AdminSingleOrder.vue";

export default {
  components: { AdminSingleOrder },

  setup() {
    const productStore = useProductStore();
    productStore.getOrders();
    const filter = ref("all");

    return { productStore, filter };
  },

  methods: {
    handleDeleteAll() {
      const productStore = useProductStore();
      productStore.clearOrders();
    },
  },
};
</script>

<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;

.filter {
  margin: 10px auto;
  text-align: right;
}
.filter button {
  font-size: 15px;
  background: #fff;
  border: 2px solid var(--gray-4);
  margin-left: 10px;
  padding: 8px 10px;
  cursor: pointer;
}

button.selected {
  border: 2px solid var(--secondary);
  color: var(--text-color);
}

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

thead {
  @include mixin.sm-lt {
    display: none;
  }
}

th {
  text-align: center;
}
</style>
