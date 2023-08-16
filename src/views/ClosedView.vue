<template>
  <div class="closed" :style="{ 'background-image': `url(${image})` }">
    <p class="closed__text" v-if="closedShopMessage">
      {{ closedShopMessage }}
    </p>
  </div>
</template>

<script>
import background from "../assets/images/background.png";
import { useProductStore } from "../stores/ProductStore";

export default {
  data() {
    return {
      image: background,
      closedShopMessage: null,
    };
  },
  mounted() {
    const productStore = useProductStore();
    productStore.getClosedShop();
    this.closedShopMessage = productStore.closedShopMessage;
  },
};
</script>

<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;

.closed {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  &__text {
    margin: 0;
    font-size: 40px;
    font-weight: 500;
    text-align: center;
    @include mixin.sm-lt {
      font-size: 20px;
      padding: 40px;
    }
  }
}
</style>
