<template>
  <div class="about-container">
    <!-- 个人介绍区域 -->
    <CardBox :width="'100%'" :height="'auto'">
      <ProfileIntro :profileData="aboutData.profile" />
    </CardBox>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- MBTI人格分析 -->
      <div class="content-section">
        <MBTIAnalysis :mbtiData="aboutData.mbti" />
      </div>

      <!-- 年度目标 -->
      <div class="content-section">
        <YearlyGoals :goalsData="aboutData.goals2025" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { aboutData } from '@/data/aboutData'
import ProfileIntro from '@/components/about/ProfileIntro.vue'
import MBTIAnalysis from '@/components/about/MBTIAnalysis.vue'
import YearlyGoals from '@/components/about/YearlyGoals.vue'
</script>

<style scoped lang="scss">
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 80px 16px 40px;
  }

  .main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .content-section {
      width: 100%;
    }
  }
}

// 全局样式调整，确保与项目风格一致
:deep(.el-icon) {
  vertical-align: middle;
}

// 响应式调整
@media (max-width: 768px) {
  .about-container {
    .main-content {
      gap: 16px;
    }
  }
}
</style>
