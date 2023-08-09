<template>
  <form class="shopform" @submit.prevent="handleSubmit">
    <input
      class="shopform__input"
      id="name"
      type="text"
      placeholder="message"
      v-model="name"
    />
    <button class="btn">VALIDER</button>
  </form>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.shopform {
  display: flex;
  flex-direction: column;

  &__input {
    border: 0;
    width: 400px;
    padding: 14px;
    font-size: 16px;
    color: var(--gray-4);
    border-radius: 2px;
    outline: none;
  }
}
</style>
