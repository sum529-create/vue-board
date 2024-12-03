<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div class="col-4" v-for="(item, i) in posts" :key="i">
        <post-item
          :title="item.title"
          :content="item.content"
          :created-at="item.createdAt"
          @click="goPage(item.id)"
        />
      </div>
    </div>
    <hr class="my-4" />
    <app-card>
      <post-detail-view id="1" />
    </app-card>
  </div>
</template>

<script setup>
import { getPosts } from "@/api/posts";
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "./PostDetailView.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import AppCard from "@/components/AppCard.vue";

// data
const posts = ref([]);
const router = useRouter();

// mounted
onMounted(() => {
  fetchPosts();
});

// methods
const fetchPosts = () => {
  posts.value = [...getPosts()];
};

const goPage = (id) => {
  // router.push(`/posts/${id}`);
  router.push({
    name: "PostDetail",
    params: {
      id,
    },
  });
};
</script>

<style lang="scss" scoped></style>
