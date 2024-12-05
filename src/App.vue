<script setup>
import TheHeader from "./layouts/TheHeader.vue";
import TheView from "./layouts/TheView.vue";
import { useAlert } from "@/composables/useAlert";
// alert
const { alerts } = useAlert();
</script>

<template>
  <the-header />
  <the-view />
  <app-alert :items="alerts" />
</template>

<style scoped></style>
