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

    cartCount() {
      return this.cart.length;
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

    // CART ACTIONS HTTP

    // async addToCart(product) {
    //   this.cart.push(product);
    //   const res = await fetch("http://localhost:3000/cart/", {
    //     method: "POST",
    //     body: JSON.stringify(product),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   if (res.error) {
    //     console.log(res.error);
    //   }
    // },

    // async editCart(id, editedProduct) {
    //   const productIndex = this.cart.findIndex((p) => p.id === id);
    //   if (productIndex !== -1) {
    //     this.cart[productIndex] = {
    //       ...this.cart[productIndex],
    //       ...editedProduct,
    //     };
    //   }
    //   const res = await fetch("http://localhost:3000/cart/" + id, {
    //     method: "PATCH",
    //     body: JSON.stringify(editedProduct),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   if (res.error) {
    //     console.log(res.error);
    //   }
    // },

    // async deleteCartProduct(id) {
    //   this.cart = this.cart.filter((p) => {
    //     return p.id !== id;
    //   });
    //   const res = await fetch("http://localhost:3000/cart/" + id, {
    //     method: "DELETE",
    //   });
    //   if (res.error) {
    //     console.log(res.error);
    //   }
    // },

    // async clearCart() {
    //   this.cart = [];
    //   const res = await fetch("http://localhost:3000/cart", {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       cart: [],
    //     }),
    //   });
    //   if (res.error) {
    //     console.log(res.error);
    //   }
    // },

    // CART ACTIONS LOCALSTORAGE

    addToCart(product) {
      this.cart.push(product);
      localStorage.setItem("cart", JSON.stringify(this.cart));
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
  },
});
