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
import { inject, reactive } from "vue";
import { useRouter } from "vue-router";
import PostForm from "@/components/posts/PostForm.vue";
import { useAlert } from "@/composables/alert";

const emit = defineEmits(["newPost"]);

const { vAlert } = useAlert();

// const today = new Date().toLocaleDateString("en-CA");
const router = useRouter();
const dayjs = inject("dayjs");

const formatPost = reactive({
  title: "",
  content: "",
  // createdAt: today,
});

const save = async () => {
  try {
    const data = {
      ...formatPost,
      createdAt: dayjs(Date.now()).format("YYYY. MM. DD. HH:mm:ss"),
    };
    await createPost(data);
    router.push({
      name: "PostList",
    });
    vAlert("게시글을 생성하였습니다.", "success");
  } catch (error) {
    vAlert("게시글 생성에 실패하였습니다.", "error");
    console.error("Failed to Create Post: ", error);
  }
};

const goListPage = () => {
  router.push({
    name: "PostList",
  });
};
</script>

<style lang="scss" scoped></style>
