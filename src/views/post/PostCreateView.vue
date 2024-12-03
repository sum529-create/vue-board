<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <form @submit.prevent>
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input
          type="text"
          v-model="formatPost.title"
          class="form-control"
          id="title"
        />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea
          v-model="formatPost.content"
          class="form-control"
          id="content"
          rows="3"
        ></textarea>
      </div>
      <div class="pt-4">
        <button
          type="button"
          class="btn btn-outline-dark me-2"
          @click="goListPage"
        >
          목록
        </button>
        <button @click="submitPost" class="btn btn-primary">저장</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const emit = defineEmits(["newPost"]);

const today = new Date().toLocaleDateString("en-CA");
const router = useRouter();

const formatPost = reactive({
  title: "",
  content: "",
  createdAt: today,
});

const submitPost = () => {
  console.log(formatPost);

  // emit("submit", { ...formatPost });
};

const goListPage = () => {
  router.push({
    name: "PostList",
  });
};
</script>

<style lang="scss" scoped></style>
