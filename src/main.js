import { createPinia } from "pinia";
import { createApp } from "vue";
import router from "./router/index";

import App from "./App.vue";

import "./assets/main.css";
import "./assets/styles/index.scss";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
