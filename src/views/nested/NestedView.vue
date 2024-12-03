<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <!-- 
          replace: history를 쌓지 않는다. 기존 컴포넌트 대체, 
          as-is) about -> nested -> nestedOne (Back) -> nested
          to-be) about -> nested -> nestedOne (Back) -> about
        -->
        <router-link
          class="nav-link"
          aria-current="page"
          :to="{ name: 'NestedOne', replace: true }"
        >
          Nested One
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          aria-current="page"
          :to="{ name: 'NestedTwo', replace: true }"
        >
          Nested Two
        </router-link>
      </li>
    </ul>
    <hr class="my-4" />
    <router-view />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
