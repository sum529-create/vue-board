<template>
  <form>
    <div class="row g-3">
      <div class="col">
        <input
          :value="title"
          @input="changeTitle"
          type="text"
          class="form-control"
          placeholder="제목으로 입력해주세요."
        />
      </div>
      <div class="col-3">
        <select
          :value="limit"
          @input="$emit('update:limit', $event.target.value)"
          name="select"
          class="form-select"
        >
          <option value="3">3개씩 보기</option>
          <option value="6">6개씩 보기</option>
          <option value="9">9개씩 보기</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  limit: {
    type: Number,
  },
});
const emit = defineEmits(["update:title", "update:limit"]);
const changeTitle = (event) => {
  setTimeout(() => {
    emit("update:title", event.target.value);
  }, 500);
};
</script>

<style lang="scss" scoped></style>
