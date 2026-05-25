<script setup>
import Home from "./components/Home.vue";
import Header from "./components/Header.vue";
import Carusel from "./components/Carusel.vue";
</script>

<template>
  <div id="app">
    <Header />
    <main id="center" style="padding-top: 100px">
      <Carusel />
      <Home />
    </main>
  </div>
</template>
