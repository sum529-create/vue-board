<template>
  <!-- <Transition name="slide">
    <div v-if="show" class="app-alert alert" :class="typeStyle" role="alert">
      {{ message }}
    </div>
  </Transition> -->
  <div class="app-alert">
    <TransitionGroup name="slide">
      <div
        v-for="({ message, type }, index) in alerts"
        :key="index"
        class="alert"
        :class="typeStyle(type)"
        role="alert"
      >
        {{ message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useAlertStore } from "@/stores/alert";
import { storeToRefs } from "pinia";

// import { computed } from "vue";

// defineProps({
//   items: Array,
// });
const { alerts } = storeToRefs(useAlertStore);

const typeStyle = (type) =>
  type === "error" ? "alert-danger" : "alert-primary";

// const props = defineProps({
//   show: {
//     type: Boolean,
//     default: false,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     default: "error",
//     validator: (value) => ["success", "error"].includes(value),
//   },
// });
// const typeStyle = computed(() =>
//   props.type === "error" ? "alert-danger" : "alert-primary"
// );
</script>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
