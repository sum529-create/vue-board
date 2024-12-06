<template>
  <app-card>
    <template #default>
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ content }}
      </p>
      <p class="text-muted">{{ createdDate }}</p>
    </template>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-1" @click.stop="$emit('modal')">
          <i class="bi bi-book"></i>
        </button>
        <button class="btn p-1" @click.stop="$emit('preview')">
          <i class="bi bi-arrow-down-square-fill"></i>
        </button>
      </div>
    </template>
  </app-card>
</template>

<script setup>
import { computed, inject } from "vue";
import AppCard from "../app/AppCard.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: [String, Date, Number],
  },
});
defineEmits(["modal", "preview"]);
const dayjs = inject("dayjs");
const createdDate = computed(() =>
  dayjs(props.createdAt).format("YYYY. MM. DD. HH:mm:ss")
);
</script>

<style lang="scss" scoped></style>
