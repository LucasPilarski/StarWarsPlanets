<script setup lang="ts">
import type { PropType } from "vue";
import Button from "components/Button/CommonButton.vue";
import type { Pagination } from "@/types";

defineEmits(["changePage"]);
defineProps({
  pagination: {
    type: Object as PropType<Pagination>,
    required: true,
    default: () => ({ currentPage: 1, lastPage: 1, limit: "10" }),
  },
});
</script>

<template>
  <div class="pagination__container">
    <Button
      label="<<"
      :disabled="pagination.currentPage <= 1"
      @click="$emit('changePage', 1)"
    />
    <Button
      label="<"
      :disabled="pagination.currentPage <= 1"
      @click="$emit('changePage', pagination.currentPage - 1)"
    />
    <div class="pagination__counter">
      <span>{{ pagination.currentPage }}</span> /
      <span>{{ pagination.lastPage }}</span>
    </div>
    <Button
      label=">"
      :disabled="pagination.currentPage === pagination.lastPage"
      @click="$emit('changePage', pagination.currentPage + 1)"
    />
    <Button
      label=">>"
      :disabled="pagination.currentPage === pagination.lastPage"
      @click="$emit('changePage', pagination.lastPage)"
    />
  </div>
</template>

<style scoped lang="postcss">
.pagination__container {
  padding: 10px 10px 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.pagination__counter {
  width: 50px;
  text-align: center;
}
</style>
