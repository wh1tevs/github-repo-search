<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { SET_PAGE } from "/@/store/mutation-type";

const props = defineProps({
  totalPages: {
    type: Number,
    default: 0,
  },
});

const store = useStore();

const scrollTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const currentPage = computed(() => store.state.currentPage);
const range = computed(() => {
  let pages = [];
  let min = currentPage.value - 2 >= 1 ? currentPage.value - 2 : 1;
  let max =
    currentPage.value + 2 <= props.totalPages
      ? currentPage.value + 2
      : props.totalPages;

  if (currentPage.value === 1) {
    max = 4;
  }

  if (currentPage.value === props.totalPages) {
    min = props.totalPages - 3;
  }

  for (let i = min; i <= max; i++) {
    pages.push(i);
  }

  return pages;
});

const next = () => {
  store.commit(SET_PAGE, currentPage.value + 1);
  scrollTop();
};

const prev = () => {
  store.commit(SET_PAGE, currentPage.value - 1);
  scrollTop();
};

const goToPage = (page) => store.commit(SET_PAGE, page)
</script>

<template>
  <div
    v-show="$store.state.total > 10"
    class="my-8 flex flex-row flex-wrap justify-center items-center"
  >
    <button
      class="w-7"
      @click="prev"
    >
      <mdicon name="chevron-left" />
    </button>
    <button
      v-show="range.indexOf(1) === -1"
      class="btn"
      @click="goToPage(1)"
    >
      1
    </button>
    <span
      v-if="currentPage - 2 >= 3"
      class="mx-1 text-gray-500"
    >...</span>
    <button
      v-for="i in range"
      :key="i"
      class="btn"
      :class="{ active: currentPage === i }"
      @click="goToPage(i)"
    >
      {{ i }}
    </button>

    <span
      v-if="currentPage + 2 <= totalPages - 2"
      class="mx-1 text-gray-500"
    >...</span>
    <button
      v-show="range.indexOf(totalPages) === -1"
      class="btn"
      @click="goToPage(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      class="w-7"
      @click="next"
    >
      <mdicon name="chevron-right" />
    </button>
  </div>
</template>

<style scoped>
.btn {
  @apply w-10;
  @apply border-2 border-transparent hover:border-gray-200 rounded-md;
}

.active {
  @apply bg-blue-500 text-gray-50 hover:border-transparent;
}
</style>
