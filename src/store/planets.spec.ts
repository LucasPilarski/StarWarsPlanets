import { beforeEach, describe, expect, test } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { usePlanetsStore } from "store/planets.ts";
import mockData from "store/mockData.ts";

describe("Planets Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.setItem("planets", JSON.stringify(mockData));
    const store = usePlanetsStore();
    store.loadPlanets()
  });

  test("Properly loads planets data from localStorage", () => {
    const store = usePlanetsStore();
    expect(store.planets.length).toBeGreaterThan(0);
  });

  test("Returns the number of planets equal to the table page limit", () => {
    const store = usePlanetsStore();
    expect(store.planets.length).toBe(10)
  })

  test("Returns 20 planets when the limit is set to 20", () => {
    const store = usePlanetsStore();
    store.changeLimit('20')
    expect(store.planets.length).toBe(20)
  })
});
