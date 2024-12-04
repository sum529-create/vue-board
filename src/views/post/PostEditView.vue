<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <post-form
      @submit.prevent="edit"
      v-model:title="form.title"
      v-model:content="form.content"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger me-2"
          @click="goDetail()"
        >
          취소
        </button>
        <button @click="submitPost" class="btn btn-primary">수정</button>
      </template>
    </post-form>
    <app-alert :show="showAlert" :message="alertMessage" :type="alertType" />
  </div>
</template>

<script setup>
import { getPostById, updatePost } from "@/api/posts";
import AppAlert from "@/components/AppAlert.vue";
import PostForm from "@/components/posts/PostForm.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// data
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const form = ref({
  title: null,
  content: null,
});

// data_alert
const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref("error");

// mounted
onMounted(() => {
  fetchPost();
});

// methods
const fetchPost = async () => {
  try {
    const { data } = await getPostById(id);
    setForm(data);
  } catch (error) {
    console.error("Failed to Fetch Post: ", error);
  }
};
const setForm = ({ title, content }) => {
  form.value.title = title;
  form.value.content = content;
};
const edit = async () => {
  try {
    await updatePost(id, { ...form.value });
    vAlert("수정이 완료되었습니다.", "success");
    // router.push({ name: "PostDetail", params: { id } });
  } catch (error) {
    console.error("Failed to update post: ", error);
    vAlert("네트워크 오류", "error");
  }
};
const goDetail = () => {
  router.push({
    name: "PostDetail",
    params: {
      id,
    },
  });
};
// mehtod_alert
const vAlert = (message, type = "error") => {
  showAlert.value = true;
  alertMessage.value = message;

  alertType.value = type;
  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
