<script setup lang="ts">
defineEmits(["change"]);
const { name } = defineProps({
  label: {
    type: String,
    required: true,
    default: "",
  },
  checked: Boolean,
  name: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <label class="commonCheckbox__container">
    {{ label }}
    <input type="checkbox" :checked="checked" @change="$emit('change', name)" />
  </label>
</template>

<style scoped lang="postcss">
.commonCheckbox__container {
  max-width: 130px;
  display: flex;
  justify-content: space-between;
  padding: 0 0 5px;
}
</style>
