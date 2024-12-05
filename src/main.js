import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import funcPlugins from "./plugins/func";
// import objPlugins from "./plugins/obj";
// import person from "./plugins/person";
import globalComponents from "./plugins/global-components";
import globalDirectives from "./plugins/global-directives";
import dayjs from "./plugins/dayjs";

const app = createApp(App);
app.use(router);
// app.use(funcPlugins);
// app.use(objPlugins, { name: "coco" });
// app.use(person, { name: "coco" });
app.use(globalComponents);
app.use(globalDirectives);
app.use(dayjs);
app.mount("#app");

// console.log("VITE_APP_API_URL", import.meta.env);
// console.log("VITE_APP_API_URL", import.meta.env.VITE_APP_API_URL);
