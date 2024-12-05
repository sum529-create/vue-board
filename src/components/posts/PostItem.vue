<template>
  <app-card>
    <template #default>
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ content }}
      </p>
      <p class="text-muted">{{ createdAt }}</p>
    </template>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-0" @click.stop="$emit('modal')">
          <i class="bi bi-book"></i>
        </button>
      </div>
    </template>
  </app-card>
</template>

<script setup>
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
defineEmits(["modal"]);
</script>

<style lang="scss" scoped></style>
