import { defineStore } from "pinia";
import { ref } from "vue";
import type { SelectOption, TableHeader } from "@/types";

type DictionariesState = {
  tableHeaders: TableHeader[];
  climateOptions: SelectOption[];
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
  });

  const addClimateOption = (climate: string) => {
    dictionariesState.value.climateOptions.push({
      label: climate[0].toUpperCase() + climate.slice(1),
      value: climate,
    });
  };

  return {
    headers: dictionariesState.value.tableHeaders,
    climateOptions: dictionariesState.value.climateOptions,
    addClimateOption,
  };
});
