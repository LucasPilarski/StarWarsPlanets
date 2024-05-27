<script setup lang="ts">
  defineEmits(['changePage'])
  defineProps({
    currentPage: {
      type: Number,
      required: true,
      default: 1
    },
    lastPage: Number,
  })
</script>

<template>
  <div>
    <button @click="$emit('changePage', 1)" :disabled="currentPage === 1"> << </button>
    <button @click="$emit('changePage', currentPage - 1)" :disabled="currentPage === 1"> < </button>
    {{currentPage}} / {{lastPage}}
    <button @click="$emit('changePage', currentPage + 1)" :disabled="currentPage === lastPage"> > </button>
    <button @click="$emit('changePage', lastPage)" :disabled="currentPage === lastPage"> >> </button>
  </div>
</template>

<style scoped>
</style>
