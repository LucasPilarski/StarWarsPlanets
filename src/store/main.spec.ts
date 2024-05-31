import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { usePlanetsStore } from "store/main.ts";
import mockData from "tests//mockData.ts";
import { globalMocks } from "tests/globalMocks.ts";

beforeEach(async () => {
  // Set the data once since it will be used by the entire suite and not changed by it
  localStorage.setItem("planets", JSON.stringify(mockData));
});

describe("Planets Store", () => {
  beforeAll(() => {
    globalMocks();
  });

  describe("Using API data", () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });

    test("Properly loads planets data from the API", async () => {
      localStorage.removeItem("planets");
      const store = usePlanetsStore();
      await store.loadPlanets();
      expect(store.planets.length).toBeGreaterThan(0);
    });
  });

  describe("Using localStorage data", () => {
    beforeAll(async () => {
      // Set the data once since it will be used by the entire suite and not changed by it
      setActivePinia(createPinia());
      const store = usePlanetsStore();
      await store.loadPlanets();
    });

    test("Properly loads planets data from localStorage", () => {
      const store = usePlanetsStore();
      expect(store.planets.length).toBeGreaterThan(0);
    });

    test("Returns the number of planets equal to the table page limit", () => {
      const store = usePlanetsStore();
      expect(store.planets.length).toBe(10);
    });

    test("Returns 20 planets when the limit is set to 20", async () => {
      const store = usePlanetsStore();
      await store.loadPlanets();
      store.changeLimit("20");
      expect(store.planets.length).toBe(20);
    });
  });

  describe("Sorting function", () => {
    beforeEach(async () => {
      setActivePinia(createPinia());
      const store = usePlanetsStore();
      store.resetState();
      await store.loadPlanets();
    });

    test("Dont sort planets if no sorting column is picked", () => {
      const store = usePlanetsStore();
      // We will check only three first and three last sorted results, that should be enough to be sure that the sorting works as intended
      expect(store.planets[0].name).toBe("Tatooine");
      expect(store.planets[1].name).toBe("Alderaan");
      expect(store.planets[2].name).toBe("Yavin IV");
      expect(store.planets[7].name).toBe("Naboo");
      expect(store.planets[8].name).toBe("Coruscant");
      expect(store.planets[9].name).toBe("Kamino");
    });

    test("Sort planets by their name in the descending order", () => {
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

    test("Sort planets by their name in the ascending order", () => {
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

    test("Sort planets by their population in the ascending order", () => {
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

    test("Sort planets by their population in the descending order", () => {
      const store = usePlanetsStore();

      // Click two times to switch between sorting direction
      store.changeSorting("population");
      store.changeSorting("population");
      // We will check only two first and two last sorted results, that should be enough to be sure that the sorting works as intended
      expect(store.planets[0].name).toBe("Stewjon");
      expect(store.planets[0].population).toBe("unknown");
      expect(store.planets[1].name).toBe("Dagobah");
      expect(store.planets[1].population).toBe("unknown");
      expect(store.planets[8].name).toBe("Kamino");
      expect(store.planets[8].population).toBe("1000000000");
      expect(store.planets[9].name).toBe("Utapau");
      expect(store.planets[9].population).toBe("95000000");
    });
  });

  describe("Filtering function", () => {
    beforeEach(async () => {
      setActivePinia(createPinia());
      const store = usePlanetsStore();
      store.resetState();
      await store.loadPlanets();
    });

    test("Does not filter planets when no filter is provided", () => {
      const store = usePlanetsStore();

      /*
       * There 20 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("20");
      store.filterPlanets();

      expect(store.planets.length).equals(mockData.length);
    });

    test("Filter planets based on their names when the names filter is provided", () => {
      const store = usePlanetsStore();

      /*
       * There 20 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("20");
      store.changeFilter("name", "Tat");
      store.filterPlanets();

      /*
       * There is only one planet with letters "Tat" in its name.
       * */
      expect(store.planets.length).equals(1);
    });

    test("Filter planets based on their climate when the climate filter is provided", () => {
      const store = usePlanetsStore();

      /*
       * There 20 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("20");
      store.changeFilter("climate", "arid");
      store.filterPlanets();

      /*
       * There are three planets with arid climate in mock data.
       * */
      expect(store.planets.length).equals(3);
    });

    test("Filter planets based on their population when the min population filter is provided", () => {
      const store = usePlanetsStore();

      /*
       * There 20 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("20");
      store.changeFilter("population_min", "1000000000000");
      store.filterPlanets();

      /*
       * There are four planets with that many people (or unknown value).
       * */
      expect(store.planets.length).equals(4);
    });

    test("Filter planets based on their population when the max population filter is provided", () => {
      const store = usePlanetsStore();

      /*
       * There 20 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("20");
      store.changeFilter("population_max", "1000");
      store.filterPlanets();

      /*
       * There are four planets with up to 1000 people.
       * */
      expect(store.planets.length).equals(4);
    });
  });

  describe("Planet population calculation", () => {
    beforeEach(async () => {
      setActivePinia(createPinia());
      const store = usePlanetsStore();
      store.resetState();
      await store.loadPlanets();
    });

    test("Returns properly calculated sum of population of selected planets", () => {
      const store = usePlanetsStore();

      store.changeLimit("20");
      store.selectPlanet("1");
      store.selectPlanet("2");
      store.selectPlanet("3");

      expect(store.planetsPopulation).toBe(2000201000);
    });

    test("Returns properly calculated sum of population of selected planets when all planets are selected", () => {
      const store = usePlanetsStore();

      store.changeLimit("20");
      store.toggleSelectAllPlanets();

      expect(store.planetsPopulation).toBe(1109114721000);
    });
  });
});
