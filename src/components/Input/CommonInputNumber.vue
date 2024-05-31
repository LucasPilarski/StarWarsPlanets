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

const emit = defineEmits(["keyup"]);

const handleKeyup = (e: KeyboardEvent) => {
  (e.target as HTMLInputElement).value = (
    e.target as HTMLInputElement
  ).value.replace(/\D+/g, "");
  emit("keyup", e);
};
</script>

<template>
  <label class="text__container">
    <span class="text__label">{{ label }}</span>
    <input
      class="text__input"
      :value="value"
      type="number"
      @keyup="handleKeyup"
    />
  </label>
</template>

<style scoped lang="postcss">
.text__container {
  display: flex;
  padding: 5px 0;
  flex-direction: column;
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
</style>
