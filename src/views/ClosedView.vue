<template>
  <div class="closed" :style="{ 'background-image': `url(${image})` }"></div>
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
