<script setup>
import TheHeader from "./layouts/TheHeader.vue";
import TheView from "./layouts/TheView.vue";
// import { useAlert } from "@/composables/useAlert";
// alert
// const { alerts } = useAlert();
</script>

<template>
  <the-header />
  <the-view />
  <!-- to-be: Pinia -->
  <!-- <app-alert :items="alerts" /> -->
  <!-- import의 부재가 아닌 components.d.ts에 정의 -->
  <app-alert />
</template>

<style scoped></style>
