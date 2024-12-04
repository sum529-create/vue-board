<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col">
          <input v-model="params.title_like" type="text" class="form-control" />
        </div>
        <div class="col-3">
          <select v-model="params._limit" name="select" class="form-select">
            <option value="3">3개씩 보기</option>
            <option value="6">6개씩 보기</option>
            <option value="9">9개씩 보기</option>
          </select>
        </div>
      </div>
    </form>
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
    <nav class="mt-5" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: params._page === 1 }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="--params._page"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in pageCount"
          :key="page"
          class="page-item"
          :class="{ active: params._page === page }"
        >
          <a class="page-link" href="#" @click.prevent="movePage(page)">{{
            page
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: params._page === pageCount }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="++params._page"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <hr class="my-5" />
    <app-card>
      <post-detail-view :id="1" />
    </app-card>
  </div>
</template>

<script setup>
import { getPosts } from "@/api/posts";
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "./PostDetailView.vue";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import AppCard from "@/components/AppCard.vue";

// data
const posts = ref([]);
const router = useRouter();

// data_pagination
const params = ref({
  _sort: "createdAt",
  _order: "desc",
  _page: 1,
  _limit: 3,
  title_like: "",
});

const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit)
);

// methods
const fetchPosts = async () => {
  // posts.value = [...getPosts()];
  try {
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers["x-total-count"];
    // ({ data: posts.value } = await getPosts());
  } catch (error) {
    console.error("Failed to fetch Data: ", error);
  }
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

// watch
watchEffect(fetchPosts);

// method_pagination
const movePage = (page) => {
  params.value._page = page;
};
</script>

<style lang="scss" scoped></style>
