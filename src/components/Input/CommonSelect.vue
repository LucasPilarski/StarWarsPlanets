<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  value: [String, Number],
  options: {
    type: Array as PropType<{ label: string; value: string | number }[]>,
    required: true,
    default: () => [],
  },
});

defineEmits(["optionPicked"]);
</script>

<template>
  <select :value="value" @change="$emit('optionPicked', $event)">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped></style>
