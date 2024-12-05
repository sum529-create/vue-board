<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <post-filter
      @submit.prevent
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />
    <hr class="my-4" />
    <div class="row g-3">
      <app-grid :items="posts" col-class="col-6">
        <template v-slot="{ item }">
          <post-item
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
          />
        </template>
      </app-grid>
    </div>
    <app-pagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="(page) => (params._page = page)"
    />
    <Teleport to="#modal">
      <post-modal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createdAt="modalCreatedAt"
      />
    </Teleport>
    <template v-if="posts && posts.length > 0">
      <hr class="my-5" />
      <app-card>
        <post-detail-view :id="posts[0].id" />
      </app-card>
    </template>
  </div>
</template>

<script setup>
import { getPosts } from "@/api/posts";
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "./PostDetailView.vue";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import AppCard from "@/components/AppCard.vue";
import AppPagination from "@/components/AppPagination.vue";
import AppGrid from "@/components/AppGrid.vue";
import PostFilter from "@/components/posts/PostFilter.vue";
import PostModal from "@/components/posts/PostModal.vue";

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

// data_modal
const show = ref(false);
const modalTitle = ref("");
const modalContent = ref("");
const modalCreatedAt = ref("");

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

// medhod_modal
const openModal = ({ title, content, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
