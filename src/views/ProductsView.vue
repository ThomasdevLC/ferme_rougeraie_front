<template>
  <div class="background-image">
    <div class="card-container">
      <ProductCard />
    </div>
  </div>
</template>

<script>
import background from "../assets/images/background.png";
import ProductCard from "../components/ProductCard.vue";

export default {
  components: { ProductCard },

  data() {
    return { image: background };
  },
};
</script>

<style>
.background-image {
  background-image: url("../assets/images/background.png");
  background-repeat: repeat-y;
  background-size: 100% 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}
</style>
