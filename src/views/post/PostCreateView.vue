<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <post-form
      @submit.prevent="save"
      v-model:title="formatPost.title"
      v-model:content="formatPost.content"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-dark me-2"
          @click="goListPage"
        >
          목록
        </button>
        <button class="btn btn-primary">저장</button>
      </template>
    </post-form>
  </div>
</template>

<script setup>
import { createPost } from "@/api/posts";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import PostForm from "@/components/posts/PostForm.vue";

const emit = defineEmits(["newPost"]);

// const today = new Date().toLocaleDateString("en-CA");
const router = useRouter();

const formatPost = reactive({
  title: "",
  content: "",
  // createdAt: today,
});

const save = async () => {
  try {
    const data = {
      ...formatPost,
      createdAt: Date.now(),
    };
    await createPost(data);
    router.push({
      name: "PostList",
    });
  } catch (error) {}
};

const goListPage = () => {
  router.push({
    name: "PostList",
  });
};
</script>

<style lang="scss" scoped></style>
