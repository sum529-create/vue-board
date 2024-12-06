<template>
  <app-loading v-if="loading" />
  <app-error v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>{{ form.title }}</h2>
    <p>{{ form.content }}</p>
    <p class="text-muted">
      {{ $dayjs(form.createdAt).format("YYYY. MM. DD HH:mm:ss") }}
    </p>
    <!-- <p class="text-muted">{{ form.createdAt }}</p> -->
    <hr class="my-4" />
    <app-error v-if="removeError" :message="removeError.message" />
    <div class="row g-2">
      <div class="col-auto">
        <div class="btn btn-outline-dark">이전글</div>
      </div>
      <div class="col-auto">
        <div class="btn btn-outline-dark">다음글</div>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <div class="btn btn-outline-dark" @click="goPage('list')">목록</div>
      </div>
      <div class="col-auto">
        <div class="btn btn-outline-primary" @click="goPage('edit')">수정</div>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-danger"
          @click="remove()"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 삭제 </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deletePost, getPostById } from "@/api/posts";
import AppError from "@/components/app/AppError.vue";
import AppLoading from "@/components/app/AppLoading.vue";
import { useAlert } from "@/composables/useAlert";
import { useAxios } from "@/composables/useAxios";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// props
const props = defineProps({
  id: Number,
});

// data
const router = useRouter();
const { id } = props;
const { vAlert } = useAlert();
// const removeError = ref(null);
// const removeLoading = ref(false);
// url -> 반응형 객체로 변환
const url = computed(() => `/posts/${props.id}`);

const { loading, error, data: form } = useAxios(url);
const {
  loading: removeLoading,
  error: removeError,
  execute,
} = useAxios(
  url,
  { method: "delete" },
  {
    onSuccess: () => {
      vAlert("삭제가 완료되었습니다.", "success");
      router.push({
        name: "PostList",
      });
    },
    onError: (e) => {
      vAlert(e.message);
    },
    immediate: false,
  }
);

// mounted
// onMounted(() => {
//   fetchPost();
// });

// methods
// const fetchPost = async () => {
//   try {
//     loading.value = true;
//     const res = await getPostById(id);
//     form.value = { ...res.data };
//   } catch (e) {
//     error.value = e;
//     console.error("Failed to Fetch Post: ", e);
//   } finally {
//     loading.value = false;
//   }
// };

const remove = async () => {
  if (confirm("해당 포스트글을 삭제하시겠습니까?")) {
    execute();
  }
};

// const remove = async () => {
//   try {
//     removeLoading.value = true;
//     if (confirm("해당 포스트글을 삭제하시겠습니까?")) {
//       await deletePost(id);
//       router.push({
//         name: "PostList",
//       });
//     }
//   } catch (e) {
//     console.error("Failed to Delete Post: ", e);
//     removeError.value = e;
//   } finally {
//     removeLoading.value = false;
//   }
// };

const goPage = (type) => {
  if (type) {
    if (type === "list") {
      router.push({
        name: "PostList",
      });
    } else {
      router.push({
        name: "PostEdit",
        params: { id },
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
