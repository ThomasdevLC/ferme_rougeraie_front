<template>
  <div class="about-wrapper" :style="{ 'background-image': `url(${image})` }">
    ;

    <div class="about-container">
      <div class="about-top">
        <div class="about-text">
          <p class="about-title">Léa Mauguin</p>
          <p class="about-subtitle">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repudiandae vero nemo saepe eligendi distinctio fugiat minus
            doloremque obcaecati eos earum dolor, sit reiciendis ea eum odio
            porro unde a numquam.
          </p>
          <p class="about-introducing">
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
        <div class="about-image">
          <img :src="imageOne" alt="photo léa" />
        </div>
      </div>

      <div class="about-bottom">
        <div class="about-image">
          <img :src="imageTwo" alt="photo léa au marché" />
        </div>

        <div class="about-sellpoint">
          <h2 class="about-sellpoint-title">POINTS DE VENTE</h2>
          <p class="about-sellpoint-infos">
            LANOUEE - place de l'église
            <span class="about-sellpoint-time">
              - mercredi de 14h00 à 18h00</span
            >
          </p>
          <p class="about-sellpoint-infos">
            LANOUEE - ferme de la Rougeraie
            <span class="about-sellpoint-time">
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

    <div class="about-informations">
      <div class="about-informations-top">
        <p class="about-informations-address">Ferme de la Rougeraie</p>
        <!-- <img :src="imageGmap" alt="localisation google" /> -->
      </div>

      <nav class="social-nav">
        <ul class="social-links">
          <!-- <li><img :src="imageLoc" alt="localisation" /></li> -->
          <li><img :src="imageGmap" alt="localisation" /></li>
          <li><img :src="imageInsta" alt="Instagram" /></li>
          <li><img :src="imageFaceb" alt="Facebook" /></li>
          <li><img :src="imageEmail" alt="email" /></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import background from "../assets/images/background.png";
import imageOne from "../assets/images/about-image-one.jpg";
import imageTwo from "../assets/images/about-image-two.jpg";
import imageLoc from "../assets/images/localisation.png";
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
      imageLoc: imageLoc,
      imageInsta: imageInsta,
      imageFaceb: imageFaceb,
      imageEmail: imageEmail,
      imageGmap: imageGmap,
    };
  },
};
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: auto;
  padding: 60px 0;
  overflow: hidden;
}

.about-top {
  display: flex;
  column-gap: 120px;
}

.about-text {
  font-family: "Jacques Francois", serif;
}

.about-title {
  font-size: 60px;
  margin: 0;
}
.about-subtitle {
  font-size: 24px;
}
.about-introducing {
  font-family: "poppins", serif;
  font-size: 16px;
}

.about-image {
  display: flex;
  justify-content: end;
}

.about-image img {
  width: 580px;
  object-fit: cover;
}

.about-bottom {
  display: flex;
  column-gap: 120px;
  margin-top: 120px;
}

.about-sellpoint-title {
  border-bottom: 2px solid orange;
  margin: 0;
}

.about-sellpoint h2 {
  font-size: 28px;
}

.about-sellpoint-infos {
  font-weight: 700;
}
.about-sellpoint-time {
  font-weight: 500;
  font-size: 14px;
}

.about-informations {
  position: fixed;
  top: 380px;
  left: 60px;
}

.about-informations-address {
  color: black;
  font-size: 20px;
  transform: rotate(-90deg);
}

.social-nav {
  margin-top: 120px;
}
.social-links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.social-links li {
  margin-bottom: 20px;
}
.social-links img,
.about-informations img {
  display: block;
  width: 40px;
}

.social-links img:hover {
  cursor: pointer;
}
.footer {
  width: 100%;
  background-color: black;
  height: 100px;
}
</style>
