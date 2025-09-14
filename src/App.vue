<script setup lang="ts">
import { RouterView } from 'vue-router'
import Head from '@/components/HeadBar.vue'
</script>

<template>
  <div class="dark">
    <Head style="position: fixed; top: 0; left: 0; right: 0; z-index: 10;"/>
    <RouterView />
  </div>
</template>

<style scoped></style>
