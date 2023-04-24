// import { createPinia } from "pinia";
// import { createApp } from "vue";
// import router from "./router/index";

// import App from "./App.vue";
// App.use(router);

// import "./assets/main.css";

// createApp(App).use(createPinia()).mount("#app");

import { createPinia } from "pinia";
import { createApp } from "vue";
import router from "./router/index";

import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
