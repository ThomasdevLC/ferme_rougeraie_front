<template>
  <div class="orders__pickup">
    <i
      class="fa-regular fa-calendar"
      :class="{
        'orders__pickup__day--selected': dayFilter.includes('mardi') && dayFilter.includes('vendredi'),
      }"
      @click="setDayFilter(['mardi', 'vendredi'])"
    ></i>
    <p class="orders__pickup__day" :class="{ 'orders__pickup__day--selected': dayFilter.includes('mardi') }" @click="setDayFilter(['mardi'])">Mardi</p>

    <p class="orders__pickup__day" :class="{ 'orders__pickup__day--selected': dayFilter.includes('vendredi') }" @click="setDayFilter(['vendredi'])">Vendredi</p>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props, { emit }) {
    const dayFilter = ref(["mardi", "vendredi"]);

    const setDayFilter = (newFilter) => {
      dayFilter.value = newFilter;
      emit("update:dayFilter", dayFilter.value);
    };

    return { dayFilter, setDayFilter };
  },
};
</script>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as mixin;

.orders__pickup {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 35px;

  @include mixin.xs {
    justify-content: space-around;
  }

  &__day {
    font-size: 20px;
    font-weight: 700;
    color: var(--gray-5);
    &:hover {
      cursor: pointer;
      color: var(--light-primary);
    }
  }

  &__day--selected {
    color: var(--primary);
  }
  & i {
    font-size: 24px;
    padding: 0px;
    cursor: pointer;
    &:hover {
      color: var(--primary);
    }
  }
}
</style>
