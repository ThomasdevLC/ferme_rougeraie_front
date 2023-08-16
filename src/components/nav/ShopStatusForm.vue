<template>
  <form class="shopform" @submit.prevent="handleShopStatus">
    <input
      class="shopform__input"
      id="message"
      type="text"
      placeholder="message"
      v-model="message"
    />
    <button class="btn" @click="emitShopStatus">VALIDER</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useProductStore } from "../../stores/ProductStore";

export default {
  setup() {
    const productStore = useProductStore();
    const message = ref(productStore.closedShopMessage);

    const handleShopStatus = async () => {
      if (message.value.length > 0) {
        await productStore.editShopMessage({
          message: message.value,
        });

        this.emitShopStatus();
      }
    };

    return {
      message,
      handleShopStatus,
    };
  },

  methods: {
    emitShopStatus() {
      this.$emit("submit-shopStatus");
      console.log("emit");
    },
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
