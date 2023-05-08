<template>
  <!-- filter -->
  <div class="orders">
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
    <div>
      <p>
        {{ orders.length }} commande<span v-if="orders.length > 1">s</span>
        <span v-if="filter === 'pending'"> en cours</span>
        <span v-if="filter === 'done'">
          traitée<span v-if="orders.length > 1">s</span></span
        >
      </p>
      <table>
        <thead>
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
          v-for="order in orders"
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
    const filter = ref("all");

    return { productStore, filter };
  },

  methods: {
    handleDeleteAll() {
      const productStore = useProductStore();
      if (confirm("Voulez-vous vraiment supprimer toutes les commandes ?")) {
        productStore.clearOrders();
        alert("commandes supprimées");
      }
    },
  },

  computed: {
    orders() {
      switch (this.filter) {
        case "all":
          return this.productStore.orders;
        case "pending":
          return this.productStore.pendingOrders;
        case "done":
          return this.productStore.doneOrders;
        default:
          return [];
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;

.orders {
  max-width: 1200px;
  padding: 40px;
  margin: auto;
}

button {
  max-width: 90px;
}

table {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}

thead {
  background-color: var(--gray-2);
  @include mixin.xs {
    display: none;
  }
}

th {
  text-align: center;
}

i {
  font-size: 24px;
  padding: 0 20px;
  cursor: pointer;
}

i:hover {
  color: var(--primary);
}
</style>
