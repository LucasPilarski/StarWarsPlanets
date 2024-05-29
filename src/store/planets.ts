import { defineStore } from "pinia";
import type { Planet, SortDirection, TableHeader } from "@/types";
import { computed, ref } from "vue";

type PlanetsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

type PlanetsState = {
  list: Planet[];
  filteredList: Planet[];
  filters: Record<FilterFields, string>;
  sortColumn: FilterFields | "";
  sortDirection: SortDirection;
  limit: number;
  page: number;
  climates: string[];
  advanceFiltering: boolean;
  tableHeaders: TableHeader[];
};

export type FilterFields =
  | "name"
  | "population_min"
  | "population_max"
  | "rotation_period_min"
  | "rotation_period_max"
  | "climate"
  | "gravity"
  | "created_before"
  | "created_after";

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
      created_before: "",
      created_after: "",
    },
    sortColumn: "",
    sortDirection: "",
    limit: 10,
    page: 1,
    climates: [],
    advanceFiltering: false,
    tableHeaders: [
      { label: "Name", value: "name", canSort: true },
      { label: "Population", value: "population", canSort: true },
      { label: "Rotation period", value: "rotation_period", canSort: true },
      { label: "Climate", value: "climate", canSort: true },
      { label: "Gravity", value: "gravity", canSort: true },
      { label: "Created", value: "created", canSort: false },
      { label: "Url", value: "url", canSort: false },
    ],
  });

  const planets = computed(() => {
    sortPlanets();
    return planetsState.value.filteredList.slice(
      (planetsState.value.page - 1) * planetsState.value.limit,
      planetsState.value.page * planetsState.value.limit,
    );
  });

  const headers = computed(() => {
    return planetsState.value.tableHeaders.map((header) => ({
      ...header,
      sortBy: header.value === planetsState.value.sortColumn,
      sortDirection: planetsState.value.sortDirection,
    }));
  });

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

  const sortPlanets = () => {
    if (planetsState.value.sortColumn !== "") {
      planetsState.value.filteredList.sort((planetA, planetB) => {
        if (planetsState.value.sortDirection === "") {
          return 0;
        }
        const fieldA: string = planetA[planetsState.value.sortColumn];
        const fieldB: string = planetB[planetsState.value.sortColumn];
        if (isNaN(parseInt(fieldA))) {
          if (planetsState.value.sortDirection === "asc") {
            return fieldA > fieldB ? 1 : -1;
          }
          if (planetsState.value.sortDirection === "desc") {
            return fieldA > fieldB ? -1 : 1;
          }
        } else {
          const valueA = parseInt(fieldA);
          const valueB = parseInt(fieldB);
          if (planetsState.value.sortDirection === "asc") {
            return valueA > valueB ? 1 : -1;
          }
          if (planetsState.value.sortDirection === "desc") {
            return valueA > valueB ? -1 : 1;
          }
        }
      });
    }
  };

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

  const changePage = (value: number) => {
    planetsState.value.page = value;
  };

  const updateFilter = (key: FilterFields, value: string) => {
    planetsState.value.filters[key] = value;
    if (key === "name" && !advancedFiltering.value) {
      filterPlanets();
    }
  };

  const clearFilters = () => {
    Object.keys(planetsState.value.filters).forEach((key) => {
      planetsState.value.filters[key as FilterFields] = "";
    });
    filterPlanets();
  };

  const changeLimit = (value: string) => {
    planetsState.value.limit = parseInt(value);
    if (pagination.value.lastPage > 0) {
      changePage(1);
    }
  };

  const changeSorting = (column: FilterFields) => {
    if (planetsState.value.sortColumn === column) {
      planetsState.value.sortDirection =
        planetsState.value.sortDirection === "asc" ? "desc" : "asc";
    } else {
      planetsState.value.sortColumn = column;
      planetsState.value.sortDirection = "asc";
    }
  };

  const filterPlanets = () => {
    const { filters } = planetsState.value;
    const filteredPlanets = planetsState.value.list.filter(
      ({ name, population, climate, rotation_period }) => {
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
        // @TODO How to filter unknown population?
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
        if (
          filters.rotation_period_min !== "" &&
          parseInt(rotation_period) <= parseInt(filters.rotation_period_min)
        ) {
          return false;
        }
        if (
          filters.rotation_period_max !== "" &&
          parseInt(rotation_period) >= parseInt(filters.rotation_period_max)
        ) {
          return false;
        }
        return true;
      },
    );
    changePage(filteredPlanets.length > 0 ? 1 : 0);
    planetsState.value.filteredList = filteredPlanets;
  };

  const toggleAdvancedFilters = () => {
    planetsState.value.advanceFiltering = !planetsState.value.advanceFiltering;
  };

  const advancedFiltering = computed(() => {
    return planetsState.value.advanceFiltering;
  });

  return {
    loadPlanets,
    planets,
    pagination,
    changePage,
    updateFilter,
    filterPlanets,
    clearFilters,
    filters: planetsState.value.filters,
    advancedFiltering,
    climateOptions,
    changeLimit,
    toggleAdvancedFilters,
    tableHeaders: headers,
    changeSorting,
  };
});
