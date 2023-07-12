<template>
  <div class="closed" :style="{ 'background-image': `url(${image})` }">
    <h1>CLOSED / Pas de produit cette semaine, à bientôt !</h1>
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

<style>
.closed {
  height: 100vh;
}
</style>
