<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.content }}</p>
    <p class="text-muted">{{ form.createdAt }}</p>
    <hr class="my-4" />
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
        <div class="btn btn-outline-danger" @click="remove()">삭제</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deletePost, getPostById } from "@/api/posts";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// props
const props = defineProps({
  id: Number,
});

// data
const router = useRouter();
const { id } = props;
const form = ref({});

// mounted
onMounted(() => {
  fetchPost();
});

// methods
const fetchPost = async () => {
  try {
    const res = await getPostById(id);
    form.value = { ...res.data };
  } catch (error) {
    console.error("Failed to Fetch Post: ", error);
  }
};

const remove = async () => {
  try {
    if (confirm("해당 포스트글을 삭제하시겠습니까?")) {
      await deletePost(id);
      router.push({
        name: "PostList",
      });
    }
  } catch (error) {
    console.error("Failed to Delete Post: ", error);
  }
};

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
