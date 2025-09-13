<script setup lang="ts">
import { RouterView } from 'vue-router'
import Head from '@/components/HeadBar.vue'
</script>

<template>
  <div class="dark">
    <Head />
    <RouterView />
  </div>
</template>

<style scoped></style>
