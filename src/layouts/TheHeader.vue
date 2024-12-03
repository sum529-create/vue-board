<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Sumin</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link
                to="/"
                active-class="active"
                class="nav-link"
                aria-current="page"
              >
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" active-class="active" class="nav-link">
                About
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/posts" active-class="active" class="nav-link">
                게시글
              </router-link>
            </li>
          </ul>
          <div class="d-flex">
            <button class="btn btn-outline-light" type="submit" @click="goPage">
              글쓰기
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goPage = () => {
  router.push("/posts/create");
};
</script>

<style lang="scss" scoped></style>
