<template>
  <div>
    <h2>About View</h2>
    <button class="btn btn-primary" @click="$router.push('/')">Home</button>
    <h2>Store</h2>
    <p>counter: {{ counter }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <button @click="increment()">Click</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

// const route = useRouter();
// console.log(route);
const store = useCounterStore();

const { counter, doubleCount } = storeToRefs(store);
const { increment } = store;
counter.value = 10;
increment();
</script>

<style lang="scss" scoped></style>
