<template>
  <div class="orders">
    <DayFilter @update:dayFilter="dayFilter = $event" />
    <nav class="orders__status filter">
      <button @click="filter = 'all'" :class="{ selected: filter === 'all' }">reçues</button>
      <button @click="filter = 'pending'" :class="{ selected: filter === 'pending' }">en cours</button>
      <button @click="filter = 'done'" :class="{ selected: filter === 'done' }">traitées</button>
    </nav>
    <div class="orders__infos">
      <p class="orders__infos__length">
        {{ orders.length }} commande<span v-if="orders.length > 1">s</span>
        <span v-if="filter === 'pending'"> en cours</span>
        <span v-if="filter === 'done'"> traitée<span v-if="orders.length > 1">s</span></span>
      </p>
      <div class="orders__infos__function">
        <i class="fa-solid fa-print" @click="handlePrint"></i>
        <i class="fa-solid fa-trash-can" @click="handleDeleteAllDone"></i>
      </div>
    </div>
    <div>
      <table id="printTable">
        <thead>
          <tr>
            <th>N°</th>
            <th>date</th>
            <th>contact</th>
            <th>retrait</th>
            <th>produits</th>
            <th>total</th>
            <th>statut</th>
          </tr>
        </thead>

        <AdminSingleOrder v-for="order in orders" :key="order.id" :order="order" />
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { useProductStore } from "../../stores/ProductStore";
import { handlePrint } from "../../utils/printModule";
import AdminSingleOrder from "./AdminSingleOrder.vue";
import DayFilter from "./DayFilter.vue";

export default {
  components: { AdminSingleOrder, DayFilter },

  setup() {
    const productStore = useProductStore();

    const dayFilter = ref([]);
    const filter = ref("all");
    console.log(dayFilter.value);
    return { productStore, filter, dayFilter };
  },

  methods: {
    handleDeleteAllDone() {
      const productStore = useProductStore();
      if (confirm("Voulez-vous vraiment supprimer toutes les commandes traitées?")) {
        productStore.clearOrders();
        alert("commandes traitées supprimées");
      }
    },
    handlePrint,
  },

  computed: {
    orders() {
      switch (this.filter) {
        case "all":
          return this.productStore.orders.filter((o) => this.dayFilter.includes(o.pickup));
        case "pending":
          return this.productStore.pendingOrders.filter((o) => this.dayFilter.includes(o.pickup));
        case "done":
          return this.productStore.doneOrders.filter((o) => this.dayFilter.includes(o.pickup));
        default:
          return [];
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as mixin;

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

  &__infos {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__length {
      font-size: 19px;
      @include mixin.xs {
        font-size: 16px;
      }
    }
    &__function {
      display: flex;
      column-gap: 25px;
      & i {
        padding: 0;
      }
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
  @include mixin.sm-lt {
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
