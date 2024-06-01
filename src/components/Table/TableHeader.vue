<script setup lang="ts"></script>

<template>
  <thead class="tableHeader__container">
    <tr>
      <slot />
    </tr>
  </thead>
</template>

<style scoped lang="postcss">
.tableHeader__container {
  background-color: black;
  color: white;
  font-weight: bold;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
}
</style>
