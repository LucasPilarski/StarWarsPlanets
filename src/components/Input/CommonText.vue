<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
});

/* @TODO Pass key to the keyUp event (the same goes for the rest of the inputs) */
defineEmits(["keyup"]);
</script>

<template>
  <label class="text__container">
    {{ label }}
    <input :value="value" type="text" @keyup="$emit('keyup', $event)" />
  </label>
</template>

<style scoped>
.text__container {
  display: flex;
  padding: 5px 0;
  flex-direction: column;
}
</style>
