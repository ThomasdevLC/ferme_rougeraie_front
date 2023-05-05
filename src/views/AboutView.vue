<template>
  <div class="about" :style="{ 'background-image': `url(${image})` }">
    ;

    <div class="about__container">
      <div class="about__container__top">
        <div class="about__container__top__text">
          <p class="about__container__top__text__title">Léa Mauguin</p>
          <p class="about__container__top__text__subtitle">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repudiandae vero nemo saepe eligendi distinctio fugiat minus
            doloremque obcaecati eos earum dolor, sit reiciendis ea eum odio
            porro unde a numquam.
          </p>
          <p class="about__container__top__text__introducing">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
            illo soluta corrupti ducimus, veniam modi debitis nostrum,
            architecto quod maxime labore aut recusandae, ea consectetur iste
            odio libero pariatur vel quo distinctio quis. Ullam quidem minima
            pariatur cupiditate cumque autem totam nemo! Similique ea
            consequuntur fuga ipsam praesentium ad alias adipisci autem, neque
            suscipit harum velit facere qui, sequi quae nisi quia quod!
            Molestias, aperiam beatae, a vero voluptatem natus sed assumenda
            omnis cum odio voluptas culpa aut dolor nesciunt nisi dolorum
            repellat voluptatibus? Amet unde ullam perspiciatis architecto,
            labore voluptate autem atque repudiandae reprehenderit dolorum
            mollitia impedit pariatur, dignissimos veniam minima dolores rerum.
            Nobis assumenda magni obcaecati, non, sequi ratione quasi, vero
            similique culpa modi suscipit tempore at et.
          </p>
        </div>
        <div class="about__container__top__image">
          <img :src="imageOne" alt="photo léa" />
        </div>
      </div>

      <div class="about__container__bottom">
        <div class="about__container__bottom__image">
          <img :src="imageTwo" alt="photo léa au marché" />
        </div>

        <div class="about__container__bottom__sellpoint">
          <h2 class="about__container__bottom__sellpoint__title">
            POINTS DE VENTE
          </h2>
          <p class="about__container__bottom__sellpoint__infos">
            LANOUEE - place de l'église
            <span class="about__container__bottom__sellpoint__time">
              - mercredi de 14h00 à 18h00</span
            >
          </p>
          <p class="about__container__bottom__sellpoint__infos">
            LANOUEE - ferme de la Rougeraie
            <span class="about__container__bottom__sellpoint__time">
              - mercredi de 14h00 à 18h00</span
            >
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
            illo soluta corrupti ducimus, veniam modi debitis nostrum,
            architecto quod maxime labore aut recusandae, ea consectetur iste
            odio libero pariatur vel quo distinctio quis. Ullam quidem minima
            pariatur
          </p>
        </div>
      </div>
    </div>

    <div class="footer">Thomas Le Cam</div>

    <div class="about__informations">
      <p class="about__informations__address">Ferme de la Rougeraie</p>
      <div class="about__informations__medias">
        <nav class="about__informations__medias__nav">
          <ul class="about__informations__medias__nav__links">
            <li>
              <a
                href="https://www.google.com/maps/place/Ferme+de+la+Rougeraie/@47.9659359,-2.5786985,17z/data=!4m14!1m7!3m6!1s0x480fd17bd0d61589:0x327caef9255f9739!2sFerme+de+la+Rougeraie!8m2!3d47.9659323!4d-2.5761236!16s%2Fg%2F11nwwr5hmv!3m5!1s0x480fd17bd0d61589:0x327caef9255f9739!8m2!3d47.9659323!4d-2.5761236!16s%2Fg%2F11nwwr5hmv?authuser=0"
                ><img :src="imageGmap" alt="localisation"
              /></a>
            </li>
            <li><img :src="imageInsta" alt="Instagram" /></li>
            <li>
              <a
                href="https://www.facebook.com/people/Ferme-de-La-Rougeraie/100077586669860/"
              >
                <img :src="imageFaceb" alt="Facebook"
              /></a>
            </li>

            <li>
              <a href="fermedelarougeraie@gmail.com">
                <img :src="imageEmail" alt="email" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import background from "../assets/images/background.png";
import imageOne from "../assets/images/about-image-one.jpg";
import imageTwo from "../assets/images/about-image-two.jpg";
import imageInsta from "../assets/images/instagram.png";
import imageFaceb from "../assets/images/facebook.png";
import imageEmail from "../assets/images/email.png";
import imageGmap from "../assets/images/loc.png";

export default {
  data() {
    return {
      image: background,
      imageOne: imageOne,
      imageTwo: imageTwo,
      imageInsta: imageInsta,
      imageFaceb: imageFaceb,
      imageEmail: imageEmail,
      imageGmap: imageGmap,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/mixins" as mixin;

.about {
  &__container {
    max-width: 1200px;
    margin: auto;
    padding: 60px 0;
    // overflow: hidden;

    &__top {
      display: flex;
      column-gap: 120px;

      &__text {
        font-family: "Jacques Francois", serif;

        &__title {
          font-size: 60px;
          margin: 0;
        }

        &__subtitle {
          font-size: 24px;
        }

        &__introducing {
          font-family: "poppins", serif;
          font-size: 16px;
        }
      }
    }

    &__bottom {
      display: flex;
      column-gap: 120px;
      margin-top: 120px;

      &__sellpoint {
        &__title {
          font-size: 28px;
          border-bottom: 2px solid orange;
          margin: 0;
        }

        &__infos {
          font-weight: 700;
        }

        &__time {
          font-weight: 500;
          font-size: 14px;
        }
      }
    }

    &__top__image,
    &__bottom__image {
      display: flex;
      justify-content: end;
    }

    &__top__image img,
    &__bottom__image img {
      width: 580px;
      object-fit: cover;
    }
  }

  &__informations {
    position: fixed;
    top: 380px;
    left: 60px;

    &__address {
      color: black;
      font-size: 20px;
      transform: rotate(-90deg);
    }

    &__medias__nav {
      margin-top: 120px;

      &__links {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      & img {
        display: block;
        width: 40px;
      }

      &__links li {
        margin-bottom: 20px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}

.footer {
  width: 100%;
  background-color: black;
  height: 100px;
  @include mixin.md-lt {
    width: 90px;
  }
}
</style>
