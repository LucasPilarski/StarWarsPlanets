<script setup lang="ts">
import type { PropType } from "vue";
import type { FilterFields } from "store/planets.ts";
import CommonSelect from "components/Input/CommonSelect.vue";
import type { SelectOption } from "@/types";
import CommonText from "components/Input/CommonText.vue";

defineEmits([
  "filterPlanets",
  "clearFilters",
  "changeFilter",
  "toggleExpandedFilters",
  "toggleFilteringUnknownResults",
]);
defineProps({
  filters: {
    type: Object as PropType<Record<FilterFields, string>>,
    required: true,
    default: () => ({}),
  },
  climateOptions: {
    type: Array as PropType<SelectOption[]>,
    required: true,
    default: () => [],
  },
  expandedFiltering: Boolean,
  hideUnknownResults: {
    type: Object as PropType<Record<string, boolean>>,
    required: true,
    default: () => ({}),
  },
});
</script>

<template>
  <div>
    <div class="filters__list">
      <div class="filters__column">
        <CommonText
          :value="filters.name"
          label="Name"
          @keyup="$emit('changeFilter', 'name', $event.target.value)"
        />
        <CommonSelect
          v-show="expandedFiltering"
          :label="'Climate'"
          :value="filters.climate"
          :options="climateOptions"
          @option-picked="$emit('changeFilter', 'climate', $event.target.value)"
        />
        <div class="filters__checkboxes">
          Hide unknown results for:
          <label>
            Population
            <input
              type="checkbox"
              :checked="hideUnknownResults.population"
              @change="$emit('toggleFilteringUnknownResults', 'population')"
            />
          </label>
          <label>
            Rotation period
            <input
              type="checkbox"
              :checked="hideUnknownResults.rotation_period"
              @change="
                $emit('toggleFilteringUnknownResults', 'rotation_period')
              "
            />
          </label>
          <label>
            Climate
            <input
              type="checkbox"
              :checked="hideUnknownResults.climate"
              @change="$emit('toggleFilteringUnknownResults', 'climate')"
            />
          </label>
        </div>
      </div>
      <div v-show="expandedFiltering" class="filters__column">
        <CommonText
          :value="filters.population_min"
          label="Population min"
          @keyup="$emit('changeFilter', 'population_min', $event.target.value)"
        />
        <CommonText
          :value="filters.population_max"
          label="Population max"
          @keyup="$emit('changeFilter', 'population_max', $event.target.value)"
        />
        <CommonText
          :value="filters.rotation_period_min"
          label="Rotation period min"
          @keyup="
            $emit('changeFilter', 'rotation_period_min', $event.target.value)
          "
        />
        <CommonText
          :value="filters.rotation_period_max"
          label="Rotation period max"
          @keyup="
            $emit('changeFilter', 'rotation_period_max', $event.target.value)
          "
        />
      </div>
    </div>
    <div class="filters__buttons">
      <button @click="$emit('toggleExpandedFilters')">
        {{ !expandedFiltering ? "Advanced filtering" : "Simple filtering" }}
      </button>
      <button v-show="expandedFiltering" @click="$emit('filterPlanets')">
        Filter results
      </button>
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

.filters__checkboxes {
  display: flex;
  flex-direction: column;
}
</style>
