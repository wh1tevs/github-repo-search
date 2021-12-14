<template>
  <header class="w-full h-16 px-8 flex justify-center md:justify-start items-center border-b-2 border-gray-200">
    <router-link
      class="mr-2"
      :class="{active: $route.active}"
      to="/"
    >
      Home
    </router-link>
    <router-link
      :class="{active: $route.active}"
      to="/favorites"
    >
      Favorites
    </router-link>
  </header>
  <main class="px-4 md:max-w-screen-md md:mx-auto lg:px-0">
    <router-view />
  </main>
</template>

<style scoped>
.router-link {
  @apply px-4 py-2;
  @apply text-lg;
  @apply rounded-md hover:bg-gray-300;
}

.router-link-active {
  @apply text-blue-500;
}
</style>
