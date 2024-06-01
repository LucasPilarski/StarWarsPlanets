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

  describe("Pagination components", () => {
    beforeEach(async () => {
      setActivePinia(createPinia());
      const store = usePlanetsStore();
      store.resetState();
      await store.loadPlanets();
    });

    afterEach(() => {
      cleanup();
    });

    test("Renders next list of planets when next page pagination button is clicked", async () => {
      const { container } = render(ScreenPlanets);
      const firstPlanetName =
        container
          .querySelector(".planetRow__container")
          ?.querySelector(".planetRow__name")?.textContent ?? mockData[0].name;

      // Next page button
      await fireEvent.click(
        container
          .querySelector(".pagination__container")
          ?.querySelectorAll(".commonButton__container")[2] as Element,
      );
      await waitFor(() => {
        const secondPlanetName =
          container
            .querySelector(".planetRow__container")
            ?.querySelector(".planetRow__name")?.textContent ??
          mockData[10].name;
        expect(firstPlanetName).not.toBe(secondPlanetName);
      });
    });

    test("Renders first list of planets when next page and then previous page pagination buttons are clicked", async () => {
      const { container } = render(ScreenPlanets);
      const firstPlanetNameBefore =
        container
          .querySelector(".planetRow__container")
          ?.querySelector(".planetRow__name")?.textContent ?? mockData[0].name;

      // Next page button
      await fireEvent.click(
        container
          .querySelector(".pagination__container")
          ?.querySelectorAll(".commonButton__container")[2] as Element,
      );

      // Previous page button
      await fireEvent.click(
        container
          .querySelector(".pagination__container")
          ?.querySelectorAll(".commonButton__container")[1] as Element,
      );
      await waitFor(() => {
        const firstPlanetNameAfter =
          container
            .querySelector(".planetRow__container")
            ?.querySelector(".planetRow__name")?.textContent ??
          mockData[0].name;
        expect(firstPlanetNameBefore).toBe(firstPlanetNameAfter);
      });
    });
  });

  describe("Filtering components", () => {
    beforeEach(async () => {
      setActivePinia(createPinia());
      const store = usePlanetsStore();
      store.resetState();
      await store.loadPlanets();
    });

    afterEach(() => {
      cleanup();
    });

    test("Renders list of the planets without the planets containing unknown population data", async () => {
      const { container } = render(ScreenPlanets);

      await fireEvent.change(
        container.querySelector(
          ".screenPlanets__limit .text__input",
        ) as Element,
        { target: { value: 100 } },
      );
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
        expect(
          container.querySelectorAll(".planetRow__container"),
        ).toHaveLength(43);
      });
    });

    test("Renders list of the planets without the planets containing unknown population and rotation period data", async () => {
      const { container } = render(ScreenPlanets);

      await fireEvent.change(
        container.querySelector(
          ".screenPlanets__limit .text__input",
        ) as Element,
        { target: { value: 100 } },
      );

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
        expect(
          container.querySelectorAll(".planetRow__container"),
        ).toHaveLength(42);
      });
    });

    test("Renders list of the planets without the planets containing unknown population, rotation period and climate data", async () => {
      const { container } = render(ScreenPlanets);

      await fireEvent.change(
        container.querySelector(
          ".screenPlanets__limit .text__input",
        ) as Element,
        { target: { value: 100 } },
      );

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
        expect(
          container.querySelectorAll(".planetRow__container"),
        ).toHaveLength(41);
      });
    });

    test("Renders list of planets which names contains letter T", async () => {
      const { container } = render(ScreenPlanets);
      await fireEvent.change(
        container.querySelector(
          ".screenPlanets__limit .text__input",
        ) as Element,
        { target: { value: 100 } },
      );

      await fireEvent.keyUp(
        container.querySelectorAll(".text__container")[0]
          .children[1] as Element,
        { target: { value: "T" } },
      );

      await waitFor(async () => {
        expect(
          (
            container.querySelectorAll(".text__container")[0]
              .children[1] as HTMLInputElement
          ).value,
        ).toBe("T");
        expect(
          container.querySelectorAll(".planetRow__container"),
        ).toHaveLength(24);
      });
    });

    test("Renders the message that there are no planets to display when filtering removed them all from the list", async () => {
      const { container } = render(ScreenPlanets);

      await fireEvent.keyUp(
        container.querySelectorAll(".text__container")[0]
          .children[1] as Element,
        { target: { value: "Earth" } },
      );

      await waitFor(async () => {
        expect(
          (
            container.querySelectorAll(".text__container")[0]
              .children[1] as HTMLInputElement
          ).value,
        ).toBe("Earth");
        expect(container.querySelector(".planetsTable__noPlanets")).not.toBe(
          null,
        );
      });
    });
  });

  describe("Sorting components", () => {
    beforeEach(async () => {
      setActivePinia(createPinia());
      const store = usePlanetsStore();
      store.resetState();
      await store.loadPlanets();
    });

    afterEach(() => {
      cleanup();
    });

    test("Sorts the planets by name in the ascending order", async () => {
      const { container } = render(ScreenPlanets);

      await fireEvent.click(
        // First header is for selecting all the planet, the second one is for sorting by name
        container.querySelectorAll(".planetHeader__container")[1] as Element,
      );

      await waitFor(async () => {
        const planetsNames = container.querySelectorAll(".planetRow__name");
        expect(planetsNames[0].textContent).toBe("Tund");
        expect(planetsNames[9].textContent).toBe("Felucia");
      });
    });
  });

  describe("Selecting components", () => {
    beforeEach(async () => {
      setActivePinia(createPinia());
      const store = usePlanetsStore();
      store.resetState();
      await store.loadPlanets();
    });

    afterEach(() => {
      cleanup();
    });

    test("Calculate the number of population for selected planets", async () => {
      const { container } = render(ScreenPlanets);

      const planetSelectCell = container.querySelectorAll(".planetRow__select");
      await fireEvent.click(
        planetSelectCell[0].querySelector(
          ".commonCheckbox__container",
        ) as Element,
      );
      await fireEvent.click(
        planetSelectCell[1].querySelector(
          ".commonCheckbox__container",
        ) as Element,
      );
      await fireEvent.click(
        planetSelectCell[2].querySelector(
          ".commonCheckbox__container",
        ) as Element,
      );

      await waitFor(async () => {
        const planetsPopulation = container.querySelector(
          ".planetsLimit__population",
        ) as Element;
        expect((planetsPopulation.textContent as string).trim()).toBe(
          "Selected planets population is 2000201000",
        );
      });
    });
  });
});
