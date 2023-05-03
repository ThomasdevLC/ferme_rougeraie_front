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
          v-if="order.status === 'pending'"
          class="material-icons"
          @click="toggleStatus"
        >
          radio_button_unchecked
        </i>
        <i
          v-else
          class="material-icons"
          @click="toggleStatus"
          :class="{ selected: order.status === 'done' }"
        >
          check_circle_outline
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

<style>
table {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}

tbody {
  border-bottom: 1px solid black;
}

tr {
  width: 100%;
}

td {
  /* padding: 8px; */
  text-align: center;
}

th {
  background-color: #eee;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

ul {
  list-style: none;
  padding-left: 40px;
  text-align: left;
}

i {
  cursor: pointer;
}

.selected {
  color: #ffd859;
}
</style>
