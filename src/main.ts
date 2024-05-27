import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router.ts";
import { createPinia } from "pinia";
import {debounce} from "ts-debounce";
import {PiniaDebounce} from "@pinia/plugin-debounce";

const pinia = createPinia();
pinia.use(PiniaDebounce(debounce));

createApp(App).use(router).use(pinia).mount("#app");
