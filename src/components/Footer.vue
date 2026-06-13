<template>
  <footer class="site-footer">
    <!-- 计时器区域 -->
    <div class="banner-section">
      <div class="banner-content">
        <div class="timer-box">
          <h2>{{ timerData.title }}</h2>
          <p>{{ timerData.subtitle }}</p>
        </div>
      </div>
    </div>
    <div class="footer-content">
      <div class="footer-copyright">
        {{ footerData.copyright }}
      </div>
      <div class="footer-info">
        <!-- <div class="footer-icp">{{ footerData.icp }}</div> -->
        <div class="footer-email">{{ footerData.email }}</div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref } from 'vue'
import { homeData } from '@/data/homeData'

interface FooterData {
  copyright: string
  // icp: string
  email: string
}

interface Props {
  footerData: FooterData
}

// 网站运行时间计时器
const timerData = ref(homeData.timer)
let timerInterval: number | null = null

// 计算网站运行时间
const calculateRunningTime = () => {
  // 假设网站上线时间为2025年11月19日
  const startDate = new Date('2025-11-19T19:00:00')
  const currentDate = new Date()
  const timeDiff = currentDate.getTime() - startDate.getTime()

  // 计算天数、小时、分钟和秒数
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

  // 更新计时器显示
  timerData.value.title = `${days}天${hours}小时${minutes}分钟${seconds}秒`
}

// 组件挂载时启动计时器
onMounted(() => {
  // 立即执行一次
  calculateRunningTime()
  // 设置定时器，每秒更新一次
  timerInterval = window.setInterval(calculateRunningTime, 1000)
})

// 组件卸载时清除计时器
onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

defineProps<Props>()
</script>

<style scoped lang="scss">
.site-footer {
  margin-top: 52px;
  padding: 34px 20px 40px;
  color: var(--muted);
  border-top: 1px solid var(--line);
  background: color-mix(in srgb, var(--paper) 72%, transparent);
  backdrop-filter: blur(12px);

  .banner-section {
    .banner-content {
      max-width: var(--max);
      margin: 0 auto;
      display: flex;
      justify-content: center;

      .timer-box {
        text-align: center;
        padding: 12px 18px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: var(--paper-soft);

        h2 {
          font-family: var(--mono);
          font-size: 14px;
          margin: 0 0 4px;
          font-weight: 700;
          color: var(--accent-deep);
        }

        p {
          font-size: 13px;
          margin: 0;
          color: var(--muted);
        }
      }
    }
  }

  .footer-content {
    max-width: var(--max);
    margin: 18px auto 0;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .footer-copyright {
      margin-bottom: 8px;
      font-size: 14px;
      color: var(--text);
    }

    .footer-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      font-family: var(--mono);
      font-size: 12px;
      color: var(--faint);
    }
  }
}

@media (max-width: 768px) {
  .site-footer {
    margin-top: 36px;

    .footer-content {
      .footer-info {
        flex-direction: column;
        gap: 5px;
      }
    }
  }
}
</style>
