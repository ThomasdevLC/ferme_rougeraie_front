<template>
  <div class="closed" :style="{ 'background-image': `url(${image})` }">
    <p class="closed__text">Pas de produit cette semaine, à bientôt !</p>
  </div>
</template>

<script>
import background from "../assets/images/background.png";

export default {
  data() {
    return { image: background };
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
