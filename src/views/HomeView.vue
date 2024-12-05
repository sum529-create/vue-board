<template>
  <div>
    <h2>Home View</h2>
    <button class="btn btn-primary" @click="goAboutPage()">About</button>
  </div>
</template>

<!-- <script>
export default {
  created() {
    console.log(this.$person.name);
    this.$person.say();
  },
};
</script> -->

<script setup>
// import { inject } from "vue";
import { useRouter } from "vue-router";

// const person = inject("person");
// console.log(person.name);

const router = useRouter();
const goAboutPage = () => {
  router.push("/about");
};
</script>

<style lang="scss" scoped></style>
