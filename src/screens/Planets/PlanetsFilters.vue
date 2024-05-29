<script setup lang="ts">
import type { PropType } from "vue";
import type { FilterFields } from "store/planets.ts";
import CommonSelect from "components/Input/CommonSelect.vue";
import type { SelectOption } from "@/types";
import CommonText from "components/Input/CommonText.vue";

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
/* @TODO Add gravity filter */
/* @TODO Add created filter? Can that be done easily? */
</script>

<template>
  <div>
    <div class="filters__list">
      <div class="filters__column">
        <CommonText
          :value="filters.name"
          label="Name"
          @keyUp="$emit('updateFilter', 'name', $event.target.value)"
        />
        <CommonSelect
          :label="'Climate'"
          :value="filters.climate"
          :options="climateOptions"
          @option-picked="$emit('updateFilter', 'climate', $event.target.value)"
        />
      </div>
      <div class="filters__column">
        <CommonText
          :value="filters.population_min"
          label="Population min"
          @keyUp="$emit('updateFilter', 'population_min', $event.target.value)"
        />
        <CommonText
          :value="filters.population_max"
          label="Population max"
          @keyUp="$emit('updateFilter', 'population_max', $event.target.value)"
        />
        <CommonText
          :value="filters.rotation_period_min"
          label="Rotation period min"
          @keyUp="
            $emit('updateFilter', 'rotation_period_min', $event.target.value)
          "
        />
        <CommonText
          :value="filters.rotation_period_max"
          label="Rotation period max"
          @keyUp="
            $emit('updateFilter', 'rotation_period_max', $event.target.value)
          "
        />
      </div>
    </div>
    <div class="filters__buttons">
      <button @click="$emit('filterPlanets')">Filter results</button>
      <button @click="$emit('clearFilters')">Clear filters</button>
    </div>
  </div>
</template>

<style scoped>
.filters__column {
  width: 48%;
}

.filters__list {
  display: flex;
  justify-content: space-between;
}

.filters__buttons {
  text-align: right;
  padding: 5px 0 0;
}

.label__container {
  display: flex;
  padding: 5px 0;
  flex-direction: column;
}
</style>
