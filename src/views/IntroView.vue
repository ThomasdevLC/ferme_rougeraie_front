<template>
  <div>
    <!-- Contenu de la page d'introduction -->
    <h1>hello</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: "AboutView" });
    }, 4000);
  },
};
</script>
