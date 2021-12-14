<script setup>
import RepoCard from "./RepoCard.vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="mt-8 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-2">
    <repo-card
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>
