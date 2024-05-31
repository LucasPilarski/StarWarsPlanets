<script setup lang="ts">
import type { PropType } from "vue";
import type { FilterFields } from "store/main.ts";
import CommonSelect from "components/Input/CommonInputSelect.vue";
import type { SelectOption } from "@/types";
import CommonText from "components/Input/CommonInputText.vue";
import CommonCheckbox from "components/Input/CommonInputCheckbox.vue";
import CommonButton from "components/Button/CommonButton.vue";
import CommonNumber from "components/Input/CommonInputNumber.vue";

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
          <span class="filters__checkboxesLabel">
            Hide unknown results for:
          </span>
          <div class="filters__checkboxesContainer">
            <CommonCheckbox
              label="Population"
              name="population"
              :checked="hideUnknownResults.population"
              @change="$emit('toggleFilteringUnknownResults', $event)"
            />
            <CommonCheckbox
              label="Rotation period"
              name="rotation_period"
              :checked="hideUnknownResults.rotation_period"
              @change="$emit('toggleFilteringUnknownResults', $event)"
            />
            <CommonCheckbox
              label="Climate"
              name="climate"
              :checked="hideUnknownResults.climate"
              @change="$emit('toggleFilteringUnknownResults', $event)"
            />
          </div>
        </div>
      </div>
      <div v-show="expandedFiltering" class="filters__column">
        <CommonNumber
          :value="filters.population_min"
          label="Population min"
          @keyup="$emit('changeFilter', 'population_min', $event.target.value)"
        />
        <CommonNumber
          :value="filters.population_max"
          label="Population max"
          @keyup="$emit('changeFilter', 'population_max', $event.target.value)"
        />
        <CommonNumber
          :value="filters.rotation_period_min"
          label="Rotation period min"
          @keyup="
            $emit('changeFilter', 'rotation_period_min', $event.target.value)
          "
        />
        <CommonNumber
          :value="filters.rotation_period_max"
          label="Rotation period max"
          @keyup="
            $emit('changeFilter', 'rotation_period_max', $event.target.value)
          "
        />
      </div>
    </div>
    <div class="filters__buttons">
      <CommonButton
        :label="!expandedFiltering ? 'Expanded filtering' : 'Simple filtering'"
        @click="$emit('toggleExpandedFilters')"
      />
      <CommonButton
        v-if="expandedFiltering"
        :label="'Filter results'"
        @click="$emit('filterPlanets')"
      />
      <CommonButton :label="'Clear filters'" @click="$emit('clearFilters')" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.filters__column {
  width: 48%;

  @media only screen and (max-width: 760px) {
    width: 100%;
  }
}

.filters__list {
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 760px) {
    flex-direction: column;
  }
}

.filters__buttons {
  text-align: right;
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
