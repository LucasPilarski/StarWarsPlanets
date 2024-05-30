<script setup lang="ts"></script>

<template>
  <tbody class="tableBody__container">
    <slot />
  </tbody>
</template>

<style scoped lang="postcss">
.tableBody__container {
  overflow: auto;
  max-height: 600px;
  position: relative;
  top: 40px;

  @media only screen and (max-width: 760px) {
    top: 0;
  }
}
</style>
