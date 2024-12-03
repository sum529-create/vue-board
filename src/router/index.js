import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import { createRouter, createWebHistory } from "vue-router";
import PostCreateView from "@/views/post/PostCreateView.vue";
import PostDetailView from "@/views/post/PostDetailView.vue";
import PostListView from "@/views/post/PostListView.vue";
import PostEditView from "@/views/post/PostEditView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/posts",
    name: "PostList",
    component: PostListView,
  },
  {
    path: "/posts/create",
    name: "PostCreate",
    component: PostCreateView,
  },
  {
    path: "/posts/:id",
    name: "PostDetail",
    component: PostDetailView,
  },
  {
    path: "/posts/:id/edit",
    name: "PostEdit",
    component: PostEditView,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
