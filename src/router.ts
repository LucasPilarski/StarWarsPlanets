import { createMemoryHistory, createRouter } from "vue-router";
import ScreenPlanets from "./screens/Planets/ScreenPlanets.vue";

const routes = [{ path: "/", name: "planets", component: ScreenPlanets }];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
