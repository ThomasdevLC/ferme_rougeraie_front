<template>
  <div class="orders">
    <div class="orders__header">
      <p>COMMANDES</p>
    </div>

    <div class="orders__pickup">
      <p
        class="orders__pickup__day"
        @click="
          dayFilter = dayFilter === 'mardi' ? ['mardi', 'vendredi'] : 'mardi'
        "
        :class="{ 'orders__pickup__day--selected': dayFilter === 'mardi' }"
      >
        Mardi
      </p>

      <p
        class="orders__pickup__day"
        @click="
          dayFilter =
            dayFilter === 'vendredi' ? ['mardi', 'vendredi'] : 'vendredi'
        "
        :class="{ 'orders__pickup__day--selected': dayFilter === 'vendredi' }"
      >
        Vendredi
      </p>
    </div>

    <nav class="orders__status filter">
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
    </nav>

    <div>
      <p>
        {{ orders.length }} commande<span v-if="orders.length > 1">s</span>
        <span v-if="filter === 'pending'"> en cours</span>
        <span v-if="filter === 'done'"
          >traitée<span v-if="orders.length > 1">s</span></span
        >
      </p>
      <i class="fa-solid fa-print" @click="handlePrint"></i>
      <i class="fa-solid fa-trash-can" @click="handleDeleteAll"></i>
      <table id="printTable">
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
import { handlePrint } from "../utils/printModule";
import AdminSingleOrder from "./AdminSingleOrder.vue";

export default {
  components: { AdminSingleOrder },

  setup() {
    const productStore = useProductStore();
    productStore.getOrders();

    const dayFilter = ref(["mardi", "vendredi"]);
    const filter = ref("all");

    return { productStore, filter, dayFilter };
  },

  methods: {
    handleDeleteAll() {
      const productStore = useProductStore();
      if (confirm("Voulez-vous vraiment supprimer toutes les commandes ?")) {
        productStore.clearOrders();
        alert("commandes supprimées");
      }
    },
    handlePrint,
  },

  computed: {
    orders() {
      switch (this.filter) {
        case "all":
          return this.productStore.orders.filter((o) =>
            this.dayFilter.includes(o.pickup)
          );
        case "pending":
          return this.productStore.pendingOrders.filter((o) =>
            this.dayFilter.includes(o.pickup)
          );
        case "done":
          return this.productStore.doneOrders.filter((o) =>
            this.dayFilter.includes(o.pickup)
          );
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

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    & p {
      font-size: 28px;
    }
  }

  &__pickup {
    display: flex;
    justify-content: flex-end;
    column-gap: 40px;

    &__day {
      font-size: 20px;
      font-weight: 700;
      color: var(--gray-5);
      &:hover {
        cursor: pointer;
        color: var(--light-primary);
      }
    }

    &__day--selected {
      color: var(--primary);
    }
  }
}

button {
  width: 90px;
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
