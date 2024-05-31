import {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
} from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/vue";
import ScreenPlanets from "screens/Planets/ScreenPlanets.vue";
import { createPinia, setActivePinia } from "pinia";
import { usePlanetsStore } from "store/main.ts";
import { globalMocks } from "tests/globalMocks.ts";
import mockData from "./mockData.ts";

/*
 * Planets screen component is a parent for multiple other components whose sole role is to display data and emit events.
 * Therefore by testing it we can also test the rest of them.
 * */

describe("Planets screen components tree", () => {
  beforeAll(() => {
    globalMocks();
  });

  beforeEach(async () => {
    setActivePinia(createPinia());
    const store = usePlanetsStore();
    store.resetState();
    await store.loadPlanets();
  });

  afterEach(() => {
    cleanup();
  });

  test("Renders planets table properly", () => {
    const store = usePlanetsStore();
    const { container } = render(ScreenPlanets);
    expect(container.querySelectorAll(".planetRow__container")).toHaveLength(
      store.pagination.limit,
    );
  });

  test("Renders next list of planets when proper pagination button is clicked", async () => {
    const { container } = render(ScreenPlanets);
    const firstPlanetName =
      container
        .querySelector(".planetRow__container")
        ?.querySelector(".planetRow__name")?.textContent ?? mockData[0].name;
    fireEvent.click(
      container.querySelector("#pagination__nextPageButton") as Element,
    );
    await waitFor(() => {
      const secondPlanetName =
        container
          .querySelector(".planetRow__container")
          ?.querySelector(".planetRow__name")?.textContent ?? mockData[10].name;
      expect(firstPlanetName).not.toBe(secondPlanetName);
    });
  });

  // Reset state after every test
  test("Renders list of the planets without the planets containing unknown population data", async () => {
    const store = usePlanetsStore();
    store.changeLimit("20");

    const { container } = render(ScreenPlanets);
    const populationFilteringInput = container.querySelectorAll(
      ".commonCheckbox__container",
    )[0];

    await fireEvent.click(populationFilteringInput as Element);

    await waitFor(async () => {
      expect(
        (
          populationFilteringInput.querySelector(
            ".commonCheckbox__input",
          ) as HTMLInputElement
        ).checked,
      ).toBe(true);
      expect(container.querySelectorAll(".planetRow__container")).toHaveLength(
        17,
      );
    });
  });

  test("Renders list of the planets without the planets containing unknown population and rotation period data", async () => {
    const store = usePlanetsStore();
    store.changeLimit("20");

    const { container } = render(ScreenPlanets);

    await fireEvent.click(
      container.querySelectorAll(".commonCheckbox__container")[0] as Element,
    );
    await fireEvent.click(
      container.querySelectorAll(".commonCheckbox__container")[1] as Element,
    );

    await waitFor(async () => {
      expect(
        (
          container
            .querySelectorAll(".commonCheckbox__container")[0]
            .querySelector(".commonCheckbox__input") as HTMLInputElement
        ).checked,
      ).toBe(true);
      expect(
        (
          container
            .querySelectorAll(".commonCheckbox__container")[1]
            .querySelector(".commonCheckbox__input") as HTMLInputElement
        ).checked,
      ).toBe(true);
      expect(
        (
          container
            .querySelectorAll(".commonCheckbox__container")[2]
            .querySelector(".commonCheckbox__input") as HTMLInputElement
        ).checked,
      ).toBe(false);
      expect(container.querySelectorAll(".planetRow__container")).toHaveLength(
        16,
      );
    });
  });

  test("Renders list of the planets without the planets containing unknown population, rotation period and climate data", async () => {
    const store = usePlanetsStore();
    store.changeLimit("20");

    const { container } = render(ScreenPlanets);

    await fireEvent.click(
      container.querySelectorAll(".commonCheckbox__container")[0] as Element,
    );
    await fireEvent.click(
      container.querySelectorAll(".commonCheckbox__container")[1] as Element,
    );
    await fireEvent.click(
      container.querySelectorAll(".commonCheckbox__container")[2] as Element,
    );

    await waitFor(async () => {
      expect(
        (
          container
            .querySelectorAll(".commonCheckbox__container")[0]
            .querySelector(".commonCheckbox__input") as HTMLInputElement
        ).checked,
      ).toBe(true);
      expect(
        (
          container
            .querySelectorAll(".commonCheckbox__container")[1]
            .querySelector(".commonCheckbox__input") as HTMLInputElement
        ).checked,
      ).toBe(true);
      expect(
        (
          container
            .querySelectorAll(".commonCheckbox__container")[2]
            .querySelector(".commonCheckbox__input") as HTMLInputElement
        ).checked,
      ).toBe(true);
      expect(container.querySelectorAll(".planetRow__container")).toHaveLength(
        15,
      );
    });
  });
});
