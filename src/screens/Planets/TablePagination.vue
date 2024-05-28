<script setup lang="ts">
import type { PropType } from "vue";
import CommonSelect from "components/Input/CommonSelect.vue";

defineEmits(["changePage", "changeLimit"]);
defineProps({
  pagination: {
    type: Object as PropType<{
      currentPage: number;
      lastPage: number;
      limit: string | number;
    }>,
    required: true,
    default: { currentPage: 1, lastPage: 1, limit: "10" },
  },
});
</script>

<template>
  <div>
    <button
      @click="$emit('changePage', 1)"
      :disabled="pagination.currentPage <= 1"
    >
      <<
    </button>
    <button
      @click="$emit('changePage', pagination.currentPage - 1)"
      :disabled="pagination.currentPage <= 1"
    >
      <
    </button>
    {{ pagination.currentPage }} / {{ pagination.lastPage }}
    <button
      @click="$emit('changePage', pagination.currentPage + 1)"
      :disabled="pagination.currentPage === pagination.lastPage"
    >
      >
    </button>
    <button
      @click="$emit('changePage', pagination.lastPage)"
      :disabled="pagination.currentPage === pagination.lastPage"
    >
      >>
    </button>
    <label>
      Limit
      <CommonSelect
        :value="pagination.limit"
        @optionPicked="$emit('changeLimit', $event.target.value)"
        :options="[
          { label: '10', value: '10' },
          { label: '25', value: '25' },
          { label: '50', value: '50' },
          { label: '100', value: '100' },
        ]"
      />
    </label>
  </div>
</template>

<style scoped></style>
