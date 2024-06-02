<script setup lang="ts">
import type { PropType } from "vue";
import Select from "components/Input/InputSelect.vue";
import type { SelectOption } from "@/types";
import InputText from "components/Input/InputText.vue";
import Checkbox from "components/Input/InputCheckbox.vue";
import Button from "components/Button/CommonButton.vue";
import InputNumber from "components/Input/InputNumber.vue";
import type { FiltersState } from "store/filters.ts";

defineEmits([
  "filterPlanets",
  "clearFilters",
  "changeFilter",
  "toggleExpandedFilters",
  "toggleFilteringUnknownResults",
]);
defineProps({
  filtersState: {
    type: Object as PropType<FiltersState>,
    required: true,
    default: () => ({}),
  },
  climateOptions: {
    type: Array as PropType<SelectOption[]>,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div class="filters__container">
    <div class="filters__list">
      <div class="filters__column">
        <InputText
          :value="filtersState.filters.name"
          label="Name"
          :name="'name'"
          @keyup="$emit('changeFilter', $event)"
        />
        <Select
          v-show="filtersState.expandedFiltering"
          :label="'Climate'"
          :value="filtersState.filters.climate"
          :options="climateOptions"
          :name="'climate'"
          :variant="'vertical'"
          @option-picked="$emit('changeFilter', $event)"
        />
        <div class="filters__checkboxes">
          <span class="filters__checkboxesLabel">
            Hide unknown results for:
          </span>
          <div class="filters__checkboxesContainer">
            <Checkbox
              label="Population"
              name="population"
              :checked="filtersState.hideUnknownResults.population"
              @change="$emit('toggleFilteringUnknownResults', $event)"
            />
            <Checkbox
              label="Rotation period"
              name="rotation_period"
              :checked="filtersState.hideUnknownResults.rotation_period"
              @change="$emit('toggleFilteringUnknownResults', $event)"
            />
            <Checkbox
              label="Climate"
              name="climate"
              :checked="filtersState.hideUnknownResults.climate"
              @change="$emit('toggleFilteringUnknownResults', $event)"
            />
          </div>
        </div>
      </div>
      <div v-show="filtersState.expandedFiltering" class="filters__column">
        <InputNumber
          :value="filtersState.filters.population_min"
          label="Population min"
          :name="'population_min'"
          @keyup="$emit('changeFilter', $event)"
        />
        <InputNumber
          :value="filtersState.filters.population_max"
          label="Population max"
          :name="'population_max'"
          @keyup="$emit('changeFilter', $event)"
        />
      </div>
      <div v-show="filtersState.expandedFiltering" class="filters__column">
        <InputNumber
          :value="filtersState.filters.rotation_period_min"
          label="Rotation period min"
          :name="'rotation_period_min'"
          @keyup="$emit('changeFilter', $event)"
        />
        <InputNumber
          :value="filtersState.filters.rotation_period_max"
          label="Rotation period max"
          :name="'rotation_period_max'"
          @keyup="$emit('changeFilter', $event)"
        />
      </div>
    </div>
    <div class="filters__buttons">
      <Button
        :label="
          !filtersState.expandedFiltering
            ? 'Expanded filtering'
            : 'Simple filtering'
        "
        @click="$emit('toggleExpandedFilters')"
      />
      <Button
        v-if="filtersState.expandedFiltering"
        :label="'Filter results'"
        @click="$emit('filterPlanets')"
      />
      <Button :label="'Clear filters'" @click="$emit('clearFilters')" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.filters__container {
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
}

.filters__column {
  margin-right: 25px;

  @media only screen and (max-width: 760px) {
    margin-right: 0;
  }
}

.filters__list {
  display: flex;

  @media only screen and (max-width: 760px) {
    flex-direction: column;
  }
}

.filters__buttons {
  padding: 5px 0 0;
}

.filters__checkboxes {
  display: flex;
  flex-direction: column;
  max-width: 180px;
  justify-content: space-between;
  padding: 5px 0;
}

.filters__checkboxesContainer {
  max-width: 180px;
  display: flex;
  flex-direction: column;

  label {
    justify-content: space-between;
  }
}

.filters__checkboxesLabel {
  padding-bottom: 5px;
  font-weight: bold;
}
</style>
