import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    cart: [],
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
  },

  actions: {
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
    },

    async deleteProduct(id) {
      console.log("hello delete product");
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

    async addToCart(product) {
      this.cart.push(product);
      const res = await fetch("http://localhost:3000/cart", {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },
  },
});
