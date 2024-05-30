<script setup lang="ts">
defineEmits(["click"]);
defineProps({
  label: {
    type: String,
    required: true,
    default: "",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <button
    :disabled="disabled"
    class="commonButton__container"
    @click="$emit('click')"
  >
    <span class="commonButton__label">
      {{ label }}
    </span>
  </button>
</template>

<style scoped lang="postcss">
.commonButton__container {
  border: 1px solid black;
  color: black;
  background: white;
  padding: 5px 10px;

  &:hover {
    cursor: pointer;
    background: black;
    color: white;
  }

  &:disabled {
    cursor: inherit;
    background: lightgray;
    color: black;
    opacity: 50%;
  }
}
</style>
