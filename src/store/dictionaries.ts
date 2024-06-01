import { defineStore } from "pinia";
import { ref } from "vue";
import type { SelectOption, TableHeader } from "@/types";

export type DictionariesState = {
  tableHeaders: TableHeader[];
  climateOptions: SelectOption[];
  sortColumns: SelectOption[];
  sortDirections: SelectOption[];
};

export const useDictionariesStore = defineStore("dictionaries", () => {
  const dictionariesState = ref<DictionariesState>({
    tableHeaders: [
      { label: "Name", value: "name", canSort: true },
      { label: "Population", value: "population", canSort: true },
      { label: "Rotation period", value: "rotation_period", canSort: true },
      { label: "Climate", value: "climate", canSort: true },
      { label: "Gravity", value: "gravity", canSort: true },
      { label: "Created", value: "created", canSort: false },
      { label: "Url", value: "url", canSort: false },
    ],
    climateOptions: [{ label: "All", value: "" }],
    sortColumns: [
      { label: "Name", value: "name" },
      { label: "Population", value: "population" },
      { label: "Rotation period", value: "rotation_period" },
      { label: "Climate", value: "climate" },
      { label: "Gravity", value: "gravity" },
    ],
    sortDirections: [
      { label: "Ascend", value: "asc" },
      { label: "Descend", value: "desc" },
    ],
  });

  const addClimateOption = (climate: string) => {
    dictionariesState.value.climateOptions.push({
      label: climate[0].toUpperCase() + climate.slice(1),
      value: climate,
    });
  };

  return {
    dictionaries: dictionariesState,
    addClimateOption,
  };
});
