<template>
  <tbody>
    <tr>
      <td>{{ order.id }}</td>
      <td>{{ order.date }}</td>
      <td class="contact">
        {{ order.name }} <br />
        {{ order.email }} <br />
        {{ order.telephone }}
      </td>
      <td>
        <ul>
          <li v-for="product in order.products" :key="product.name">
            - {{ product.quantity }}
            <span v-if="product.unit === 'kg'">kg</span> {{ product.name }} -
            {{ product.totalPrice }} €
          </li>
        </ul>
      </td>
      <td>{{ order.total }} €</td>
      <td class="status">
        <i
          class="fa-regular fa-circle"
          v-if="order.status === 'pending'"
          @click="toggleStatus"
        >
        </i>

        <i
          class="fa-solid fa-circle-check"
          v-else
          @click="toggleStatus"
          :class="{ selected: order.status === 'done' }"
        >
        </i>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";

export default {
  props: ["order"],
  methods: {
    toggleStatus() {
      const productStore = useProductStore();
      this.order.status = this.order.status === "pending" ? "done" : "pending";
      productStore.changeOrderStatus(this.order.id, this.order);
    },
  },
};
</script>

<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;

tbody {
  border-bottom: 1px solid var(--gray-3);
}

tr {
  width: 100%;

  @include mixin.xs {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 10px 0;
  }
}

td {
  text-align: center;
}

th {
  background-color: var(--gray-2);
}

// tr:nth-child(even) {
//   background-color: var(--gray-2);
// }

ul {
  list-style: none;
  padding-left: 40px;
  text-align: left;
}

i {
  cursor: pointer;
  font-size: 20px;
}

.selected {
  color: var(--primary);
}
</style>
