<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <app-error v-if="error" :message="error.message" />
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
        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 저장 </template>
        </button>
      </template>
    </post-form>
  </div>
</template>

<script setup>
import { createPost } from "@/api/posts";
import { inject, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import PostForm from "@/components/posts/PostForm.vue";
import { useAlert } from "@/composables/alert";
import AppError from "@/components/app/AppError.vue";

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

const loading = ref(false);
const error = ref(null);

const save = async () => {
  try {
    loading.value = true;
    const data = {
      ...formatPost,
      createdAt: dayjs(Date.now()).format("YYYY. MM. DD. HH:mm:ss"),
    };
    await createPost(data);
    router.push({
      name: "PostList",
    });
    vAlert("게시글을 생성하였습니다.", "success");
  } catch (e) {
    vAlert("게시글 생성에 실패하였습니다.", "error");
    console.error("Failed to Create Post: ", e);
    error.value = e;
  } finally {
    loading.value = false;
  }
};

const goListPage = () => {
  router.push({
    name: "PostList",
  });
};
</script>

<style lang="scss" scoped></style>
