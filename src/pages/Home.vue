<script setup>
import ReposList from "/@@/ReposList.vue";
import AppPagination from "/@@/AppPagination.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { ITEMS_PER_PAGE, MAX_PAGES } from "/@/constants";
import { SEARCH } from "/@/store/action-types";


const store = useStore();
const items = computed(() => store.state.items);
const currentPage = computed(() => store.state.currentPage);

const totalPages = computed(() => {
  const total = Math.ceil(store.state.total / ITEMS_PER_PAGE);
  // Github limitation
  return total > MAX_PAGES ? MAX_PAGES : total;
});

const debounce = ref(null);
const handleInput = ({ target: { value } }) => {
  clearTimeout(debounce.value);
  debounce.value = setTimeout(() => {
    store.dispatch(SEARCH, { query: value });
    clearTimeout(debounce.value);
  }, 700);
};

const searchInput = ref(null);
onMounted(() => {
  searchInput.value.value = store.state.lastQuery;

  if (items.value) {
    store.dispatch(SEARCH, {
      query: store.state.lastQuery,
      page: currentPage.value,
    });
  }
});

watch(currentPage, () => {
  store.dispatch(SEARCH, {
    query: store.state.lastQuery,
    page: currentPage.value,
  });
});
</script>

<template>
  <div>
    <form
      class="mt-8"
      @click.prevent
    >
      <input
        ref="searchInput"
        type="text"
        class="
          transition-all
          duration-300
          block
          w-full
          h-14
          px-4
          py-2
          rounded-md
          bg-transparent
          text-xl
          text-center
          uppercase
          text-gray-500
          hover:shadow-md
          hover:bg-gray-50
          hover:text-gray-700
          ring-inset
          ring-2
          ring-transparent
          focus:ring-blue-500
          focus:shadow-md
          focus:bg-gray-50
          focus:text-gray-900
          outline-none
        "
        placeholder="type to search..."
        @input="handleInput"
      >
    </form>
    <repos-list :items="items" />
    <app-pagination :total-pages="totalPages" />
  </div>
</template>
