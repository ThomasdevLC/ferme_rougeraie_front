<template>
  <header :class="$route.path == '/products' ? '' : 'header-absolute'">
    <div
      :class="
        navSize && $route.path == '/products' ? 'header active' : 'header'
      "
      :style="{ 'background-image': `url(${header})` }"
    >
      <img
        :class="
          navSize && $route.path == '/products' ? 'active-logo' : 'header__logo'
        "
        :src="image"
        alt=" logo"
        @dblclick="this.$router.push({ name: 'AdminView' })"
        v-doubletap="handleDoubleTap"
      />

      <div class="header__nav">
        <div class="header__nav__closed" v-if="productStore.isLoggedIn">
          <div
            class="overlay"
            v-if="showShopModal"
            @click="closeShopModal"
          ></div>
          <div class="modal" v-if="showShopModal">
            <ShopStatusForm @submit-shopstatus="closeShopModal" />
          </div>
          <div class="header__nav__closed__box">
            <i
              v-if="!productStore.closedShop"
              class="fa-solid fa-store"
              style="color: var(--primary)"
              @click="
                productStore.updateClosedShop(!productStore.closedShop);
                openShopModal();
              "
            ></i>
            <i
              v-else
              class="fa-solid fa-store-slash"
              @click="productStore.updateClosedShop(!productStore.closedShop)"
            ></i>
          </div>
        </div>
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
            :class="{
              'router-link-active': $route.path === '/closed',
            }"
            >Produits</router-link
          >
          <router-link
            class="header__nav__link admin-link"
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
import ShopStatusForm from "../components/nav/ShopStatusForm.vue";
import header__logo from "../assets/images/logo.png";
import basket from "../assets/images/basket.png";
import header from "../assets/images/header.png";
import doubletap from "../utils/doubletap.js";

import { ref, onMounted } from "vue";
export default {
  components: { ShopCart, ShopStatusForm },

  directives: {
    doubletap,
  },

  setup() {
    const productStore = useProductStore();
    const navSize = ref(false);

    const changeNav = () => {
      if (window.innerWidth > 1210) {
        if (window.scrollY >= 200) {
          navSize.value = true;
        } else {
          navSize.value = false;
        }
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", changeNav);
    });
    return { productStore, changeNav, navSize };
  },

  data() {
    return {
      showModal: false,
      showShopModal: false,
      image: header__logo,
      header: header,
      basketImage: basket,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
      console.log(this.showModal);
    },
    closeModal() {
      this.showModal = false;
    },
    openShopModal() {
      this.showShopModal = true;
      console.log(this.showShopModal);
    },
    closeShopModal() {
      this.showShopModal = false;
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

header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  margin-bottom: 60px;
}

.header-absolute {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  margin-bottom: 60px;
}

.header {
  display: flex;
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
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @include mixin.sm-lt {
      flex-direction: column;
    }

    &__closed {
      border: 1px solid var(--gray-2);
      background-color: white;
      border-radius: 50%;

      &__box {
        padding: 13px;
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        & i {
          font-size: 27px;
          cursor: pointer;
        }
      }
    }

    &__link {
      font-size: 26px;
      font-weight: 500;
      color: black;
      text-decoration: none;
      margin-left: 80px;
      &:hover {
        color: var(--text-color);
      }

      @include mixin.sm-lt {
        flex-direction: column;
        font-size: 24px;
        margin: 0px;
        padding: 0 30px;
      }
    }
    &__logout {
      font-size: 26px;
      display: flex;
      margin-left: 40px;
      cursor: pointer;
      &:hover {
        color: var(--primary);
      }

      @include mixin.sm-lt {
        flex-direction: column;
        margin: 0px;
        padding-top: 40px;
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
  &__image {
    height: 45px;
    margin-left: 80px;
    cursor: pointer;

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
    top: -6px;
    right: -14px;
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

.admin-link {
  margin-left: 40px;
  @include mixin.sm-lt {
    display: none;
  }
}
.admin-nav {
  @include mixin.sm-lt {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}

.active {
  height: 40px;
  padding: 30px;
  transition: all 0.4s ease;
}

.active-logo {
  height: 80px;
}
</style>
