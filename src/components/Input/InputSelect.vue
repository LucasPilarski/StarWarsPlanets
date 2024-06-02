<script setup lang="ts">
import type { PropType } from "vue";
import type { LayoutVariant, SelectOption } from "@/types";

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
    type: Array as PropType<SelectOption[]>,
    required: true,
    default: () => [],
  },
  variant: {
    type: String as PropType<LayoutVariant>,
    required: false,
    default: "horizontal",
  },
});

defineEmits(["optionPicked"]);
</script>

<template>
  <label
    class="select__container"
    :class="{
      select__horizontal: variant === 'horizontal',
      select__vertical: variant === 'vertical',
    }"
  >
    <span class="select__label">{{ label }}</span>
    <select
      class="select__input"
      :value="value"
      @change="
        $emit('optionPicked', {
          name,
          value: ($event.target as HTMLInputElement).value,
        })
      "
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

.select__horizontal {
  flex-direction: row;

  .select__label {
    margin: 5px 10px 0 0;
  }
}

.select__vertical {
  flex-direction: column;
}

.select__label {
  padding: 0 0 5px;
  font-weight: bold;
}

.select__input {
  border: 1px solid black;
  padding: 2px 6px;
  border-radius: 10px;
}
</style>
