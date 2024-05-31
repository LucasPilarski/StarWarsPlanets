import { defineStore } from "pinia";
import { ref } from "vue";
import type { Planet, SortDirection } from "@/types";
import type { SortColumn } from "store/main.ts";

type SortingState = {
  sortColumn: SortColumn;
  sortDirection: SortDirection;
};

export const useSortingStore = defineStore("sorting", () => {
  const sortingState = ref<SortingState>({
    sortColumn: "",
    sortDirection: "asc",
  });

  const changeSorting = (column: SortColumn) => {
    if (sortingState.value.sortColumn === column) {
      sortingState.value.sortDirection =
        sortingState.value.sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortingState.value.sortColumn = column;
      sortingState.value.sortDirection = "asc";
    }
  };

  const sortPlanets = (planets: Planet[]) => {
    if (sortingState.value.sortColumn !== "") {
      // Could use Array.toSorted() here but the method is a bit too new for that to be safe
      planets.sort((planetA, planetB) => {
        const fieldA: string = planetA[sortingState.value.sortColumn];
        const fieldB: string = planetB[sortingState.value.sortColumn];
        if (isNaN(parseInt(fieldA))) {
          /*
           * There are only two options, asc and desc. If asc is not picked desc is used explicitly, there is no empty option.
           * Empty option means no column has been picked for sorting, so there is no need to use said value.
           * */
          if (sortingState.value.sortDirection === "asc") {
            return fieldA > fieldB ? 1 : -1;
          }
          return fieldA > fieldB ? -1 : 1;
        } else {
          const valueA = parseInt(fieldA);
          const valueB = parseInt(fieldB);
          if (sortingState.value.sortDirection === "asc") {
            return valueA > valueB ? 1 : -1;
          }
          return valueA > valueB ? -1 : 1;
        }
      });
    }
  };

  return {
    sortingState,
    changeSorting,
    sortPlanets,
  };
});
