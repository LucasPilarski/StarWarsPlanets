<script setup lang="ts">
import type { PropType } from "vue";

defineEmits(["click"]);
defineProps({
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    required: false,
    default: "button",
  },
  disabled: Boolean,
});
</script>

<template>
  <button :type="type" :disabled="disabled" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<style scoped></style>
