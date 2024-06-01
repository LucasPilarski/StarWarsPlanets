import { defineStore } from "pinia";
import { ref } from "vue";
import type { FilterFields } from "store/main.ts";
import type {MappedPlanet, UnknownResultsFields} from "@/types";

type FiltersState = {
  filters: Record<FilterFields, string>;
  expandedFiltering: boolean;
  hideUnknownResults: Record<UnknownResultsFields, boolean>;
};

export const useFiltersStore = defineStore("filters", () => {
  const filtersState = ref<FiltersState>({
    filters: {
      name: "",
      population_min: "",
      population_max: "",
      rotation_period_min: "",
      rotation_period_max: "",
      climate: "",
      gravity: "",
      created_before: "",
      created_after: "",
    },
    expandedFiltering: false,
    hideUnknownResults: {
      population: false,
      rotation_period: false,
      climate: false,
    },
  });

  const filterPlanets = (planets: MappedPlanet[], showAll = false) => {
    const { filters } = filtersState.value;
    let atLeastOnePlanetAvailable = showAll;
    const filteredPlanets = planets.map((planet) => {
      const { name, population, climate, rotation_period } = planet;
      planet.isAvailable = true;
      /*
       * Sometimes we want to make all the planets available, so there is no need to check every filter,
       * we just need to toggle one parameter for every planet;
       */
      if (showAll) {
        return planet;
      }
      if (
        filters.name !== "" &&
        !name.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        planet.isAvailable = false;
      }
      if (
        (climate === "unknown" &&
          filtersState.value.hideUnknownResults.climate) ||
        (filters.climate !== "" &&
          !climate.split(", ").includes(filters.climate))
      ) {
        planet.isAvailable = false;
      }
      if (
        (population === "unknown" &&
          filtersState.value.hideUnknownResults.population) ||
        (filters.population_min !== "" &&
          parseInt(population) < parseInt(filters.population_min))
      ) {
        planet.isAvailable = false;
      }
      if (
        (population === "unknown" &&
          filtersState.value.hideUnknownResults.population) ||
        (filters.population_max !== "" &&
          parseInt(population) > parseInt(filters.population_max))
      ) {
        planet.isAvailable = false;
      }
      if (
        (rotation_period === "unknown" &&
          filtersState.value.hideUnknownResults.rotation_period) ||
        (filters.rotation_period_min !== "" &&
          parseInt(rotation_period) < parseInt(filters.rotation_period_min))
      ) {
        planet.isAvailable = false;
      }
      if (
        (rotation_period === "unknown" &&
          filtersState.value.hideUnknownResults.rotation_period) ||
        (filters.rotation_period_max !== "" &&
          parseInt(rotation_period) > parseInt(filters.rotation_period_max))
      ) {
        planet.isAvailable = false;
      }

      if (planet.isAvailable) {
        atLeastOnePlanetAvailable = true;
      }
      return planet;
    });
    return {
      atLeastOnePlanetAvailable,
      filteredPlanets,
    };
  };

  const changeFilter = (key: FilterFields, value: string) => {
    filtersState.value.filters[key] = value;
    return key === "name" && !filtersState.value.expandedFiltering;
  };

  const toggleExpandedFilters = () => {
    filtersState.value.expandedFiltering =
      !filtersState.value.expandedFiltering;

    // In simple mode we want to show everything, even planets with unknown data
    if (!filtersState.value.expandedFiltering) {
      clearHideUnknownResults();
    }
  };

  const clearHideUnknownResults = () => {
    Object.keys(filtersState.value.hideUnknownResults).forEach((key) => {
      filtersState.value.hideUnknownResults[key as UnknownResultsFields] = false;
    });
  };

  const toggleFilteringUnknownResults = (field: UnknownResultsFields) => {
    filtersState.value.hideUnknownResults[field] =
      !filtersState.value.hideUnknownResults[field];
  };

  const clearFilters = () => {
    Object.keys(filtersState.value.filters).forEach((key) => {
      filtersState.value.filters[key as FilterFields] = "";
    });
  };

  return {
    filtersState,
    filterPlanets,
    changeFilter,
    toggleExpandedFilters,
    clearHideUnknownResults,
    toggleFilteringUnknownResults,
    clearFilters,
  };
});
