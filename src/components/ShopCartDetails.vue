<template>
  <div class="product-infos">
    <div class="image"><img :src="product.image" alt="photo produit" /></div>
    <h4>{{ product.name }}</h4>
    <p>
      {{ product.price }} € / <span> {{ product.unit }}</span>
    </p>
    <p>Qté {{ product.quantity }}</p>
  </div>
</template>

<script>
export default {
  props: ["product"],
};
</script>

<style>
.product-infos {
  display: flex;
  align-items: center;
  width: 420px;
  align-items: center;
}

.image img {
  width: 55px;
  height: 55px;
  border-radius: 6px;
  object-fit: cover;
}
</style>
