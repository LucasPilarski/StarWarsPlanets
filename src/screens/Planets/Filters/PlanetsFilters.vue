<script setup lang="ts">
import type { PropType } from "vue";
import CommonSelect from "components/Input/CommonInputSelect.vue";
import type { SelectOption } from "@/types";
import CommonText from "components/Input/CommonInputText.vue";
import CommonCheckbox from "components/Input/CommonInputCheckbox.vue";
import CommonButton from "components/Button/CommonButton.vue";
import CommonNumber from "components/Input/CommonInputNumber.vue";
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
        <CommonText
          :value="filtersState.filters.name"
          label="Name"
          @keyup="$emit('changeFilter', 'name', $event.target.value)"
        />
        <CommonSelect
          v-show="filtersState.expandedFiltering"
          :label="'Climate'"
          :value="filtersState.filters.climate"
          :options="climateOptions"
          @option-picked="$emit('changeFilter', 'climate', $event.target.value)"
        />
        <div class="filters__checkboxes">
          <span class="filters__checkboxesLabel">
            Hide unknown results for:
          </span>
          <div class="filters__checkboxesContainer">
            <CommonCheckbox
              label="Population"
              name="population"
              :checked="filtersState.hideUnknownResults.population"
              @change="$emit('toggleFilteringUnknownResults', $event)"
            />
            <CommonCheckbox
              label="Rotation period"
              name="rotation_period"
              :checked="filtersState.hideUnknownResults.rotation_period"
              @change="$emit('toggleFilteringUnknownResults', $event)"
            />
            <CommonCheckbox
              label="Climate"
              name="climate"
              :checked="filtersState.hideUnknownResults.climate"
              @change="$emit('toggleFilteringUnknownResults', $event)"
            />
          </div>
        </div>
      </div>
      <div v-show="filtersState.expandedFiltering" class="filters__column">
        <CommonNumber
          :value="filtersState.filters.population_min"
          label="Population min"
          @keyup="$emit('changeFilter', 'population_min', $event.target.value)"
        />
        <CommonNumber
          :value="filtersState.filters.population_max"
          label="Population max"
          @keyup="$emit('changeFilter', 'population_max', $event.target.value)"
        />
      </div>
      <div v-show="filtersState.expandedFiltering" class="filters__column">
        <CommonNumber
          :value="filtersState.filters.rotation_period_min"
          label="Rotation period min"
          @keyup="
            $emit('changeFilter', 'rotation_period_min', $event.target.value)
          "
        />
        <CommonNumber
          :value="filtersState.filters.rotation_period_max"
          label="Rotation period max"
          @keyup="
            $emit('changeFilter', 'rotation_period_max', $event.target.value)
          "
        />
      </div>
    </div>
    <div class="filters__buttons">
      <CommonButton
        :label="
          !filtersState.expandedFiltering
            ? 'Expanded filtering'
            : 'Simple filtering'
        "
        @click="$emit('toggleExpandedFilters')"
      />
      <CommonButton
        v-if="filtersState.expandedFiltering"
        :label="'Filter results'"
        @click="$emit('filterPlanets')"
      />
      <CommonButton :label="'Clear filters'" @click="$emit('clearFilters')" />
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
  padding: 0 0 5px;
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
