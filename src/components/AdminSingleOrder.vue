<template>
  <tbody>
    <tr>
      <td>{{ orderNumber }}</td>
      <td>{{ order.date }}</td>
      <td class="contact">
        {{ order.name }} {{ order.surname }} <br />
        {{ order.phone }} <br />
      </td>
      <td class="pickup">{{ order.pickup }}</td>

      <td>
        <ul>
          <li v-for="product in order.products" :key="product.name">
            -
            <span style="font-weight: 500">{{ product.quantity }}</span>
            <span v-if="product.unit === 'kg'" style="font-weight: 500">
              kg</span
            >
            x
            <span class="product-order">{{ product.name }}</span>
            =
            {{ priceToEuros(product.totalPrice) }}
          </li>
        </ul>
      </td>
      <td class="total">{{ priceToEuros(order.total) }}</td>
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
import { priceToEuros } from "../utils/priceToEuros";

export default {
  props: ["order"],

  computed: {
    orderNumber() {
      const productStore = useProductStore();
      return productStore.orders.indexOf(this.order) + 1;
    },
  },
  methods: {
    async toggleStatus() {
      const productStore = useProductStore();
      const newStatus = this.order.status === "pending" ? "done" : "pending";
      await productStore.changeOrderStatus(this.order._id, {
        status: newStatus,
      });

      console.log(this.order._id, newStatus);
    },
    priceToEuros,
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

  @include mixin.sm-lt {
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

.pickup {
  @include mixin.xs {
    &::before {
      content: "Retrait : ";
      font-weight: 600;
    }
  }
}

.product-order {
  display: inline-flex;
  align-items: center;
  width: 190px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @include mixin.md-lt {
    width: 120px;
  }
}

.total {
  @include mixin.xs {
    &::before {
      content: "Total : ";
      font-weight: 600;
    }
  }
}
</style>
