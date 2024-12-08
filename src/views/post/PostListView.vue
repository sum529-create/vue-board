<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <post-filter
      @submit.prevent
      v-model:title="params.title_like"
      :limit="params._limit"
      @update:limit="changeLimit"
    />
    <hr class="my-4" />
    <app-loading v-if="loading" />
    <app-error v-else-if="error" :message="error.message" />
    <template v-else-if="!isExist">
      <p class="text-center py-5 text-muted">No Results</p>
    </template>
    <template v-else>
      <div class="row g-3">
        <app-grid :items="posts" col-class="col-6 col-sm-6 col-md-4 col-lg-3">
          <template v-slot="{ item }">
            <post-item
              :title="item.title"
              :content="item.content"
              :created-at="item.createdAt"
              @click="goPage(item.id)"
              @modal="openModal(item)"
              @preview="selectPreview(item.id)"
            />
          </template>
        </app-grid>
      </div>
      <app-pagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="(page) => (params._page = page)"
      />
    </template>
    <Teleport to="#modal">
      <post-modal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createdAt="modalCreatedAt"
      />
    </Teleport>
    <template v-if="previewId">
      <hr class="my-5" />
      <app-card>
        <post-detail-view :id="previewId" />
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
import PostFilter from "@/components/posts/PostFilter.vue";
import PostModal from "@/components/posts/PostModal.vue";
import AppLoading from "@/components/app/AppLoading.vue";
import AppError from "@/components/app/AppError.vue";
import { useAxios } from "@/composables/useAxios";

// Error
// const error = ref(null);
// const loading = ref(false);

// data
// const posts = ref([]);
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

const previewId = ref(null);
const selectPreview = (id) => (previewId.value = id);

const totalCount = computed(() => response.value.headers["x-total-count"]);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit)
);

const isExist = computed(() => posts.value && posts.value.length > 0);

const changeLimit = (value) => {
  params.value._limit = value;
  params.value._page = 1;
};

const {
  response,
  loading,
  error,
  data: posts,
} = useAxios("/posts", { method: "get", params });

// methods
// const fetchPosts = async () => {
//   // posts.value = [...getPosts()];
//   try {
//     loading.value = true;
//     const { data, headers } = await getPosts(params.value);
//     posts.value = data;
//     totalCount.value = headers["x-total-count"];
//     // ({ data: posts.value } = await getPosts());
//   } catch (e) {
//     console.error("Failed to fetch Data: ", e);
//     error.value = e;
//   } finally {
//     loading.value = false;
//   }
// };

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
// watchEffect(fetchPosts);

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
