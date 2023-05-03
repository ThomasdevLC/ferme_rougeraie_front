<template>
  <div
    class="background-image"
    :style="{ 'background-image': `url(${image})` }"
  ></div>
</template>

<script>
import background from "../assets/images/background.png";

export default {
  data() {
    return { image: background };
  },
};
</script>

<style scoped>
.background-image {
  height: 100vh;
}
</style>
