<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import ReposList from "/@@/ReposList.vue";

const store = useStore();
const items = computed(() => Object.values(store.state.favorites));
</script>

<template>
  <repos-list :items="items" />
</template>
