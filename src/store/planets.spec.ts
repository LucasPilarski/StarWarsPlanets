import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { usePlanetsStore } from "store/planets.ts";
import mockData from "store/mockData.ts";

global.fetch = vi.fn(() =>
  Promise.resolve({
    data: {
      results: mockData,
      next: null,
    },
    json: () =>
      Promise.resolve({
        results: mockData,
        next: null,
      }),
  }),
);

describe("Planets Store", () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
  });

  describe("Using API data", () => {
    test("Properly loads planets data from the API", async () => {
      const store = usePlanetsStore();
      await store.loadPlanets();
      expect(store.planets.length).toBeGreaterThan(0);
    });

    afterAll(() => {
      // Remove all the data so the other tests will not be affected by it
      localStorage.removeItem("planets");
    });
  });

  describe("Using localStorage data", () => {
    beforeAll(async () => {
      // Set the data once since it will be used by the entire suite and not changed by it
      localStorage.setItem("planets", JSON.stringify(mockData));
      setActivePinia(createPinia());
    });

    beforeEach(async () => {
      const store = usePlanetsStore();
      await store.loadPlanets();
    });

    test("Properly loads planets data from localStorage", async () => {
      const store = usePlanetsStore();
      expect(store.planets.length).toBeGreaterThan(0);
    });

    test("Returns the number of planets equal to the table page limit", async () => {
      const store = usePlanetsStore();
      expect(store.planets.length).toBe(10);
    });

    test("Returns 20 planets when the limit is set to 20", async () => {
      const store = usePlanetsStore();
      await store.loadPlanets();
      store.changeLimit("20");
      expect(store.planets.length).toBe(20);
    });

    describe("Sorting function", () => {
      test("Dont sort planets if no sorting column is picked", async () => {
        const store = usePlanetsStore();
        // We will check only three first and three last sorted results, that should be enough to be sure that the sorting works as intended
        expect(store.planets[0].name).toBe("Tatooine");
        expect(store.planets[1].name).toBe("Alderaan");
        expect(store.planets[2].name).toBe("Yavin IV");
        expect(store.planets[7].name).toBe("Naboo");
        expect(store.planets[8].name).toBe("Coruscant");
        expect(store.planets[9].name).toBe("Kamino");
      });

      test("Sort planets by their name in the descending order", async () => {
        const store = usePlanetsStore();
        store.changeSorting("name");
        // We will check only three first and three last sorted results, that should be enough to be sure that the sorting works as intended
        expect(store.planets[0].name).toBe("Alderaan");
        expect(store.planets[1].name).toBe("Bespin");
        expect(store.planets[2].name).toBe("Cato Neimoidia");
        expect(store.planets[7].name).toBe("Geonosis");
        expect(store.planets[8].name).toBe("Hoth");
        expect(store.planets[9].name).toBe("Kamino");
      });

      test("Sort planets by their name in the ascending order", async () => {
        const store = usePlanetsStore();

        // Click two times to switch between sorting direction
        store.changeSorting("name");
        store.changeSorting("name");

        // We will check only three first and three last sorted results, that should be enough to be sure that the sorting works as intended
        expect(store.planets[0].name).toBe("Yavin IV");
        expect(store.planets[1].name).toBe("Utapau");
        expect(store.planets[2].name).toBe("Tatooine");
        expect(store.planets[7].name).toBe("Mygeeto");
        expect(store.planets[8].name).toBe("Mustafar");
        expect(store.planets[9].name).toBe("Kashyyyk");
      });

      test("Sort planets by their population in the ascending order", async () => {
        const store = usePlanetsStore();

        store.changeSorting("population");
        // We will check only two first and two last sorted results, that should be enough to be sure that the sorting works as intended
        expect(store.planets[0].name).toBe("Yavin IV");
        expect(store.planets[0].population).toBe("1000");
        expect(store.planets[1].name).toBe("Mustafar");
        expect(store.planets[1].population).toBe("20000");
        expect(store.planets[8].name).toBe("Endor");
        expect(store.planets[8].population).toBe("30000000");
        expect(store.planets[9].name).toBe("Kashyyyk");
        expect(store.planets[9].population).toBe("45000000");
      });

      test("Sort planets by their population in the descending order", async () => {
        const store = usePlanetsStore();

        // Click two times to switch between sorting direction
        store.changeSorting("population");
        store.changeSorting("population");
        // We will check only two first and two last sorted results, that should be enough to be sure that the sorting works as intended
        expect(store.planets[0].name).toBe("Hoth");
        expect(store.planets[0].population).toBe("unknown");
        expect(store.planets[1].name).toBe("Dagobah");
        expect(store.planets[1].population).toBe("unknown");
        expect(store.planets[8].name).toBe("Kamino");
        expect(store.planets[8].population).toBe("1000000000");
        expect(store.planets[9].name).toBe("Utapau");
        expect(store.planets[9].population).toBe("95000000");
      });
    });
    describe.skip("Filtering function", () => {});
  });
});
