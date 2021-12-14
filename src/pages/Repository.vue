<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";

import { useStore } from "vuex";
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../store/mutation-type";


const store = useStore();

const repo = computed(() => store.state.selectedItem);
let languages = ref(null);
let contributors = ref(null);

function formatDate(date) {
  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const inFavorites = computed(() => !!store.state.favorites[repo.value.id]);
function handleFavorite() {
  if (!inFavorites.value) {
    store.commit(ADD_TO_FAVORITES, repo.value);
  } else {
    store.commit(REMOVE_FROM_FAVORITES, repo.value);
  }
}

const fetchLanguages = async () => {
  const response = await axios.get(repo.value.languages_url);
  languages.value = Object.keys(response.data);
};

const fetchContributors = async () => {
  const response = await axios.get(repo.value.contributors_url);
  contributors.value = response.data.slice(0, 10);
};

onMounted(() => {
  fetchLanguages();
  fetchContributors();
});

</script>

<template>
  <article class="my-4">
    <header>
      <div class="flex">
        <h1 class="w-full inline font-semibold text-2xl">
          <a :href="repo.html_url">{{ repo.name }}</a>
        </h1>
        <button
          class="px-2 py-1 self-start rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-900"
          :class="{ 'text-red-500': inFavorites }"
          @click="handleFavorite"
        >
          <mdicon :name="inFavorites ? 'heart' : 'heart-outline'" />
        </button>
      </div>
      <div class="mt-1 flex flex-col md:flex-row">
        <div class="flex flex-row items-center">
          by
          <span class="ml-2">
            <img
              :src="repo.owner.avatar_url"
              :alt="`${repo.owner.login} avatar`"
              class="inline-block w-6 border-2 border-gray-300 rounded-full"
            >
            <a
              :href="repo.owner.html_url"
              class="ml-1 font-semibold hover:underline"
            >
              {{ repo.owner.login }}
            </a>
          </span>
        </div>
        <span class="md:ml-4 flex">
          <span class="text-yellow-300">
            <mdicon name="star" />
          </span>
          {{ repo.stargazers_count }}
        </span>
        <span class="md:ml-4 flex">
          <mdicon name="source-commit" />
          {{ formatDate(repo.pushed_at) }}
        </span>
      </div>
      <ul class="mt-2 flex flex-row flex-wrap">
        <li
          v-for="lang in languages"
          :key="lang"
          class="mr-1 mb-1 px-1 border-2 border-gray-200 rounded-md bg-gray-50 text-sm"
        >
          {{ lang }}
        </li>
      </ul>
    </header>
    <main>
      <div class="mt-8">
        <div class="flex flex-row flex-nowrap">
          <span class="mr-2">
            <mdicon name="book-open" />
          </span>
          <h2 class="mb-2 font-semibold text-xl">
            Description
          </h2>
        </div>
        <p class="">
          {{ repo.description }}
        </p>
      </div>
      <div class="mt-8">
        <div class="flex flex-row flex-nowrap">
          <span class="mr-2">
            <mdicon name="account-multiple" />
          </span>
          <h2 class="mb-2 font-semibold text-xl">
            Top-10 contributors
          </h2>
        </div>
        <ul class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <li
            v-for="user in contributors"
            :key="user.id"
            class=""
          >
            <div class="flex flex-row items-center p-2">
              <img
                class="w-1/6 ring-2 ring-gray-300 rounded-full"
                :src="user.avatar_url"
                :alt="`${user.login} avatar`"
              >
              <span class="ml-4 text-lg">{{ user.login }}</span>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </article>
</template>
