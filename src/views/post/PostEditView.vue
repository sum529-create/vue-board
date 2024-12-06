<template>
  <app-loading v-if="loading" />
  <app-error v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <app-error v-if="editError" :message="editError.message" />
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
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 수정 </template>
        </button>
      </template>
    </post-form>
    <!-- <app-alert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
  </div>
</template>

<script setup>
import { getPostById, updatePost } from "@/api/posts";
import AppError from "@/components/app/AppError.vue";
import AppLoading from "@/components/app/AppLoading.vue";
import PostForm from "@/components/posts/PostForm.vue";
import { useAlert } from "@/composables/useAlert";
import { useAxios } from "@/composables/useAxios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// alert
const { vAlert } = useAlert();
// data
const router = useRouter();
const route = useRoute();
const id = route.params.id;
// const editLoading = ref(false);
// const editError = ref(null);

const { loading, error, data: form } = useAxios(`/posts/${id}`);

const {
  loading: editLoading,
  error: editError,
  execute,
} = useAxios(
  `/posts/${id}`,
  {
    method: "patch",
  },
  {
    onSuccess: () => {
      vAlert("수정이 완료되었습니다.", "success");
      router.push({ name: "PostDetail", params: { id } });
    },
    onError: (e) => {
      vAlert(e.message);
    },
    immediate: false,
  }
);

const edit = async () => {
  execute({ ...form.value });
};

// const form = ref({
//   title: null,
//   content: null,
// });

// mounted
// onMounted(() => {
//   fetchPost();
// });

// methods
// const fetchPost = async () => {
//   try {
//     loading.value = true;
//     const { data } = await getPostById(id);
//     setForm(data);
//   } catch (e) {
//     console.error("Failed to Fetch Post: ", e);
//     error.value = e;
//     vAlert(e.message);
//   } finally {
//     loading.value = false;
//   }
// };
// const setForm = ({ title, content }) => {
//   form.value.title = title;
//   form.value.content = content;
// };
// const edit = async () => {
//   try {
//     editLoading.value = true;
//     await updatePost(id, { ...form.value });
//     vAlert("수정이 완료되었습니다.", "success");
//     router.push({ name: "PostDetail", params: { id } });
//   } catch (e) {
//     console.error("Failed to update post: ", e);
//     vAlert(e.message);
//     editError.value = e;
//   } finally {
//     editLoading.value = false;
//   }
// };
const goDetail = () => {
  router.push({
    name: "PostDetail",
    params: {
      id,
    },
  });
};
</script>

<style lang="scss" scoped></style>
