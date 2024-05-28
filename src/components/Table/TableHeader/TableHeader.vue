<script setup lang="ts"></script>

<template>
  <thead class="tableHeader__container">
    <tr>
      <slot />
    </tr>
  </thead>
</template>

<style scoped>
.tableHeader__container {
  background-color: black;
  color: white;
  font-weight: bold;
}
</style>
