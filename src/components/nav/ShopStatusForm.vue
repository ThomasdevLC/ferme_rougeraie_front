<template>
  <form class="shopform" @submit.prevent="handleShopStatus">
    <textarea
      class="shopform__input"
      id="message"
      type="text"
      :placeholder="message"
      v-model="messageInput"
    />
    <button class="btn">VALIDER</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useProductStore } from "../../stores/ProductStore";

export default {
  data() {
    return {
      message: "",
      messageInput: "",
    };
  },
  methods: {
    handleShopStatus() {
      if (this.messageInput.length > 0) {
        const productStore = useProductStore();
        productStore.editShopMessage({
          message: this.messageInput,
        });
        this.$emit("submit-shopstatus");
      }
    },
  },
  created() {
    const productStore = useProductStore();
    this.message = productStore.closedShopMessage;
    this.messageInput = productStore.closedShopMessage;
  },
};
</script>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as mixin;

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
    resize: none;

    @include mixin.sm-lt {
      width: 200px;
    }
  }
}
</style>
