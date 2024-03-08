<script setup>
import SignUp from '@/views/sign-up/SignUp.vue'
</script>

<template>
  <main class="container">
    <SignUp />
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
