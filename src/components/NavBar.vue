<template>
  <header>
    <div class="header">
      <img
        class="header__logo"
        :src="image"
        alt=" logo"
        @dblclick="this.$router.push({ name: 'AdminView' })"
        v-doubletap="handleDoubleTap"
      />
      <img class="header__logo" :src="tomatoe" />
      <img class="header__logo" :src="butternut" />
      <img class="header__logo" :src="pumpkin" />
      <div class="header__nav">
        <nav>
          <router-link
            class="header__nav__link"
            v-if="$route.path !== '/admin'"
            :to="{ name: 'AboutView' }"
            >À propos</router-link
          >
          <router-link
            class="header__nav__link"
            v-if="$route.path !== '/admin'"
            :to="{ name: 'ProductsView' }"
            >Produits</router-link
          >
          <router-link
            class="header__nav__link"
            v-if="$route.path === '/admin'"
            :to="{ name: 'AdminView' }"
            >Admin</router-link
          >
        </nav>
        <div class="overlay" v-if="showModal" @click="closeModal"></div>
        <div class="modal" v-if="showModal"><ShopCart /></div>
        <div v-if="$route.path !== '/admin'" class="header__nav__cart">
          <img
            class="header__nav__cart__image"
            @click="openModal"
            :src="basketImage"
            alt=" panier"
          />
          <div class="header__nav__cart__total" v-if="productStore.cartCount">
            {{ productStore.cartCount }}
          </div>
        </div>

        <i
          v-else
          class="fa-solid fa-arrow-right-from-bracket header__nav__logout"
          @click="logout"
        ></i>
      </div>
    </div>
  </header>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import ShopCart from "../components/ShopCart.vue";
import header__logo from "../assets/logo.png";
import tomatoe from "../assets/images/tomatoe.png";
import butternut from "../assets/images/butternut.png";
import pumpkin from "../assets/images/pumpkin.png";
import basket from "../assets/images/basket.png";
import doubletap from "../utils/doubletap.js";

export default {
  components: { ShopCart },

  directives: {
    doubletap,
  },

  setup() {
    const productStore = useProductStore();

    return { productStore };
  },

  data() {
    return {
      showModal: false,
      image: header__logo,
      tomatoe: tomatoe,
      butternut: butternut,
      pumpkin: pumpkin,
      basketImage: basket,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    handleDoubleTap() {
      this.$router.push({ name: "AdminView" });
    },

    logout() {
      sessionStorage.removeItem("token"); // Remove token from session storage
      this.productStore.isLoggedIn = false; // Set isLoggedIn to false
      this.$router.push({ name: "ProductsView" });
    },
  },
};
</script>

<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 20px 40px;
  background-color: white;
  border-bottom: 1px solid #444;

  @include mixin.sm-lt {
    flex-direction: column;
    padding: 20px;
  }

  &__logo {
    height: 160px;
    @include mixin.sm-lt {
      margin-bottom: 20px;
    }
  }

  &__nav {
    display: flex;
    justify-content: center;
    align-items: center;

    @include mixin.sm-lt {
      flex-direction: column;
    }

    &__link {
      font-size: 26px;
      color: var(--text-color);
      text-decoration: none;
      margin-left: 80px;

      @include mixin.sm-lt {
        flex-direction: column;
        font-size: 24px;
        margin: 0px;
        padding: 0 30px;
      }
    }
    &__logout {
      font-size: 26px;
      margin-left: 40px;
      cursor: pointer;
      &:hover {
        color: var(--primary);
      }

      @include mixin.sm-lt {
        flex-direction: column;
        margin: 0px;
        padding: 10px;
      }
    }
  }
}

.router-link-active {
  border-bottom: 2px solid var(--primary);

  @include mixin.sm-lt {
    color: var(--primary);
    border: none;
  }
}

.header__nav__cart {
  position: relative;
  z-index: 1;

  &__image {
    height: 45px;
    cursor: pointer;
    margin-left: 80px;

    @include mixin.sm-lt {
      margin: 0px;
      padding-top: 40px;
    }
  }

  &__total {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: -10px;
    right: -10px;
    background-color: var(--primary);
    color: white;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    cursor: pointer;

    @include mixin.sm-lt {
      top: 25px;
      right: -10px;
    }
  }
}
</style>
