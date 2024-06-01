<script setup lang="ts">
import CommonSelect from "components/Input/CommonInputSelect.vue";
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
    <CommonSelect
      :label="'Sorting column'"
      :value="sorting.sortColumn"
      :options="columns"
      @option-picked="$emit('changeSorting', 'column', $event.target.value)"
    />
    <CommonSelect
      :label="'Sorting direction'"
      :value="sorting.sortDirection"
      :options="directions"
      @option-picked="$emit('changeSorting', 'direction', $event.target.value)"
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
