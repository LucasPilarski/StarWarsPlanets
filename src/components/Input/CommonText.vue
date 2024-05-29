<script setup lang="ts">
defineProps({
  label: String,
  value: [String],
  key: String,
});

/* @TODO Pass key to the keyUp event (the same goes for the rest of the inputs) */
defineEmits(["keyUp"]);
</script>

<template>
  <label class="text__container">
    {{ label }}
    <input :value="value" type="text" @keyUp="$emit('keyUp', $event)" />
  </label>
</template>

<style scoped>
.text__container {
  display: flex;
  padding: 5px 0;
  flex-direction: column;
}
</style>
