<script setup lang="ts">
import type { PropType } from "vue";
import type { FilterFields } from "store/planets.ts";
import CommonSelect from "components/Input/CommonSelect.vue";
import type { SelectOption } from "@/types";

defineEmits(["filterPlanets", "clearFilters", "updateFilter"]);
defineProps({
  filters: {
    type: Object as PropType<Record<FilterFields, string>>,
    required: true,
    default: {},
  },
  climateOptions: {
    type: Array as PropType<SelectOption[]>,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div>
    <div>
      <label class="label__container">
        Name
        <input
          :value="filters.name"
          type="text"
          @keyup="$emit('updateFilter', 'name', $event.target.value)"
        />
      </label>
      <label class="label__container">
        Climate
        <CommonSelect
          :value="filters.climate"
          :options="climateOptions"
          @option-picked="$emit('updateFilter', 'climate', $event.target.value)"
        />
      </label>
      <label class="label__container">
        Population min
        <input
          :value="filters.population_min"
          type="text"
          @keyup="$emit('updateFilter', 'population_min', $event.target.value)"
        />
      </label>
      <label class="label__container">
        Population max
        <input
          :value="filters.population_max"
          type="text"
          @keyup="$emit('updateFilter', 'population_max', $event.target.value)"
        />
      </label>
    </div>
    <div>
      <button @click="$emit('filterPlanets')">Filter results</button>
      <button @click="$emit('clearFilters')">Clear filters</button>
    </div>
  </div>
</template>

<style scoped>
.label__container {
  display: flex;
  padding: 5px 0;
}
</style>
