<script setup lang="ts">
import { RouterView } from 'vue-router'
import Head from '@/components/HeadBar.vue'
import Footer from '@/components/Footer.vue'
import { homeData } from '@/data/homeData'
</script>

<template>
  <div class="dark">
    <Head style="position: fixed; top: 0; left: 0; right: 0; z-index: 10" />
    <div class="main-container">
      <RouterView />
    </div>
        <!-- 底部栏 -->
    <Footer :footerData="homeData.footer" />
  </div>
</template>

<style scoped>
.main-container {
  width: 100%;
  padding: 0;
  margin-top: 60px;
  background-image: url('@/assets/img/bg.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

body[data-theme='dark'] .main-container {
  background-image: url('@/assets/img/dark.jpg');
}
</style>
