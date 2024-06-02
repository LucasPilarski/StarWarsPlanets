import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useMainStore } from "store/main.ts";
import mockData from "tests//mockData.ts";
import { globalMocks } from "tests/globalMocks.ts";
import { cleanup } from "@testing-library/vue";

beforeEach(async () => {
  // Set the data once since it will be used by the entire suite and not changed by it
  localStorage.setItem("planets", JSON.stringify(mockData));
});

describe("Main Store", () => {
  beforeAll(() => {
    globalMocks();
  });

  describe("Using API data", () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });

    afterEach(() => {
      cleanup();
    });

    test("Properly loads planets data from the API", async () => {
      localStorage.removeItem("planets");
      const store = useMainStore();
      await store.loadPlanets();
      expect(store.planets.length).toBeGreaterThan(0);
    });
  });

  describe("Using localStorage data", () => {
    beforeAll(async () => {
      // Set the data once since it will be used by the entire suite and not changed by it
      setActivePinia(createPinia());
      const store = useMainStore();
      await store.loadPlanets();
    });

    afterEach(() => {
      cleanup();
    });

    test("Properly loads planets data from localStorage", () => {
      const store = useMainStore();
      expect(store.planets.length).toBeGreaterThan(0);
    });

    test("Returns the number of planets equal to the table page limit", () => {
      const store = useMainStore();
      expect(store.planets.length).toBe(10);
    });

    test("Returns 20 planets when the limit is set to 20", async () => {
      const store = useMainStore();
      await store.loadPlanets();
      store.changeLimit("25");
      expect(store.planets.length).toBe(25);
    });
  });

  describe("Sorting function", () => {
    beforeEach(async () => {
      setActivePinia(createPinia());
      const store = useMainStore();
      store.resetState();
      await store.loadPlanets();
    });

    afterEach(() => {
      cleanup();
    });

    test("Dont sort planets if no sorting column is picked", () => {
      const store = useMainStore();
      // We will check only first three and last three sorted results, that should be enough to be sure that the sorting works as intended
      expect(store.planets[0].name).toBe("Tatooine");
      expect(store.planets[1].name).toBe("Alderaan");
      expect(store.planets[2].name).toBe("Yavin IV");
      expect(store.planets[7].name).toBe("Naboo");
      expect(store.planets[8].name).toBe("Coruscant");
      expect(store.planets[9].name).toBe("Kamino");
    });

    test("Sort planets by their name in the ascending order", () => {
      const store = useMainStore();
      store.changeSorting({ key: "column", value: "name" });
      // We will check only first three and last three sorted results, that should be enough to be sure that the sorting works as intended
      expect(store.planets[0].name).toBe("Alderaan");
      expect(store.planets[1].name).toBe("Aleen Minor");
      expect(store.planets[2].name).toBe("Bespin");
      expect(store.planets[7].name).toBe("Chandrila");
      expect(store.planets[8].name).toBe("Concord Dawn");
      expect(store.planets[9].name).toBe("Corellia");
    });

    test("Sort planets by their name in the descending order", () => {
      const store = useMainStore();

      // Click two times to switch between sorting direction
      store.changeSorting({ key: "column", value: "name" });
      store.changeSorting({ key: "column", value: "name" });

      // We will check only first three and last three sorted results, that should be enough to be sure that the sorting works as intended
      expect(store.planets[0].name).toBe("unknown");
      expect(store.planets[1].name).toBe("Zolan");
      expect(store.planets[2].name).toBe("Yavin IV");
      expect(store.planets[7].name).toBe("Troiken");
      expect(store.planets[8].name).toBe("Trandosha");
      expect(store.planets[9].name).toBe("Toydaria");
    });

    test("Sort planets by their population in the ascending order", () => {
      const store = useMainStore();

      store.changeSorting({ key: "column", value: "population" });
      // We will check only first two and last two sorted results, that should be enough to be sure that the sorting works as intended
      expect(store.planets[0].name).toBe("Tund");
      expect(store.planets[0].population).toBe("0");
      expect(store.planets[1].name).toBe("Dantooine");
      expect(store.planets[1].population).toBe("1000");
      expect(store.planets[8].name).toBe("Bespin");
      expect(store.planets[8].population).toBe("6000000");
      expect(store.planets[9].name).toBe("Felucia");
      expect(store.planets[9].population).toBe("8500000");
    });

    test("Sort planets by their population in the ascending order", () => {
      const store = useMainStore();

      // Use the function once to set the direction.
      // Use it the second time to reverse it.
      // Use it the third time to get back to the original settings.
      store.changeSorting({ key: "column", value: "population" });
      store.changeSorting({ key: "column", value: "population" });
      store.changeSorting({ key: "column", value: "population" });

      // We will check only first two and last two sorted results, that should be enough to be sure that the sorting works as intended
      expect(store.planets[0].name).toBe("Tund");
      expect(store.planets[0].population).toBe("0");
      expect(store.planets[1].name).toBe("Yavin IV");
      expect(store.planets[1].population).toBe("1000");
      expect(store.planets[8].name).toBe("Bespin");
      expect(store.planets[8].population).toBe("6000000");
      expect(store.planets[9].name).toBe("Felucia");
      expect(store.planets[9].population).toBe("8500000");
    });

    test("Sort planets by their population in the descending order", () => {
      const store = useMainStore();
      // Increase limit, otherwise first 10 planets will all have a population of unknown size
      store.changeLimit("25");

      // Click two times to switch between sorting direction
      store.changeSorting({ key: "column", value: "population" });
      store.changeSorting({ key: "column", value: "population" });

      // We will check only first two and last two sorted results, that should be enough to be sure that the sorting works as intended
      expect(store.planets[0].name).toBe("Umbara");
      expect(store.planets[0].population).toBe("unknown");
      expect(store.planets[1].name).toBe("Shili");
      expect(store.planets[1].population).toBe("unknown");
      expect(store.planets[23].name).toBe("Nal Hutta");
      expect(store.planets[23].population).toBe("7000000000");
      expect(store.planets[24].name).toBe("Muunilinst");
      expect(store.planets[24].population).toBe("5000000000");
    });
  });

  describe("Filtering function", () => {
    beforeEach(async () => {
      setActivePinia(createPinia());
      const store = useMainStore();
      store.resetState();
      await store.loadPlanets();
    });

    afterEach(() => {
      cleanup();
    });

    test("Does not filter planets when no filter is provided", () => {
      const store = useMainStore();

      /*
       * There are 60 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("25");
      store.filterPlanets();

      expect(store.planets.length).equals(25);
    });

    test("Filter planets based on their names when the names filter is provided", () => {
      const store = useMainStore();

      /*
       * There are 60 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("25");
      store.changeFilter({ key: "name", value: "Tat" });
      store.filterPlanets();

      /*
       * There is only one planet with letters "Tat" in its name.
       * */
      expect(store.planets.length).equals(1);
    });

    test("Filter planets based on their climate when the climate filter is provided", () => {
      const store = useMainStore();

      /*
       * There are 60 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("25");
      store.changeFilter({ key: "climate", value: "arid" });
      store.filterPlanets();

      /*
       * There are 9 planets with arid climate in mock data.
       * */
      expect(store.planets.length).equals(9);
    });

    test("Filter planets based on their population when the min population filter is provided", () => {
      const store = useMainStore();

      /*
       * There are 60 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("25");
      store.changeFilter({ key: "population_min", value: "1000000000000" });
      store.filterPlanets();

      /*
       * There are 18 planets with that many people (or unknown value).
       * */
      expect(store.planets.length).equals(18);
    });

    test("Filter planets based on their population when the max population filter is provided", () => {
      const store = useMainStore();

      /*
       * There are 60 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("25");
      store.changeFilter({ key: "population_max", value: "1000" });
      store.filterPlanets();

      /*
       * There are 20 planets with up to 1000 people.
       * */
      expect(store.planets.length).equals(20);
    });

    test("Filter planets based on their rotation period when the minimum rotation period filter is provided", () => {
      const store = useMainStore();

      /*
       * There are 60 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("100");

      store.changeFilter({ key: "rotation_period_min", value: "25" });
      store.filterPlanets();

      /*
       * There are 38 planets with rotation period of 25 or more
       * */
      expect(store.planets.length).equals(38);
    });

    test("Filter planets based on their rotation period when the maximum rotation period filter is provided", () => {
      const store = useMainStore();

      /*
       * There are 60 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("100");
      store.changeFilter({ key: "rotation_period_max", value: "30" });
      store.filterPlanets();

      /*
       * There are 55 planets with rotation period of 30 or less.
       * */
      expect(store.planets.length).equals(55);
    });

    test("Filter planets based on their rotation period when the minimum and maximum rotation period filter is provided and unknown results are ignored", () => {
      const store = useMainStore();

      /*
       * There are 60 planets in mock data and Pinia returns the number of planets equals to the table limit.
       * Therefore we have to first increase the limit and then apply filtering.
       * */
      store.changeLimit("100");
      store.changeFilter({ key: "rotation_period_min", value: "15" });
      store.changeFilter({ key: "rotation_period_max", value: "45" });
      store.toggleFilteringUnknownResults("rotation_period");
      store.filterPlanets();

      /*
       * There are 58 planets with rotation period between 15 and 45, but only 43 if we remove the unknown values.
       * */
      expect(store.planets.length).equals(43);
    });
  });

  describe("Planet population calculation", () => {
    beforeEach(async () => {
      setActivePinia(createPinia());
      const store = useMainStore();
      store.resetState();
      await store.loadPlanets();
    });

    afterEach(() => {
      cleanup();
    });

    test("Returns properly calculated sum of population of selected planets", () => {
      const store = useMainStore();

      store.changeLimit("25");
      store.selectPlanet("1");
      store.selectPlanet("2");
      store.selectPlanet("3");

      expect(store.planetsPopulation).toBe(2000201000);
    });

    test("Returns properly calculated sum of population of selected planets when all planets are selected", () => {
      const store = useMainStore();

      store.changeLimit("25");
      store.toggleSelectAllPlanets();

      expect(store.planetsPopulation).toBe(1711401432500);
    });
  });
});
