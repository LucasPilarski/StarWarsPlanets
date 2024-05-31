<script setup lang="ts">
import type { PropType } from "vue";

defineEmits(["change"]);
const { name } = defineProps({
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
    type: String as PropType<"horizontal" | "vertical">,
    required: false,
    default: "horizontal",
  },
});
</script>

<template>
  <label
    :class="{
      commonCheckbox__horizontal: variant === 'horizontal',
      commonCheckbox__vertical: variant === 'vertical',
    }"
    class="commonCheckbox__container"
  >
    <span class="commonCheckbox__label">{{ label }}</span>
    <input
      class="commonCheckbox__input"
      type="checkbox"
      :checked="checked"
      @change="$emit('change', name)"
    />
  </label>
</template>

<style scoped lang="postcss">
.commonCheckbox__container {
  display: flex;
  align-items: center;
}

.commonCheckbox__horizontal {
  flex-direction: row;
}

.commonCheckbox__vertical {
  flex-direction: column;
}

.commonCheckbox__label {
  font-weight: bold;
}

.commonCheckbox__input {
  width: 16px;
  height: 16px;
}
</style>
