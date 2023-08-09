<template>
  <form class="shopform" @submit.prevent="handleShopStatus">
    <input
      class="shopform__input"
      id="message"
      type="text"
      placeholder="message"
      v-model="message"
    />
    <button class="btn">VALIDER</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useProductStore } from "../../stores/ProductStore";

export default {
  setup() {
    const productStore = useProductStore();
    const message = ref("");

    const handleShopStatus = () => {
      if (message.value.length > 0) {
        productStore.editShopMessage({
          message: message.value,
        });

        console.log(message.value);
      }
    };

    return {
      message,
      handleShopStatus,
    };
  },
};
</script>

<style scoped lang="scss">
.shopform {
  display: flex;
  flex-direction: column;

  &__input {
    margin: auto;
    border: 0;
    width: 400px;
    padding: 20px;
    font-size: 16px;
    color: var(--gray-4);
    border-radius: 2px;
    outline: none;
  }
}
</style>
