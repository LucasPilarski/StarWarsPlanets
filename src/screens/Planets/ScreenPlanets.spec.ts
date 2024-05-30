import { describe, test, expect, beforeEach, beforeAll } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/vue";
import ScreenPlanets from "./ScreenPlanets.vue";
import { createPinia, setActivePinia } from "pinia";
import { usePlanetsStore } from "store/planets.ts";
import { globalMocks } from "tests/globalMocks.ts";
import mockData from "store/mockData.ts";

/*
 * This component is a parent for multiple other components whose sole role is to display data and emit events.
 * Therefore by testing it we can also test the rest of them.
 * */

describe("Screen planets component", () => {
  beforeAll(() => {
    globalMocks();
  });
  beforeEach(async () => {
    setActivePinia(createPinia());
    const store = usePlanetsStore();
    await store.loadPlanets();
  });
  test("Renders properly", () => {
    const { container } = render(ScreenPlanets);
    expect(container.querySelector(".screenPlanets__container")).not.toBeNull();
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
});
