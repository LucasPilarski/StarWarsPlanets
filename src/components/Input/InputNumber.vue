<script setup lang="ts">
const { name } = defineProps({
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
  /*
   * Remove characters that are not digits.
   */
  const clearedValue = (e.target as HTMLInputElement).value.replace(/\D+/g, "");
  emit("keyup", {
    key: name,
    value: clearedValue,
  });
};
</script>

<template>
  <label class="number__container">
    <span class="number__label">{{ label }}</span>
    <input
      class="number__input"
      :value="value"
      type="number"
      @keyup="handleKeyup"
    />
  </label>
</template>

<style scoped lang="postcss">
.number__container {
  display: flex;
  padding: 5px 0;
  flex-direction: column;
  max-width: 250px;

  @media only screen and (max-width: 760px) {
    max-width: 100%;
  }
}

.number__label {
  padding: 0 0 5px;
  font-weight: bold;
}

.number__input {
  border: 1px solid black;
  padding: 3px 6px;
  border-radius: 10px;
}
</style>
