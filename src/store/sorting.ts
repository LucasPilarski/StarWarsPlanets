import { defineStore } from "pinia";
import { ref } from "vue";
import type { Planet, SortColumn, SortDirection, SortParams } from "@/types";

type SortingState = SortParams;

export const useSortingStore = defineStore("sorting", () => {
  const sortingState = ref<SortingState>({
    sortColumn: "",
    sortDirection: "asc",
  });

  const changeSorting = ({
    key,
    value,
  }: {
    key: "column" | "direction";
    value: SortColumn | SortDirection;
  }) => {
    // For direct manipulation of sorting column
    if (key === "column") {
      if (sortingState.value.sortColumn === value) {
        sortingState.value.sortDirection =
          sortingState.value.sortDirection === "asc" ? "desc" : "asc";
      } else {
        sortingState.value.sortColumn = value as SortColumn;
        sortingState.value.sortDirection = "asc";
      }
    }
    /*
     * For direct manipulation of sorting direction
     * Otherwise it will be changed alongside column
     * */
    if (key === "direction") {
      sortingState.value.sortDirection = value as SortDirection;
    }
  };

  const sortPlanets = (planets: Planet[]) => {
    if (sortingState.value.sortColumn !== "") {
      // Could use Array.toSorted() here but the method is a bit too new for that to be safe
      planets.sort((planetA, planetB) => {
        const fieldA =
          planetA[sortingState.value.sortColumn as Exclude<SortColumn, "">];
        const fieldB =
          planetB[sortingState.value.sortColumn as Exclude<SortColumn, "">];
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
