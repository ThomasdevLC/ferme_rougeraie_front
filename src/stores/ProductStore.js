import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    cart: [],
    orders: [],
    loading: false,
  }),

  getters: {
    displayed() {
      return this.products.filter((p) => p.isDisplayed);
    },

    displayedCount() {
      return this.displayed.length;
    },

    // totalCount: (state) => {
    //   return state.products.length;
    // },
    totalCount() {
      return this.products.length;
    },

    // cart getters:

    cartCount() {
      return this.cart.length;
    },

    totalCart() {
      const total = this.cart.reduce((total, product) => {
        return total + product.quantity * product.price;
      }, 0);
      return total.toFixed(2);
    },

    // order getters:

    orderCount() {
      return this.orders.length;
    },

    pendingOrders() {
      return this.orders.filter((o) => o.status === "pending");
    },

    doneOrders() {
      return this.orders.filter((o) => o.status === "done");
    },
  },

  actions: {
    // PRODUCTS ACTIONS

    async getProducts() {
      this.loading = true;
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      this.products = data;
      this.loading = false;
    },

    async addProduct(product) {
      this.products.push(product);
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },

    async editProduct(id, editedProduct) {
      const productIndex = this.products.findIndex((p) => p.id === id);
      if (productIndex !== -1) {
        this.products[productIndex] = {
          ...this.products[productIndex],
          ...editedProduct,
        };
      }
      const res = await fetch("http://localhost:3000/products/" + id, {
        method: "PATCH",
        body: JSON.stringify(editedProduct),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },

    async deleteProduct(id) {
      this.products = this.products.filter((p) => {
        return p.id !== id;
      });
      const res = await fetch("http://localhost:3000/products/" + id, {
        method: "DELETE",
      });
      if (res.error) {
        console.log(res.error);
      }
    },

    async toggleDisplay(id) {
      const product = this.products.find((p) => p.id === id);
      product.isDisplayed = !product.isDisplayed;

      const res = await fetch("http://localhost:3000/products/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isDisplayed: product.isDisplayed }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },

    // CART ACTIONS LOCALSTORAGE

    addToCart(product) {
      this.cart.push(product);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      console.log("cart", this.cart);
    },

    async editCart(id, updatedProduct) {
      const index = this.cart.findIndex((p) => p.id === id);
      if (index >= 0) {
        const product = { ...this.cart[index], ...updatedProduct };
        this.cart.splice(index, 1, product);
        localStorage.setItem("cart", JSON.stringify(this.cart)); // Update localStorage cart
        return;
      } else {
        throw new Error("Product not found");
      }
    },

    deleteCartProduct(id) {
      this.cart = this.cart.filter((p) => {
        return p.id !== id;
      });
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    clearCart() {
      this.cart = [];
      localStorage.removeItem("cart");
    },

    // ORDERS ACTIONS

    async getOrders() {
      this.loading = true;
      const res = await fetch("http://localhost:3000/orders");
      const data = await res.json();
      this.orders = data;
      this.loading = false;
    },

    async addOrder(order) {
      this.orders.push(order);
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },

    async changeOrderStatus(id, updatedOrder) {
      const orderIndex = this.orders.findIndex((o) => o.id === id);
      if (orderIndex !== -1) {
        this.orders[orderIndex] = {
          ...this.orders[orderIndex],
          ...updatedOrder,
        };

        const res = await fetch("http://localhost:3000/orders/" + id, {
          method: "PATCH",
          body: JSON.stringify(updatedOrder),
          headers: { "Content-Type": "application/json" },
        });

        if (res.error) {
          console.log(res.error);
        }
      }
    },
    async clearOrders() {
      this.orders = [];
      const res = await fetch("http://localhost:3000/orders", {
        method: "DELETE",
      });
      if (res.error) {
        console.log(res.error);
      }
    },
  },
});
