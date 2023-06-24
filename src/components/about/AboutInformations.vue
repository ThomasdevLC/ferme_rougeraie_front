<template>
  <p class="about__informations__address">Ferme de la Rougeraie</p>
  <div class="about__informations__medias">
    <nav class="about__informations__medias__nav">
      <ul class="about__informations__medias__nav__links">
        <li>
          <a
            href="https://www.google.com/maps/place/Ferme+de+la+Rougeraie/@47.9659359,-2.5786985,17z/data=!4m14!1m7!3m6!1s0x480fd17bd0d61589:0x327caef9255f9739!2sFerme+de+la+Rougeraie!8m2!3d47.9659323!4d-2.5761236!16s%2Fg%2F11nwwr5hmv!3m5!1s0x480fd17bd0d61589:0x327caef9255f9739!8m2!3d47.9659323!4d-2.5761236!16s%2Fg%2F11nwwr5hmv?authuser=0"
          >
            <img :src="imageGmap" alt="localisation" />
          </a>
        </li>
        <li><img :src="imageInsta" alt="Instagram" /></li>
        <li>
          <a
            href="https://www.facebook.com/people/Ferme-de-La-Rougeraie/100077586669860/"
          >
            <img :src="imageFaceb" alt="Facebook" />
          </a>
        </li>
        <li>
          <a href="fermedelarougeraie@gmail.com">
            <img :src="imageEmail" alt="email" />
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import imageGmap from "../../assets/images/loc.png";
import imageInsta from "../../assets/images/instagram.png";
import imageFaceb from "../../assets/images/facebook.png";
import imageEmail from "../../assets/images/email.png";

export default {
  data() {
    return {
      imageInsta: imageInsta,
      imageFaceb: imageFaceb,
      imageEmail: imageEmail,
      imageGmap: imageGmap,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/mixins" as mixin;

.about__informations__address {
  color: black;
  font-size: 20px;
  transform: rotate(-90deg);

  @include mixin.xxl-lt {
    display: none;
  }
}

.about__informations__medias__nav {
  margin-top: 120px;
  @include mixin.xxl-lt {
    margin-top: 0px;
  }

  &__links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    @include mixin.xxl-lt {
      flex-direction: row;
      justify-content: space-around;
      gap: 20px;
    }

    & li {
      margin-bottom: 20px;
      @include mixin.xxl-lt {
        margin: 0px;
        padding-bottom: 10px;
      }

      & img {
        display: block;
        width: 40px;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
