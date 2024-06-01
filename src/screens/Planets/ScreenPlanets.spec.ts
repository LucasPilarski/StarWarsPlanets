import {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
} from "vitest";
import { cleanup, render } from "@testing-library/vue";
import ScreenPlanets from "./ScreenPlanets.vue";
import { createPinia, setActivePinia } from "pinia";
import { usePlanetsStore } from "store/main.ts";
import { globalMocks } from "tests/globalMocks.ts";

describe("Screen planets component", () => {
  beforeAll(() => {
    globalMocks();
  });

  beforeEach(async () => {
    setActivePinia(createPinia());
    const store = usePlanetsStore();
    await store.loadPlanets();
  });

  afterEach(() => {
    cleanup();
  });

  test("Renders properly", () => {
    const { container } = render(ScreenPlanets);
    expect(container.querySelector(".screenPlanets__container")).not.toBeNull();
  });
});
