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

defineEmits(["keyup"]);
</script>

<template>
  <label class="text__container">
    <span class="text__label">{{ label }}</span>
    <input
      class="text__input"
      :value="value"
      type="text"
      @keyup="
        $emit('keyup', {
          name,
          value: ($event.target as HTMLInputElement).value,
        })
      "
    />
  </label>
</template>

<style scoped lang="postcss">
.text__container {
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
</style>
