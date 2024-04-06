<template>
  <div class="about" :style="{ 'background-image': `url(${image})` }">
    ;

    <div class="about__container">
      <div class="about__container__top">
        <div class="about__container__top__text">
          <p class="about__container__top__text__title">Ferme de la Rougeraie</p>
          <p class="about__container__top__text__introducing">
            Notre ferme familiale possède deux activités de production : un atelier d'une trentaine de vaches laitières en circuit long (lait livré à Biolait)
            et un atelier de maraîchage diversifié en circuit court avec vente à la ferme. La surface est d'environ 45 Ha, toute en prairies permanentes et
            entourées de haies anciennes ou plantées par nos soins. En effet, la préservation et l'amélioration de la biodiversité font partie de nos
            préoccupations. L'ensemble de la surface est certifiée en agriculture biologique depuis 2008.
          </p>

          <p class="about__container__top__text__introducing">
            Nous cultivons des légumes diversifiés et de saison, la majorité étant en plein champ mais une partie est cultivée sous serre, principalement pour
            les légumes fruits d'été et les légumes feuilles d'hiver et de printemps. Tous les légumes sont cultivés en pleine terre, ce qui permet une
            meilleure qualité gustative.
          </p>

          <p class="about__container__top__text__introducing">
            Nous vous proposons ces légumes toute l'année, sauf entre mi-février et mi-avril où nous arrêtons les ventes pour préparer la nouvelle saison. Les
            congés occasionnels sont annoncés à l'avance. Le magasin se trouve dans le bâtiment de la ferme.
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
          <h2 class="about__container__bottom__sellpoint__title">POINTS DE VENTE</h2>
          <p class="about__container__bottom__sellpoint__infos">
            LANOUEE - place de l'église
            <span class="about__container__bottom__sellpoint__time"> - mardi et vendredi de 16h00 à 19h00</span>
          </p>

          <p>
            Les ventes ont lieu les mardis et vendredis de 16H à 19H. <br />
            La liste des légumes disponibles avec leur prix est mise à jour chaque début de semaine. Vous avez jusqu'à 21h la veille du jour de vente pour
            passer une pré-commande. Le montant est indicatif et peut légèrement être ajusté à la réalité du poids des légumes. Le règlement se fait à la
            réception, les jours de vente où il est possible de modifier ou de compléter sa commande. Venir avec son panier.
          </p>
          <p>
            Nos légumes sont également servis à la cantine scolaire de Lanouée, dans les plats du restaurant « Chez Simon » à Josselin ainsi que sur les pizzas
            de Mowgli Pizz' à Lanouée, chaque vendredi.
          </p>
        </div>
      </div>
      <footer>
        <div class="footer">
          <img class="footer__logo" :src="imageLogo" alt="logo" />
          <p class="footer__text">© Ferme de la Rougeraie - 06 83 34 13 70</p>
          <div class="footer__infos">
            <AboutInformations />
          </div>
          <div class="footer__credits">
            <p>
              Réalisation :
              <a href="https://www.linkedin.com/in/thomaslecam/">Thomas Le Cam</a>
            </p>
            <p>Illustrations : Matthieu Le Meur</p>
          </div>
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
  @include mixin.sm-lt {
    padding-top: 300px;
  }

  &__container {
    max-width: 1200px;
    margin: auto;
    padding: 260px 40px 60px 40px;

    @include mixin.lg-lt {
      padding: 240px 100px 40px 100px;
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
          font-size: 44px;
          font-family: var(--font-family-titles);
          margin: 0;

          @include mixin.xs {
            font-size: 40px;
          }
        }

        // &__subtitle {
        //   font-family: var(--font-family-titles);
        //   font-size: 24px;
        //   @include mixin.xs {
        //     font-size: 20px;
        //   }
        // }

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
    line-height: 1;

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
      margin-top: 15px;

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
      display: flex;
      gap: 20px;
      margin: 0;
      @include mixin.sm-lt {
        flex-direction: column;
        gap: 0px;
        font-size: 14px;
        line-height: 0;
      }
    }
  }
}
</style>
