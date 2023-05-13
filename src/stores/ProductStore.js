import { defineStore } from "pinia";
import { dataURItoFile } from "../utils/dataURItoFile.js";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    cart: [],
    orders: [],
    isLoggedIn: false,
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

    // count getters:

    totalProductsByName() {
      const productsByName = {};

      this.orders.forEach((order) => {
        order.products.forEach((product) => {
          const { name, quantity, unit } = product; // Destructure the "name", "quantity" and "unit" properties from the product object
          if (productsByName[name]) {
            productsByName[name].quantity += quantity;
          } else {
            productsByName[name] = { quantity, unit }; // Include the "unit" property in the object
          }
        });

        console.log(productsByName);
      });

      return productsByName;
    },
  },

  actions: {
    // PRODUCTS ACTIONS

    async getProducts() {
      this.loading = true;
      const res = await fetch("http://localhost:5000/product/");
      const data = await res.json();
      this.products = data;
      this.loading = false;

      console.log(this.products);
    },

    async addProduct(product) {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("unit", product.unit);
      if (product.unit === "kg") {
        formData.append("interval", product.interval);
      }
      formData.append("isDisplayed", product.isDisplayed);
      if (product.image) {
        const file = dataURItoFile(product.image, product.image.name);
        formData.append("image", file);
        console.log(file);
      }

      const res = await fetch("http://localhost:5000/product/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.log("Error:", res.statusText);
      } else {
        const newProduct = await res.json();
        this.products.push(newProduct);
      }
    },

    async editProduct(id, updatedProduct) {
      const productIndex = this.products.findIndex((p) => p._id === id);
      if (productIndex !== -1) {
        const formData = new FormData();
        formData.append("name", updatedProduct.name);
        formData.append("price", updatedProduct.price);
        formData.append("unit", updatedProduct.unit);
        if (updatedProduct.unit === "kg") {
          formData.append("interval", updatedProduct.interval);
        }
        formData.append("isDisplayed", updatedProduct.isDisplayed);
        if (updatedProduct.image) {
          const file = dataURItoFile(
            updatedProduct.image,
            updatedProduct.image.name
          );
          formData.append("image", file);
          console.log("file", file);
        }

        const res = await fetch(`http://localhost:5000/product/${id}`, {
          method: "PATCH",
          body: formData,
        });
        if (!res.ok) {
          console.log("Error:", res.statusText);
        } else {
          const updatedProduct = await res.json();
          this.products[productIndex] = updatedProduct;
          console.log("store update", updatedProduct);
        }
      }
    },

    async deleteProduct(id) {
      this.products = this.products.filter((p) => {
        return p._id !== id;
      });
      const res = await fetch("http://localhost:5000/product/" + id, {
        method: "DELETE",
      });
      if (res.error) {
        console.log(res.error);
      }
    },

    async toggleDisplay(id) {
      const product = this.products.find((p) => p.id === id);
      product.isDisplayed = !product.isDisplayed;

      const res = await fetch("http://localhost:5000/product/" + id, {
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
      const res = await fetch("http://localhost:5000/order");
      const data = await res.json();
      this.orders = data;
      this.loading = false;
    },

    async addOrder(order) {
      this.orders.push(order);
      const res = await fetch("http://localhost:5000/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },

    async changeOrderStatus(id, updatedOrder) {
      const order = this.orders.find((o) => o._id === id);
      console.log(order);
      if (order) {
        const orderIndex = this.orders.indexOf(order);
        this.orders[orderIndex] = {
          ...this.orders[orderIndex],
          ...updatedOrder,
        };

        const res = await fetch("http://localhost:5000/order/" + id, {
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
      const res = await fetch("http://localhost:5000/order", {
        method: "DELETE",
      });
      if (res.error) {
        console.log(res.error);
      }
    },
  },
});
