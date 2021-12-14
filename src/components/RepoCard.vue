<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { formatDate } from "/@/utils/date";
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_SELECTED_ITEM,
} from "../store/mutation-type";

const props = defineProps({
  item: {
    type: Object,
    default: null,
  }
})

const router = useRouter();
const store = useStore();

function handleClick() {
  store.commit(SET_SELECTED_ITEM, props.item);
  router.push({
    name: "RepositoryPage",
    params: { owner: props.item.owner.login, repo: props.item.name },
  });
}

const inFavorites = computed(() => !!store.state.favorites[props.item.id]);
function handleFavorite() {
  if (!inFavorites.value) {
    store.commit(ADD_TO_FAVORITES, props.item);
  } else {
    store.commit(REMOVE_FROM_FAVORITES, props.item);
  }
}
</script>

<template>
  <article
    class="
      p-2
      rounded-md
      border
      border-gray-200
      bg-gray-50
      transition-all
      duration-300
      transform
      hover:-translate-y-1
      hover:scale-105
      hover:shadow-lg
    "
    @click="handleClick"
  >
    <main class="flex flex-col">
      <h1 class="font-semibold text-xl">
        {{ item.name }}
      </h1>
      <div class="flex flex-row flex-nowrap">
        <span class="text-yellow-300">
          <mdicon name="star" />
        </span>
        <span>{{ item.stargazers_count }}</span>
      </div>
      <div class="flex flex-row flex-nowrap">
        <span><mdicon name="source-commit" /></span>
        <span>{{ formatDate(item.pushed_at) }}</span>
      </div>
    </main>
    <footer class="flex flex-row flex-nowrap px-4 py-2">
      <a
        class="block w-full text-center uppercase hover:underline cursor-pointer"
        :href="item.html_url"
        @click.stop
      > Github </a>
      <button
        class="px-2 py-1 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-900"
        :class="{ 'text-red-500': inFavorites }"
        @click.stop="handleFavorite"
      >
        <mdicon :name="inFavorites ? 'heart' : 'heart-outline'" />
      </button>
    </footer>
  </article>
</template>
