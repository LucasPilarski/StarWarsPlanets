import { defineStore } from "pinia";
import type { MappedPlanet, Planet, SortDirection, TableHeader } from "@/types";
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
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  limit: number;
  page: number;
  climates: string[];
  advanceFiltering: boolean;
  tableHeaders: TableHeader[];
  // Temporary solution, this should be done using ids
  // @TODO Add ids?
  selectedPlanets: string[];
};

export type SortColumn =
  | ""
  | "name"
  | "population"
  | "rotation_period"
  | "climate"
  | "gravity";

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
    sortDirection: "asc",
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
    selectedPlanets: [],
  });

  const planets = computed<MappedPlanet[]>(() => {
    sortPlanets();
    return planetsState.value.filteredList
      .map((planet) => ({
        ...planet,
        isSelected: planetsState.value.selectedPlanets.includes(planet.name),
      }))
      .slice(
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
        const fieldA: string = planetA[planetsState.value.sortColumn];
        const fieldB: string = planetB[planetsState.value.sortColumn];
        if (isNaN(parseInt(fieldA))) {
          /*
           * There are only two options, asc and desc. If asc is not picked desc is used explicitly, there is no empty option.
           * Empty option means no column has been picked for sorting, so there is no need to use said value.
           * */
          if (planetsState.value.sortDirection === "asc") {
            return fieldA > fieldB ? 1 : -1;
          }
          return fieldA > fieldB ? -1 : 1;
        } else {
          const valueA = parseInt(fieldA);
          const valueB = parseInt(fieldB);
          if (planetsState.value.sortDirection === "asc") {
            return valueA > valueB ? 1 : -1;
          }
          return valueA > valueB ? -1 : 1;
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
    return new Promise((resolve, reject) => {
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
            // @TODO Use better resolve
            resolve(null);
          }
        })
        // @TODO Use better reject
        .catch(() => reject());
    });
  };

  const loadPlanets = async () => {
    if (localStorage.getItem("planets") !== null) {
      const planetsData = JSON.parse(localStorage.getItem("planets") as string);
      planetsData.forEach(handlePlanet);
    } else {
      await fetchPlanets();
    }
  };

  const changePage = (value: number) => {
    planetsState.value.page = value;
    unselectAllPlanets();
  };

  const changeFilter = (key: FilterFields, value: string) => {
    planetsState.value.filters[key] = value;
    if (key === "name" && !advancedFiltering.value) {
      filterPlanets();
      unselectAllPlanets();
    }
  };

  const clearFilters = () => {
    Object.keys(planetsState.value.filters).forEach((key) => {
      planetsState.value.filters[key as FilterFields] = "";
    });
    filterPlanets();
    unselectAllPlanets();
  };

  const changeLimit = (value: string) => {
    planetsState.value.limit = parseInt(value);
    if (pagination.value.lastPage > 0) {
      changePage(1);
      unselectAllPlanets();
    }
  };

  const changeSorting = (column: SortColumn) => {
    if (planetsState.value.sortColumn === column) {
      planetsState.value.sortDirection =
        planetsState.value.sortDirection === "asc" ? "desc" : "asc";
    } else {
      planetsState.value.sortColumn = column;
      planetsState.value.sortDirection = "asc";
    }
    unselectAllPlanets();
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
        if (
          filters.population_min !== "" &&
          parseInt(population) < parseInt(filters.population_min)
        ) {
          return false;
        }
        if (
          filters.population_max !== "" &&
          parseInt(population) > parseInt(filters.population_max)
        ) {
          return false;
        }
        if (
          filters.rotation_period_min !== "" &&
          parseInt(rotation_period) < parseInt(filters.rotation_period_min)
        ) {
          return false;
        }
        if (
          filters.rotation_period_max !== "" &&
          parseInt(rotation_period) > parseInt(filters.rotation_period_max)
        ) {
          return false;
        }
        return true;
      },
    );
    changePage(filteredPlanets.length > 0 ? 1 : 0);
    planetsState.value.filteredList = filteredPlanets;
    unselectAllPlanets();
  };

  const toggleAdvancedFilters = () => {
    planetsState.value.advanceFiltering = !planetsState.value.advanceFiltering;
  };

  const selectPlanet = (name: string) => {
    if (!planetsState.value.selectedPlanets.includes(name)) {
      planetsState.value.selectedPlanets.push(name);
    } else {
      planetsState.value.selectedPlanets =
        planetsState.value.selectedPlanets.filter((planet) => planet !== name);
    }
  };

  const planetsPopulation = computed(() => {
    return planetsState.value.filteredList.reduce((acc, curr) => {
      if (
        planetsState.value.selectedPlanets.includes(curr.name) &&
        !isNaN(parseInt(curr.population))
      ) {
        acc += parseInt(curr.population);
      }
      return acc;
    }, 0);
  });

  const allPlanetsSelected = computed(() => {
    return pagination.value.limit === planetsState.value.selectedPlanets.length;
  });

  const toggleSelectAllPlanets = () => {
    if (!allPlanetsSelected.value) {
      planetsState.value.selectedPlanets = planets.value.map(
        (planet) => planet.name,
      );
    } else {
      unselectAllPlanets();
    }
  };

  const unselectAllPlanets = () => {
    planetsState.value.selectedPlanets = [];
  };

  return {
    planetsState,
    loadPlanets,
    planets,
    pagination,
    changePage,
    changeFilter,
    filterPlanets,
    clearFilters,
    filters: planetsState.value.filters,
    climateOptions,
    changeLimit,
    toggleAdvancedFilters,
    tableHeaders: headers,
    changeSorting,
    selectPlanet,
    planetsPopulation,
    allPlanetsSelected,
    toggleSelectAllPlanets,
  };
});
