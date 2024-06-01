<script setup lang="ts">
import type { PropType } from "vue";
import type { SortDirection } from "@/types";

defineProps({
  direction: {
    type: String as PropType<SortDirection>,
    required: true,
    default: "",
  },
});
</script>

<template>
  <span v-if="direction === 'asc'"> (U) </span>
  <span v-else-if="direction === 'desc'"> (D) </span>
  <span v-else></span>
</template>

<style scoped lang="postcss"></style>
