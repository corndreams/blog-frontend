<script setup lang="ts">
import { RouterView } from 'vue-router'
import Head from '@/components/HeadBar.vue'
import Footer from '@/components/Footer.vue'
import { homeData } from '@/data/homeData'
</script>

<template>
  <div class="app-shell">
    <Head />
    <div class="main-container">
      <RouterView />
    </div>
    <!-- 底部栏 -->
    <Footer :footerData="homeData.footer" />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
}

.main-container {
  min-height: calc(100vh - 72px);
  width: 100%;
  padding: 0;
  margin-top: 72px;
  background: transparent;
}

@media (max-width: 768px) {
  .main-container {
    min-height: calc(100vh - 64px);
    margin-top: 64px;
  }
}
</style>
