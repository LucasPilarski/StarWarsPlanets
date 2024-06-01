import { defineStore } from "pinia";
import type {
  FilterFields,
  MappedPlanet,
  MappedTableHeader,
  Pagination,
  Planet,
  SortColumn,
  UnknownResultsFields,
} from "@/types";
import { computed, ref } from "vue";
import { useDictionariesStore } from "store/dictionaries.ts";
import { useFiltersStore } from "store/filters.ts";
import { useSortingStore } from "store/sorting.ts";

type PlanetsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

type MainState = {
  list: MappedPlanet[];
  limit: number;
  page: number;
};

export const useMainStore = defineStore("main", () => {
  const dictionariesStore = useDictionariesStore();
  const filtersStore = useFiltersStore();
  const sortingStore = useSortingStore();

  const mainState = ref<MainState>({
    list: [],
    limit: 10,
    page: 1,
  });

  const resetState = () => {
    mainState.value.list = [];
    mainState.value.limit = 10;
    mainState.value.page = 1;
  };

  const planets = computed<MappedPlanet[]>(() => {
    return mainState.value.list
      .filter((planet) => planet.isAvailable)
      .slice(
        (mainState.value.page - 1) * mainState.value.limit,
        mainState.value.page * mainState.value.limit,
      );
  });

  const headers = computed<MappedTableHeader[]>(() => {
    return dictionariesStore.dictionaries.tableHeaders.map((header) => ({
      ...header,
      sortBy: header.value === sortingStore.sortingState.sortColumn,
      sortDirection: sortingStore.sortingState.sortDirection,
    }));
  });

  const pagination = computed<Pagination>(() => ({
    limit: mainState.value.limit,
    currentPage: mainState.value.page,
    lastPage: Math.ceil(
      mainState.value.list.filter((planet) => planet.isAvailable).length /
        mainState.value.limit,
    ),
  }));

  const handlePlanet = (planet: Planet) => {
    mainState.value.list.push({
      ...planet,
      isSelected: false,
      isAvailable: true,
      id: String(mainState.value.list.length + 1),
    });
    planet.climate.split(", ").forEach((climate) => {
      if (
        !dictionariesStore.dictionaries.climateOptions.find(
          (option) => option.value === climate,
        )
      ) {
        dictionariesStore.addClimateOption(climate);
      }
    });
  };

  const fetchPlanets = (
    url: string | null = null,
  ): Promise<PlanetsApiResponse> => {
    return new Promise((resolve, reject) => {
      fetch(url ?? `https://swapi.dev/api/planets`)
        .then((response) => response.json())
        .then((response: PlanetsApiResponse) => {
          resolve(response);
        })
        .catch(() =>
          reject({
            results: [],
            next: null,
            prev: null,
            count: 0,
          }),
        );
    });
  };

  const loadPlanets = async (nextUrl: string | null = null) => {
    if (localStorage.getItem("planets") !== null) {
      const planetsData = JSON.parse(localStorage.getItem("planets") as string);
      planetsData.forEach(handlePlanet);
    } else {
      const response = await fetchPlanets(nextUrl);
      response.results.forEach(handlePlanet);
      if (response.next !== null) {
        await loadPlanets(response.next);
      } else {
        localStorage.setItem("planets", JSON.stringify(mainState.value.list));
      }
    }
  };

  const changePage = (value: number) => {
    mainState.value.page = value;
    unselectAllPlanets();
  };

  const changeFilter = (key: FilterFields, value: string) => {
    const shouldFilterPlanets = filtersStore.changeFilter(key, value);
    if (shouldFilterPlanets) {
      filterPlanets();
      unselectAllPlanets();
    }
  };

  const clearFilters = () => {
    filtersStore.clearFilters();
    clearHideUnknownResults();
    unselectAllPlanets();
    filterPlanets(true);
  };

  const changeLimit = (value: string) => {
    mainState.value.limit = parseInt(value);
    if (pagination.value.lastPage > 0) {
      changePage(1);
      unselectAllPlanets();
    }
  };

  const changeSorting = (key: "column" | "direction", value: SortColumn) => {
    sortingStore.changeSorting(key, value);
    sortingStore.sortPlanets(mainState.value.list);
    unselectAllPlanets();
  };

  const filterPlanets = (showAll: boolean = false) => {
    const { filteredPlanets, atLeastOnePlanetAvailable } =
      filtersStore.filterPlanets(mainState.value.list, showAll);
    mainState.value.list = filteredPlanets;
    changePage(atLeastOnePlanetAvailable ? 1 : 0);
    unselectAllPlanets();
  };

  const selectPlanet = (id: string) => {
    const selectedPlanet = mainState.value.list.find(
      (planet) => planet.id === id,
    );
    if (selectedPlanet) {
      selectedPlanet.isSelected = !selectedPlanet.isSelected;
    }
  };

  const planetsPopulation = computed(() => {
    return mainState.value.list.reduce((acc, planet) => {
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
      mainState.value.list = mainState.value.list.map((planet) => ({
        ...planet,
        isSelected: true,
      }));
    } else {
      unselectAllPlanets();
    }
  };

  const unselectAllPlanets = () => {
    mainState.value.list = mainState.value.list.map((planet) => ({
      ...planet,
      isSelected: false,
    }));
  };

  const toggleFilteringUnknownResults = (field: UnknownResultsFields) => {
    filtersStore.toggleFilteringUnknownResults(field);
    if (!filtersStore.filtersState.expandedFiltering) {
      filterPlanets();
    }
  };

  const toggleExpandedFilters = () => {
    filtersStore.toggleExpandedFilters();
  };

  const clearHideUnknownResults = () => {
    filtersStore.clearHideUnknownResults();
  };

  return {
    dictionaries: dictionariesStore.dictionaries,
    tableHeaders: headers,
    planets,
    pagination,
    planetsPopulation,
    allPlanetsSelected,
    filtersState: filtersStore.filtersState,
    sortingState: sortingStore.sortingState,
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
    resetState,
  };
});
