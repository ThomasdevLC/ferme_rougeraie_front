<template>
  <div class="container">
    <div class="vegie veg-1"><img class="header__logo" :src="tomatoe" /></div>
    <div class="vegie veg-2">
      <img class="header__logo" :src="butternut" />
    </div>
    <div class="vegie veg-3"><img class="header__logo" :src="pumpkin" /></div>
    <div class="vegie veg-4"><img class="header__logo" :src="turnip" /></div>
    <div class="vegie veg-5"><img class="header__logo" :src="carrot" /></div>
    <div class="vegie veg-6">
      <img class="header__logo" :src="butternut" />
    </div>
    <div class="vegie veg-7"><img class="header__logo" :src="pumpkin" /></div>
    <div class="vegie veg-8"><img class="header__logo" :src="tomatoe" /></div>
    <div class="vegie veg-9"><img class="header__logo" :src="turnip" /></div>
    <div class="vegie veg-10">
      <img class="header__logo" :src="carrot" />
    </div>
    <div class="text"><img class="text" :src="text" /></div>
  </div>
</template>

<script>
import tomatoe from "../assets/images/tomatoe.png";
import butternut from "../assets/images/butternut.png";
import pumpkin from "../assets/images/pumpkin.png";
import turnip from "../assets/images/turnip.png";
import carrot from "../assets/images/carrot.png";
import radish from "../assets/images/radish.png";
import text from "../assets/images/text.svg";
export default {
  data() {
    return {
      tomatoe: tomatoe,
      butternut: butternut,
      pumpkin: pumpkin,
      turnip: turnip,
      carrot: carrot,
      radish: radish,
      text: text,
    };
  },

  mounted() {
    setTimeout(() => {
      this.$router.push({ name: "AboutView" });
    }, 5000);
  },
};
</script>
<style scoped>
.header__logo {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-30px) translateX(-10px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}

.container {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-auto-columns: 1fr;
  gap: 6px 6px;
  /* grid-auto-flow: row; */
  grid-template-areas:
    "veg-1 veg-2 veg-3 veg-4"
    "veg-5 text text veg-6"
    "veg-7 veg-8 veg-9 veg-10";
}

.veg-1 {
  grid-area: veg-1;
}

.veg-2 {
  grid-area: veg-2;
}

.veg-3 {
  grid-area: veg-3;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1) rotate(6deg);
}

.veg-4 {
  grid-area: veg-4;
  transform: rotate(4deg);
  height: 200px;
}

.veg-5 {
  grid-area: veg-5;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.veg-6 {
  grid-area: veg-6;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.veg-7 {
  grid-area: veg-7;
}

.veg-8 {
  grid-area: veg-8;
  height: 250px;
  transform: rotate(20deg);
}

.veg-9 {
  grid-area: veg-9;
}

.veg-10 {
  grid-area: veg-10;

  height: 280px;
}

.text {
  grid-area: text;
  height: 400px;
  margin: auto;
}

.vegie {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
