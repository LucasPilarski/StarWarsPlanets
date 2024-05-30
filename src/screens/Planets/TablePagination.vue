<script setup lang="ts">
import type { PropType } from "vue";
import CommonSelect from "components/Input/CommonInputSelect.vue";
import CommonButton from "components/Button/CommonButton.vue";

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
    <CommonButton label="First"       :disabled="pagination.currentPage <= 1"
                  @click="$emit('changePage', 1)"  />
    <CommonButton label="Previous"       :disabled="pagination.currentPage <= 1"
                  @click="$emit('changePage', pagination.currentPage - 1)"  />
   <div class="pagination__counter">
     <span>{{ pagination.currentPage }}</span> / <span>{{ pagination.lastPage }}</span>
   </div>
    <CommonButton id="pagination__nextPageButton" label="Next"       :disabled="pagination.currentPage === pagination.lastPage"
                  @click="$emit('changePage', pagination.currentPage + 1)" />
    <CommonButton label="Last"        :disabled="pagination.currentPage === pagination.lastPage"
                  @click="$emit('changePage', pagination.lastPage)"  />
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

<style scoped lang="postcss">
.pagination__container {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.pagination__counter {
  width: 50px;
  text-align: center;
}
</style>
