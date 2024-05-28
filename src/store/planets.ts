import { defineStore } from "pinia";
import type { MappedPlanet, Planet } from "@/types";
import { computed, ref } from "vue";

type PlanetsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

type PlanetsState = {
  list: Planet[];
  filteredList: MappedPlanet[];
  filters: Record<FilterFields, string>;
  sort: string;
  limit: number;
  page: number;
  climates: string[];
};

export type FilterFields =
  | "name"
  | "population_min"
  | "population_max"
  | "rotation_period_min"
  | "rotation_period_max"
  | "climate"
  | "gravity";

export const usePlanetsStore = defineStore("planets", () => {
  const planetsState = ref<PlanetsState>({
    list: [],
    filteredList: [],
    filters: {
      name: "",
      population_min: "",
      population_max: "",
      rotation_period_min: "",
      rotation_period_max: "",
      climate: "",
      gravity: "",
    },
    sort: "",
    limit: 10,
    page: 1,
    climates: [],
  });

  const planets = computed(() =>
    planetsState.value.filteredList.slice(
      (planetsState.value.page - 1) * planetsState.value.limit,
      planetsState.value.page * planetsState.value.limit,
    ),
  );

  const pagination = computed(() => ({
    limit: planetsState.value.limit,
    currentPage: planetsState.value.page,
    lastPage: Math.ceil(
      planetsState.value.filteredList.length / planetsState.value.limit,
    ),
  }));

  const climateOptions = computed(() => {
    return [{ label: "All", value: "" }].concat(
      planetsState.value.climates.map((climate: string) => ({
        label: climate[0].toUpperCase() + climate.slice(1),
        value: climate,
      })),
    );
  });

  const handlePlanet = (planet: Planet) => {
    planetsState.value.list.push(planet);
    planetsState.value.filteredList.push(planet);
    planet.climate.split(", ").forEach((climate) => {
      if (!planetsState.value.climates.includes(climate)) {
        planetsState.value.climates.push(climate);
      }
    });
  };

  const fetchPlanets = (url?: string) => {
    fetch(url ?? `https://swapi.dev/api/planets`)
      .then((response) => response.json())
      .then((response: PlanetsApiResponse) => {
        response.results.forEach(handlePlanet);
        if (response.next) {
          fetchPlanets(response.next);
        } else {
          localStorage.setItem(
            "planets",
            JSON.stringify(planetsState.value.list),
          );
        }
      });
  };

  const loadPlanets = () => {
    if (localStorage.getItem("planets") !== null) {
      const planetsData = JSON.parse(localStorage.getItem("planets") as string);
      planetsData.forEach(handlePlanet);
    } else {
      fetchPlanets();
    }
  };

  const showNextPlanets = () => {
    planetsState.value.page++;
  };

  const showPreviousPlanets = () => {
    planetsState.value.page--;
  };

  const changePage = (value: number) => {
    planetsState.value.page = value;
  };

  const updateFilter = (key: FilterFields, value: string) => {
    planetsState.value.filters[key] = value;
  };

  const clearFilters = () => {
    Object.keys(planetsState.value.filters).forEach((key) => {
      planetsState.value.filters[key as FilterFields] = "";
    });
    filterPlanets();
  };

  const changeLimit = (value: string) => {
    planetsState.value.limit = parseInt(value);
    changePage(1);
  };

  const filterPlanets = () => {
    const { filters } = planetsState.value;
    const filteredPlanets = planetsState.value.list.filter(
      ({ name, population, climate }) => {
        if (
          filters.name !== "" &&
          !name.toLowerCase().includes(filters.name.toLowerCase())
        ) {
          return false;
        }
        if (
          filters.climate !== "" &&
          !climate.split(", ").includes(filters.climate)
        ) {
          return false;
        }
        if (
          filters.population_min !== "" &&
          parseInt(population) <= parseInt(filters.population_min)
        ) {
          return false;
        }
        if (
          filters.population_max !== "" &&
          parseInt(population) >= parseInt(filters.population_max)
        ) {
          return false;
        }
        return true;
      },
    );
    changePage(filteredPlanets.length > 0 ? 1 : 0);
    planetsState.value.filteredList = filteredPlanets;
  };

  return {
    loadPlanets,
    planets,
    pagination,
    changePage,
    showPreviousPlanets,
    showNextPlanets,
    updateFilter,
    filterPlanets,
    clearFilters,
    filters: planetsState.value.filters,
    climateOptions,
    changeLimit,
  };
});
