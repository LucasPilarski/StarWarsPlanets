<script setup lang="ts">
import type { PropType } from "vue";
import type { SelectOption } from "@/types";

defineProps({
  label: {
    type: String,
    default: "",
  },
  labelClass: {
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
    type: Array as PropType<SelectOption[]>,
    required: true,
    default: () => [],
  },
});

defineEmits(["optionPicked"]);
</script>

<template>
  <label class="select__container">
    <span class="text__label" :class="labelClass">{{ label }}</span>
    <select
      class="text__input"
      :value="value"
      @change="$emit('optionPicked', $event)"
    >
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

<style scoped lang="postcss">
.select__container {
  display: flex;
  padding: 5px 0;
  flex-direction: column;

  max-width: 250px;

  @media only screen and (max-width: 760px) {
    max-width: 100%;
  }
}

.text__label {
  padding: 0 0 5px;
  font-weight: bold;
}

.text__input {
  border: 1px solid black;
  padding: 3px 6px;
  border-radius: 10px;
}

.screenPlanets__limitLabel {
  padding-top: 5px;
}
</style>
