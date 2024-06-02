<script setup lang="ts">
import Select from "components/Input/InputSelect.vue";
import type { PropType } from "vue";
import type { SelectOption, SortParams } from "@/types";
defineEmits(["changeSorting"]);
defineProps({
  sorting: {
    type: Object as PropType<SortParams>,
    required: true,
    default: () => ({}),
  },
  columns: {
    type: Array as PropType<SelectOption[]>,
    required: true,
    default: () => [],
  },
  directions: {
    type: Array as PropType<SelectOption[]>,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div class="sorting__container">
    <Select
      :label="'Sorting column'"
      :value="sorting.sortColumn"
      :options="columns"
      :name="'column'"
      :variant="'vertical'"
      @option-picked="$emit('changeSorting', $event)"
    />
    <Select
      :label="'Sorting direction'"
      :value="sorting.sortDirection"
      :options="directions"
      :name="'direction'"
      :variant="'vertical'"
      @option-picked="$emit('changeSorting', $event)"
    />
  </div>
</template>

<style scoped lang="postcss">
.sorting__container {
  display: none;

  padding: 10px 0;

  @media only screen and (max-width: 760px) {
    display: block;
  }
}
</style>
