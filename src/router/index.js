import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import { createRouter, createWebHistory } from "vue-router";
import PostCreateView from "@/views/post/PostCreateView.vue";
import PostDetailView from "@/views/post/PostDetailView.vue";
import PostListView from "@/views/post/PostListView.vue";
import PostEditView from "@/views/post/PostEditView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import NestedView from "@/views/nested/NestedView.vue";
import NestedOneView from "@/views/nested/NestedOneView.vue";
import NestedTwoView from "@/views/nested/NestedTwoView.vue";
import NestedHomeView from "@/views/nested/NestedHomeView.vue";
import MyPage from "@/views/MyPage.vue";

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
    // props: true,
    props: (route) => {
      return {
        id: parseInt(route.params.id),
      };
    },
  },
  {
    path: "/posts/:id/edit",
    name: "PostEdit",
    component: PostEditView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
  {
    path: "/nested",
    name: "Nested",
    component: NestedView,
    children: [
      {
        path: "",
        name: "NestedHome",
        component: NestedHomeView,
      },
      {
        path: "one",
        name: "NestedOne",
        component: NestedOneView,
      },
      {
        path: "two",
        name: "NestedTwo",
        component: NestedTwoView,
      },
    ],
  },
  {
    path: "/my",
    name: "MyPage",
    component: MyPage,
    beforeEnter: [removeQueryString],
    // beforeEnter: (to, from) => {
    // return false;
    // return {name: 'Home'}
    // subquery ex) &search -> redirect -> 빈값으로 떠서 현재페이지로 다시 이동

    // },
  },
];

function removeQueryString(to) {
  if (Object.keys(to.query).length > 0) {
    return { path: to.path, query: {} };
  }
}

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

// router.beforeEach((to, from) => {
// to : 이동하기 전 페이지
// from : 이동 후 페이지
// if (to.name === "MyPage") {
// 해당 페이지 이동시 막음
// return false;
// 해당 페이지 이동시 원하는 페이지로 리다이렉트
// return {name: 'Home'}
// return '/posts'
//   }
// });

export default router;
