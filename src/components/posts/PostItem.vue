<template>
  <div class="card">
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ content }}</h5>
      <p class="card-text">
        {{ createdAt }}
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<script setup>
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
</script>

<style lang="scss" scoped></style>
