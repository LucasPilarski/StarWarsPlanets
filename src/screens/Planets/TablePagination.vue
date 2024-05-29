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
    default: () => ({ currentPage: 1, lastPage: 1, limit: "10" }),
  },
});
</script>

<template>
  <div class="pagination__container">
    <button
      :disabled="pagination.currentPage <= 1"
      @click="$emit('changePage', 1)"
    >
      First
    </button>
    <button
      :disabled="pagination.currentPage <= 1"
      @click="$emit('changePage', pagination.currentPage - 1)"
    >
      Previous
    </button>
    {{ pagination.currentPage }} / {{ pagination.lastPage }}
    <button
      id="pagination__nextPageButton"
      :disabled="pagination.currentPage === pagination.lastPage"
      @click="$emit('changePage', pagination.currentPage + 1)"
    >
      Next
    </button>
    <button
      :disabled="pagination.currentPage === pagination.lastPage"
      @click="$emit('changePage', pagination.lastPage)"
    >
      Last
    </button>
    <label>
      Limit
      <CommonSelect
        :value="pagination.limit"
        :options="[
          { label: '10', value: '10' },
          { label: '25', value: '25' },
          { label: '50', value: '50' },
          { label: '100', value: '100' },
        ]"
        @option-picked="$emit('changeLimit', $event.target.value)"
      />
    </label>
  </div>
</template>

<style scoped>
.pagination__container {
  padding: 10px 0;
  display: flex;
  align-items: center;
  width: 290px;
  justify-content: space-between;
}
</style>
