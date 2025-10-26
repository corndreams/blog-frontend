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
        <div class="footer-icp">{{ footerData.icp }}</div>
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
  icp: string
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
  // 假设网站上线时间为2023年1月1日
  const startDate = new Date('2025-09-13T19:00:00')
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

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.site-footer {
  background-color: #222;
  color: #fff;
  padding: 20px 0;
  // margin-top: 40px;

  .banner-section {
    // overflow: hidden;

    .banner-content {
      height: 100%;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      margin: 0;
      // overflow: hidden;

      // &::before {
      //   content: '';
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   right: 0;
      //   bottom: 0;
      //   // background: rgba(0, 0, 0, 0.5);
      // }

      .timer-box {
        position: relative;
        z-index: 1;
        text-align: center;
        // margin-bottom: 20px;

        h2 {
          font-size: 16px;
          margin: 0 0 6px 0;
          font-weight: bold;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        p {
          font-size: 14px;
          margin: 0 0 6px 0;
          opacity: 0.9;
        }
      }
    }
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .footer-copyright {
      margin-bottom: 10px;
      font-size: 14px;
      opacity: 0.8;
    }

    .footer-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      font-size: 12px;
      opacity: 0.6;
    }
  }
}

@media (max-width: 768px) {
  .site-footer {
    .footer-content {
      .footer-info {
        flex-direction: column;
        gap: 5px;
      }
    }
  }
}
</style>
