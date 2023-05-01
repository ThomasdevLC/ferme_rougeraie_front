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
            - {{ product.quantity }} {{ product.name }} -
            {{ product.totalPrice }}
          </li>
        </ul>
      </td>
      <td>{{ order.total }}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: ["order"],
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
  text-align: left;
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
  padding: 0;
}
</style>
