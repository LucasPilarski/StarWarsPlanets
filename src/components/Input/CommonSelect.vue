<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: [String, Number],
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  options: {
    type: Array as PropType<{ label: string; value: string | number }[]>,
    required: true,
    default: () => [],
  },
});

defineEmits(["optionPicked"]);
</script>

<template>
  <label class="select__container">
    {{ label }}
    <select :value="value" @change="$emit('optionPicked', $event)">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.select__container {
  display: flex;
  padding: 5px 0;
  flex-direction: column;
}
</style>
