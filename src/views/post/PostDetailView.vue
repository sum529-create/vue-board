<template>
  <div>
    <h2>게시글 상세</h2>
    <p>내용</p>
    <p class="text-muted">YYYY-MM-DD</p>
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
        <div class="btn btn-outline-danger">삭제</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

// data
const router = useRouter();
const route = useRoute();

const goPage = (type) => {
  if (type) {
    if (type === "list") {
      router.push({
        name: "PostList",
      });
    } else {
      router.push({
        name: "PostEdit",
        params: { id: route.params.id },
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
