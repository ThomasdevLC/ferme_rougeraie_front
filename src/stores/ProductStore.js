import { defineStore } from "pinia";
import { dataURItoFile } from "../utils/dataURItoFile.js";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    cart: [],
    orders: [],
    closedShop: false,
    closedShopMessage: "",
    isLoggedIn: false,
    accessToken: null,
    loading: false,
  }),

  getters: {
    // products getters:

    displayed() {
      return this.products.filter((p) => p.isDisplayed);
    },

    displayedCount() {
      return this.displayed.length;
    },

    totalCount() {
      return this.products.length;
    },

    // cart getters:

    cartCount() {
      return this.cart.length;
    },

    totalCart() {
      const total = this.cart.reduce((total, product) => {
        const productTotalInCents = Math.round(product.price * product.quantity);

        return total + productTotalInCents;
      }, 0);

      return total;
    },

    limitedProducts() {
      return this.cart.some((product) => product.limited === true);
    },

    pickupDay() {
      if (this.orders.length > 0) {
        const lastOrder = this.orders[this.orders.length - 1];
        return lastOrder.pickup;
      }
      return null;
    },

    currentDay() {
      const today = new Date();
      return today.toLocaleDateString("fr-FR", { weekday: "long" });
    },

    currentHour() {
      const today = new Date();
      return today.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
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
      });

      return productsByName;
    },
  },

  actions: {
    // PRODUCTS ACTIONS

    async getProducts() {
      this.loading = true;
      const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/product/`);
      const data = await res.json();
      this.products = data;
      this.loading = false;
    },

    async addProduct(product) {
      console.log(product);
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
        console.log(" product.image.name", product.image.name);
      }

      const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/product/`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        method: "POST",
        body: formData,
      });

      if (res.error) {
        console.log(res.error);
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
          const file = dataURItoFile(updatedProduct.image, updatedProduct.name);
          formData.append("image", file);
          console.log("file", file);
          console.log("updatedProduct.image.name", updatedProduct.image.name);
        }

        const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/product/` + id, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          method: "PATCH",
          body: formData,
        });
        if (res.error) {
          console.log(res.error);
        } else {
          const updatedProduct = await res.json();
          this.products[productIndex] = updatedProduct;
        }
      }
    },

    async deleteProduct(id) {
      this.products = this.products.filter((p) => {
        return p._id !== id;
      });
      const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/product/` + id, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        method: "DELETE",
      });
      if (res.error) {
        console.log(res.error);
      }
    },

    async toggleDisplay(id) {
      const product = this.products.find((p) => p._id === id);
      product.isDisplayed = !product.isDisplayed;

      const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/product/` + id + "/display", {
        method: "PATCH",
        body: JSON.stringify({ isDisplayed: product.isDisplayed }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      if (res.error) {
        console.log(res.error);
      }
    },

    async toggleLimited(id) {
      const product = this.products.find((p) => p._id === id);
      product.limited = !product.limited;

      const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/product/` + id + "/limited", {
        method: "PATCH",
        body: JSON.stringify({ limited: product.limited }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      if (res.error) {
        console.log(res.error);
      }
      const data = await res.json();
    },

    // CART ACTIONS LOCALSTORAGE

    addToCart(product) {
      this.cart.push(product);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("cartTimestamp", new Date().getTime().toString());

      console.log("cart", this.cart);
    },

    async editCart(id, updatedProduct) {
      const index = this.cart.findIndex((p) => p.id === id);
      if (index >= 0) {
        const product = { ...this.cart[index], ...updatedProduct };
        this.cart.splice(index, 1, product);
        localStorage.setItem("cart", JSON.stringify(this.cart)); // Update localStorage cart
        console.log("cart", this.cart);
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

    checkCart() {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        try {
          this.cart = JSON.parse(cartData);

          const currentTime = new Date().getTime();
          const cartTimestamp = localStorage.getItem("cartTimestamp");

          if (cartTimestamp) {
            const storedTimestamp = parseInt(cartTimestamp, 10);
            const timeDifference = currentTime - storedTimestamp;

            if (timeDifference >= 48 * 60 * 60 * 1000) {
              this.clearCart();
            }
          }
        } catch (error) {
          console.error("No cart data:", error);
        }
      }
    },

    // ORDERS ACTIONS

    async getOrders() {
      this.loading = true;
      const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/order`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      const data = await res.json();
      this.orders = data;
      this.loading = false;
    },

    async addOrder(order) {
      this.orders.push(order);
      const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/order`, {
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

        const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/order/` + id, {
          method: "PATCH",
          body: JSON.stringify(updatedOrder),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        if (res.error) {
          console.log(res.error);
        }
      }
    },

    async clearOrders() {
      const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/order`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });

      if (res.error) {
        console.log(res.error);
      } else {
        this.orders = this.pendingOrders;
      }
    },

    // SHOP STATUS ACTIONS

    async updateClosedShop(value) {
      try {
        console.log(value, "update shop");
        const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/closedShop`, {
          method: "PATCH",
          body: JSON.stringify({ closedShop: value }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        if (res.error) {
          console.log(res.error);
        } else {
          await this.getClosedShop(); // Récupérer la valeur mise à jour après la mise à jour réussie
        }
      } catch (error) {
        console.log("Error while updating closedShop:", error);
      }
    },

    async getClosedShop() {
      try {
        const response = await fetch(`http://${import.meta.env.VITE_BACK_API}/closedShop`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          this.closedShop = data.closedShop;
        } else {
          console.log("Failed to get closedShop:", data.error);
        }
      } catch (error) {
        console.log("Error while fetching closedShop:", error);
      }
    },

    async editShopMessage(message) {
      console.log(message, "message");

      const requestData = {
        message: message.message,
      };

      console.log(requestData, "requestData");

      try {
        const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/closedShop/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify(requestData),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.log(errorData.error);
        } else {
          const data = await res.json();
          this.closedShopMessage = data.message;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getShopMessage() {
      const res = await fetch(`http://${import.meta.env.VITE_BACK_API}/closedShop/message`);
      const data = await res.json();
      this.closedShopMessage = data.message;
      console.log("store message", this.closedShopMessage);
    },
  },
});
