import { defineStore } from "pinia";
import type {
  MappedPlanet,
  MappedTableHeader,
  Planet,
  SelectOption,
  SortDirection,
  TableHeader,
} from "@/types";
import { computed, ref } from "vue";

type PlanetsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

type PlanetsState = {
  list: MappedPlanet[];
  filters: Record<FilterFields, string>;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  limit: number;
  page: number;
  climateOptions: SelectOption[];
  expandedFiltering: boolean;
  hideUnknownResults: Record<string, boolean>;
  tableHeaders: TableHeader[];
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
    climateOptions: [{ label: "All", value: "" }],
    expandedFiltering: false,
    hideUnknownResults: {
      population: false,
      rotation_period: false,
      climate: false,
    },
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

  const planets = computed<MappedPlanet[]>(() => {
    return planetsState.value.list
      .filter((planet) => planet.isAvailable)
      .slice(
        (planetsState.value.page - 1) * planetsState.value.limit,
        planetsState.value.page * planetsState.value.limit,
      );
  });

  const headers = computed<MappedTableHeader[]>(() => {
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
      planetsState.value.list.filter((planet) => planet.isAvailable).length /
        planetsState.value.limit,
    ),
  }));

  const sortPlanets = () => {
    if (planetsState.value.sortColumn !== "") {
      planetsState.value.list.sort((planetA, planetB) => {
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
    planetsState.value.list.push({
      ...planet,
      isSelected: false,
      isAvailable: true,
      id: String(planetsState.value.list.length + 1),
    });
    planet.climate.split(", ").forEach((climate) => {
      if (
        !planetsState.value.climateOptions.find(
          (option) => option.value === climate,
        )
      ) {
        planetsState.value.climateOptions.push({
          label: climate[0].toUpperCase() + climate.slice(1),
          value: climate,
        });
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
    if (key === "name" && !planetsState.value.expandedFiltering) {
      filterPlanets();
      unselectAllPlanets();
    }
  };

  const clearFilters = () => {
    Object.keys(planetsState.value.filters).forEach((key) => {
      planetsState.value.filters[key as FilterFields] = "";
    });
    clearHideUnknownResults();
    unselectAllPlanets();
    filterPlanets(true);
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
    sortPlanets();
    unselectAllPlanets();
  };

  const filterPlanets = (showAll: boolean = false) => {
    const { filters } = planetsState.value;
    let atLeastOnePlanetAvailable = showAll;
    planetsState.value.list = planetsState.value.list.map((planet) => {
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
          planetsState.value.hideUnknownResults.climate) ||
        (filters.climate !== "" &&
          !climate.split(", ").includes(filters.climate))
      ) {
        planet.isAvailable = false;
      }
      if (
        (population === "unknown" &&
          planetsState.value.hideUnknownResults.population) ||
        (filters.population_min !== "" &&
          parseInt(population) < parseInt(filters.population_min))
      ) {
        planet.isAvailable = false;
      }
      if (
        (population === "unknown" &&
          planetsState.value.hideUnknownResults.population) ||
        (filters.population_max !== "" &&
          parseInt(population) > parseInt(filters.population_max))
      ) {
        planet.isAvailable = false;
      }
      if (
        (rotation_period === "unknown" &&
          planetsState.value.hideUnknownResults.rotation_period) ||
        (filters.rotation_period_min !== "" &&
          parseInt(rotation_period) < parseInt(filters.rotation_period_min))
      ) {
        planet.isAvailable = false;
      }
      if (
        (rotation_period === "unknown" &&
          planetsState.value.hideUnknownResults.rotation_period) ||
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
    changePage(atLeastOnePlanetAvailable ? 1 : 0);
    unselectAllPlanets();
  };

  const toggleExpandedFilters = () => {
    planetsState.value.expandedFiltering =
      !planetsState.value.expandedFiltering;

    // In simple mode we want to show everything, even planets with unknown data
    if (!planetsState.value.expandedFiltering) {
      clearHideUnknownResults();
    }
  };

  const clearHideUnknownResults = () => {
    Object.keys(planetsState.value.hideUnknownResults).forEach((key) => {
      planetsState.value.hideUnknownResults[key] = false;
    });
  };

  const selectPlanet = (id: string) => {
    const selectedPlanet = planetsState.value.list.find(
      (planet) => planet.id === id,
    );
    if (selectedPlanet) {
      selectedPlanet.isSelected = !selectedPlanet.isSelected;
    }
  };

  const planetsPopulation = computed(() => {
    return planetsState.value.list.reduce((acc, planet) => {
      if (planet.isSelected && !isNaN(parseInt(planet.population))) {
        acc += parseInt(planet.population);
      }
      return acc;
    }, 0);
  });

  const allPlanetsSelected = computed(() => {
    return (
      planets.value.filter((planet) => planet.isSelected).length ===
      pagination.value.limit
    );
  });

  const toggleSelectAllPlanets = () => {
    /*
     * If at least one of the planet is not selected select them all
     * Otherwise deselect all
     */
    if (!allPlanetsSelected.value) {
      planetsState.value.list = planetsState.value.list.map((planet) => ({
        ...planet,
        isSelected: true,
      }));
    } else {
      unselectAllPlanets();
    }
  };

  const unselectAllPlanets = () => {
    planetsState.value.list = planetsState.value.list.map((planet) => ({
      ...planet,
      isSelected: false,
    }));
  };

  const toggleFilteringUnknownResults = (field: string) => {
    planetsState.value.hideUnknownResults[field] =
      !planetsState.value.hideUnknownResults[field];

    if (!planetsState.value.expandedFiltering) {
      filterPlanets();
    }
  };

  return {
    planetsState,
    tableHeaders: headers,
    planets,
    pagination,
    planetsPopulation,
    allPlanetsSelected,
    loadPlanets,
    changePage,
    changeFilter,
    filterPlanets,
    clearFilters,
    changeLimit,
    toggleExpandedFilters,
    changeSorting,
    selectPlanet,
    toggleSelectAllPlanets,
    toggleFilteringUnknownResults,
  };
});
