<script setup lang="ts">
import type { PropType } from "vue";
import type { LayoutVariant } from "@/types";

defineEmits(["change"]);
defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },
  checked: Boolean,
  name: {
    type: String,
    required: true,
    default: "",
  },
  variant: {
    type: String as PropType<LayoutVariant>,
    required: false,
    default: "horizontal",
  },
});
</script>

<template>
  <label
    :class="{
      checkbox__horizontal: variant === 'horizontal',
      checkbox__vertical: variant === 'vertical',
    }"
    class="checkbox__container"
  >
    <span class="checkbox__label">{{ label }}</span>
    <input
      class="checkbox__input"
      type="checkbox"
      :checked="checked"
      @change="$emit('change', name)"
    />
  </label>
</template>

<style scoped lang="postcss">
.checkbox__container {
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
}

.checkbox__horizontal {
  flex-direction: row;
}

.checkbox__vertical {
  flex-direction: column;
}

.checkbox__label {
  font-weight: bold;
}

.checkbox__input {
  width: 16px;
  height: 16px;
}
</style>
