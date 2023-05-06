<template>
  <header>
    <div class="header br">
      <img
        class="header__logo"
        :src="image"
        alt=" logo"
        @dblclick="this.$router.push({ name: 'AdminView' })"
        v-doubletap="handleDoubleTap"
      />
      <div class="header__nav">
        <nav>
          <router-link class="header__nav__link" :to="{ name: 'AboutView' }"
            >À propos</router-link
          >
          <router-link class="header__nav__link" :to="{ name: 'ProductsView' }"
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
      </div>
    </div>
  </header>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import ShopCart from "../components/ShopCart.vue";
import header__logo from "../assets/logo.png";
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
    height: 140px;
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
      color: #444;
      text-decoration: none;
      margin-left: 80px;

      @include mixin.sm-lt {
        flex-direction: column;
        font-size: 24px;
        margin: 0px;
        padding: 0 30px;
      }
    }
  }
}

.router-link-active {
  border-bottom: 2px solid var(--primary);
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
