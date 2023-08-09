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
  async mounted() {
    const productStore = useProductStore();
    await productStore.getClosedShop(); // Fetch closed shop data
    this.closedShopMessage = productStore.closedShopMessage;
  },
};
</script>

<style scoped lang="scss">
.closed {
  height: 100vh;

  &__text {
    margin: 0;
    font-size: 40px;
    font-weight: 500;
    text-align: center;
    padding-top: 200px;
  }
}
</style>
