import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import funcPlugins from "./plugins/func";
import objPlugins from "./plugins/obj";
import person from "./plugins/person";

const app = createApp(App);
app.use(router);
app.mount("#app");
app.use(funcPlugins);
app.use(objPlugins, { name: "coco" });
app.use(person, { name: "coco" });

// console.log("VITE_APP_API_URL", import.meta.env);
// console.log("VITE_APP_API_URL", import.meta.env.VITE_APP_API_URL);
