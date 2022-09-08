<script setup>
import { RouterView } from "vue-router"
</script>

<template>
  <RouterView />
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --not-very-dark-blue: rgb(4, 7, 29);
  --dark-blue-2: rgb(6, 10, 41);
  --input-color: rgb(42, 45, 55);
  --white: rgb(229, 231, 255);
  --white-o-6: rgb(229, 231, 255, 0.6);
  --white-o-2: rgba(229, 231, 255, 0.2);
  --blue: rgb(11, 65, 214);
}
</style>
