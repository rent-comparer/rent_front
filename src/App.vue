<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <div id="app">
    <Header />
    <main id="center" style="padding-top: 100px">
      <RouterView />
    </main>
  </div>
</template>
