<template>
  <div class="about-container">
    <header class="about-hero">
      <p>About me</p>
      <h1>关于</h1>
    </header>

    <!-- 个人介绍区域 -->
    <CardBox :width="'100%'" :height="'auto'" class="profile-card">
      <ProfileIntro :profileData="profileComputed" />
    </CardBox>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- MBTI人格分析 -->
      <div class="content-section">
        <MBTIAnalysis :mbtiData="mbtiComputed" />
      </div>

      <!-- 年度目标 -->
      <!-- <div class="content-section">
        <YearlyGoals :goalsData="aboutData.goals2025" />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// import { aboutData } from '@/data/aboutData'
import CardBox from '@/components/CardBox.vue'
import ProfileIntro from '@/components/about/ProfileIntro.vue'
import MBTIAnalysis from '@/components/about/MBTIAnalysis.vue'
// import YearlyGoals from '@/components/about/YearlyGoals.vue'
import { useUserStore } from '@/stores/user'
import { computed, onMounted } from 'vue'

const userStore = useUserStore()
const profileComputed = computed(() => ({
  avatar: userStore.info?.avatar,
  name: userStore.info?.name,
  title: userStore.info?.tagline,
  description: userStore.info?.about,
}))

const mbtiComputed = computed(() => ({
  type: userStore.info?.mbti,
  title: `我的MBTI`,
  description: userStore.info?.mbti_intro,
  // traits: aboutData.mbti.traits,
  // img: aboutData.mbti.img,
}))

onMounted(() => {
  if (!userStore.info) userStore.fetchInfo()
})
</script>

<style scoped lang="scss">
.about-container {
  max-width: var(--max);
  margin: 0 auto;
  padding: 30px 20px 40px;
  min-height: calc(100vh - 120px);

  .about-hero {
    margin-bottom: 18px;
    padding: 30px 34px;
    border: 1px solid var(--line);
    border-radius: 32px;
    background:
      radial-gradient(circle at 88% 16%, color-mix(in srgb, var(--warm) 18%, transparent), transparent 18rem),
      var(--paper);
    box-shadow: var(--shadow-soft);

    p {
      margin: 0 0 8px;
      color: var(--accent-deep);
      font-family: var(--mono);
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      color: var(--ink);
      font-family: var(--serif);
      font-size: clamp(38px, 6vw, 70px);
      line-height: 1;
    }
  }

  :deep(.profile-card.card-box) {
    margin-bottom: 22px;
  }

  .main-content {
    display: grid;
    gap: 24px;
    align-items: start;

    .content-section {
      width: 100%;
    }
  }
}

:deep(.el-icon) {
  vertical-align: middle;
}

@media (max-width: 768px) {
  .about-container {
    padding: 24px 14px 40px;

    .main-content {
      gap: 16px;
    }
  }
}
</style>
