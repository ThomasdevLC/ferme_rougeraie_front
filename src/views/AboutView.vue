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
      <footer>
        <div class="footer">
          <img class="footer__logo" :src="imageLogo" alt="logo" />
          <p class="footer__text">© Ferme de la Rougeraie - 06 58 75 69 42</p>
          <div class="footer__infos">
            <AboutInformations />
          </div>
          <p class="footer__credits">
            Création :
            <a href="https://www.linkedin.com/in/thomaslecam/">Thomas Le Cam</a>
          </p>
        </div>
      </footer>
    </div>

    <div class="about__informations">
      <AboutInformations />
    </div>
  </div>
</template>

<script>
import AboutInformations from "../components/about/AboutInformations.vue";
import background from "../assets/images/background.png";
import imageOne from "../assets/images/about-image-one.jpg";
import imageTwo from "../assets/images/about-image-two.jpg";
import imageLogo from "../assets/images/logo.png";

export default {
  components: {
    AboutInformations,
  },
  data() {
    return {
      image: background,
      imageOne: imageOne,
      imageTwo: imageTwo,
      imageLogo: imageLogo,
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
    padding: 60px 40px;

    @include mixin.lg-lt {
      padding: 40px 100px;
    }
    @include mixin.sm {
      padding: 20px 60px;
    }
    @include mixin.xs {
      padding: 20px 40px;
    }

    &__top {
      display: flex;
      column-gap: 120px;

      @include mixin.lg-lt {
        flex-direction: column;
        row-gap: 40px;
      }

      &__text {
        &__title {
          font-size: 60px;
          font-family: var(--font-family-titles);
          margin: 0;

          @include mixin.xs {
            font-size: 40px;
          }
        }

        &__subtitle {
          font-size: 24px;
          font-family: var(--font-family-titles);
          @include mixin.xs {
            font-size: 20px;
          }
        }

        &__introducing {
          font-size: 16px;
        }
      }
    }

    &__bottom {
      display: flex;
      column-gap: 120px;
      margin: 100px 0 140px 0;

      @include mixin.lg-lt {
        flex-direction: column-reverse;
        row-gap: 40px;
        margin: 80px 0;
      }

      &__sellpoint {
        &__title {
          font-size: 28px;
          border-bottom: 2px solid var(--primary);
          margin-bottom: 14px;
        }

        &__infos {
          font-weight: 700;
          margin-bottom: 14px;
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
      @include mixin.lg-lt {
        margin: auto;
      }
    }

    &__top__image img,
    &__bottom__image img {
      max-width: 580px;
      object-fit: cover;

      @include mixin.lg-lt {
        max-width: 100%;
      }
    }
  }

  &__informations {
    position: fixed;
    top: 380px;
    left: 60px;
    @include mixin.xxl-lt {
      display: none;
    }
  }
}

footer {
  .footer {
    height: 100px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include mixin.xxl-lt {
      padding: 40px 0;
    }
    @include mixin.lg-lt {
      padding: 60px 0;
    }
    @include mixin.sm-lt {
      padding: 80px 0;
    }
    &__logo {
      height: 130px;
      @include mixin.sm-lt {
        height: 110px;
      }
    }

    &__text {
      @include mixin.sm-lt {
        font-size: 14px;
      }
    }
    &__infos {
      display: none;
      @include mixin.xxl-lt {
        display: block;
      }
    }
    &__credits {
      margin: 0;
      @include mixin.sm-lt {
        font-size: 14px;
      }
    }
  }
}
</style>
