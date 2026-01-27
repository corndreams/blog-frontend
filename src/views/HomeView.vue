<template>
  <div class="home-container">
    <!-- 欢迎横幅区域 -->
    <WelcomeBanner :welcomeData="welcomeDataComputed" style="margin-top: 60px" />

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 左侧区域 -->
      <div class="left-section">
        <!-- 社交链接卡片 -->
        <CardBox :width="'100%'" :height="'auto'">
          <div class="profile-container">
            <div
              class="avatar"
              :style="{
                backgroundImage: `url(${userStore.info?.avatar || homeData.social.profile.avatar})`,
              }"
            ></div>
            <h3 class="profile-name">{{ userStore.info?.name || homeData.social.profile.name }}</h3>
            <p class="profile-bio">{{ userStore.info?.tagline || homeData.social.profile.bio }}</p>
            <!-- <nav class="profile-stats">
              <div class="stat-item">
                <a>
                  <span class="stat-number">{{ homeData.social.profile.stats.articles }}</span>
                  <span class="stat-label">文章</span>
                </a>
              </div>
              <div class="stat-item">
                <a>
                  <span class="stat-number">{{ homeData.social.profile.stats.categories }}</span>
                  <span class="stat-label">分类</span>
                </a>
              </div>
              <div class="stat-item">
                <a>
                  <span class="stat-number">{{ homeData.social.profile.stats.tags }}</span>
                  <span class="stat-label">标签</span>
                </a>
              </div>
          </nav> -->
          <div class="visit-stats">
            <div class="stat-item">
              <a>
                <span class="stat-number">{{ visitStats.total }}</span>
                <span class="stat-label">总访问</span>
              </a>
            </div>
            <div class="stat-item">
              <a>
                <span class="stat-number">{{ visitStats.total_article }}</span>
                <span class="stat-label">文章访问</span>
              </a>
            </div>
            <div class="stat-item">
              <a>
                <span class="stat-number">{{ visitStats.total_diary }}</span>
                <span class="stat-label">随记访问</span>
              </a>
            </div>
          </div>
          </div>
          <!-- <div class="social-links">
            <a
              v-for="(link, index) in homeData.social.links"
              :key="index"
              :href="link.url"
              target="_blank"
              class="social-link"
            >
              <el-icon><component :is="getSocialIcon(link.icon)" /></el-icon>
              <span>{{ link.name }}</span>
            </a>
          </div> -->
        </CardBox>
      </div>

      <!-- 中间区域 -->
      <div class="middle-section">
        <div class="middle-section-title">文章列表</div>
        <router-link
          v-for="art in articlesStore.list"
          :key="art.id"
          :to="`/article/${art.id}`"
          class="card-link"
        >
          <CardBox
            :width="'100%'"
            :height="'240px'"
            :title="art.title"
            :description="art.description"
            :img="art.cover"
            :time="art.created_at"
            :category="art.category_name || ''"
            :tags="art.tags ? art.tags.split(',') : []"
            :visits="art.views || 0"
          >
          </CardBox>
        </router-link>
      </div>

      
    </div>
  </div>
</template>

<script setup lang="ts">
import CardBox from '@/components/CardBox.vue'
// import WelcomeBanner from '@/components/WelcomeBanner.vue'
// import Footer from '@/components/Footer.vue'
import { homeData } from '@/data/homeData'
import { onMounted, computed, ref } from 'vue'
import { useArticlesStore } from '@/stores/articles'
import { useUserStore } from '@/stores/user'
import { getVisitStats } from '@/api/visits'
// import { onMounted, ref, onUnmounted } from 'vue'

// 社交媒体图标映射
// const socialIconMap: Record<string, string> = {
//   'gitee-icon': 'Link',
//   'github-icon': 'Link',
//   'bilibili-icon': 'Link',
//   'wechat-icon': 'Link',
// }

// const getSocialIcon = (iconName: string) => {
//   return socialIconMap[iconName] || 'Link'
// }

const articlesStore = useArticlesStore()
const userStore = useUserStore()
const visitStats = ref({ total: 0, total_article: 0, total_diary: 0 })
const welcomeDataComputed = computed(() => ({
  title: homeData.welcome.title,
  subtitle: userStore.info?.quote || homeData.welcome.subtitle,
  author: homeData.welcome.author,
}))
onMounted(() => {
  articlesStore.fetchPublished()
  userStore.fetchInfo()
  getVisitStats().then((resp) => {
    visitStats.value = resp.data.data || visitStats.value
  })
})
</script>

<style scoped lang="scss">
body[data-theme='dark'] .home-container {
  // background-image: url('@/assets/img/dark.jpg');
}

.home-container {
  // max-width: 100%;
  // margin: 0 auto;
  // padding: 0;
  // // margin-top: 60px;
  // min-height: calc(100vh); // 减去导航栏高度
  // background-image: url('@/assets/img/bg.png');
  // background-size: cover;
  // background-position: center;
  // background-attachment: fixed;

    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  .main-content {
    display: flex;
    gap: 20px;

    .left-section {
      flex: 1;

      .profile-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 15px;

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
          border: 3px solid var(--el-color-primary);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 15px;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }
        }

        .profile-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 10px 0 5px;
          color: var(--el-text-color-primary);
        }

        .profile-bio {
          font-size: 0.9rem;
          color: var(--el-text-color-secondary);
          text-align: center;
          margin-bottom: 15px;
          line-height: 1.4;
        }

        .profile-stats {
          display: flex;
          width: 100%;
          justify-content: space-around;
          margin: 15px 0;
          padding: 10px 0;
          border-top: 1px solid var(--el-border-color-lighter);
          border-bottom: 1px solid var(--el-border-color-lighter);

          .stat-item {
            text-align: center;

            a {
              display: flex;
              flex-direction: column;
              cursor: pointer;
              padding: 5px 10px;
              border-radius: 6px;
              transition: background-color 0.2s;

              &:hover {
                background-color: var(--el-fill-color-light);
              }

              .stat-number {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--el-color-primary);
              }

              .stat-label {
                font-size: 0.8rem;
                color: var(--el-text-color-secondary);
                margin-top: 2px;
              }
            }
          }
        }
        .visit-stats {
          display: flex;
          width: 100%;
          justify-content: space-around;
          margin: 10px 0 0;
          padding: 10px 0;
          border-bottom: 1px solid var(--el-border-color-lighter);
        }
      }

      .social-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;
        padding: 15px;

        .social-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          transition: transform 0.2s;
          padding: 10px;

          &:hover {
            transform: translateY(-3px);
          }

          .el-icon {
            font-size: 20px;
            margin-bottom: 8px;
            color: var(--el-color-primary);
          }

          span {
            color: var(--el-text-color-primary);
            font-size: 14px;
          }
        }
      }
    }

    .middle-section {
      flex: 3;

      .middle-section-title {
        font-size: 18px;
        font-weight: bold;
        color: var(--el-text-color-primary);
        padding: 15px;
      }
      .card-link {
        text-decoration: none;
        // overflow: hidden;
        display: block;
      }
    }

    
  }
}

@media (max-width: 992px) {
  .home-container {
    .main-content {
      flex-direction: column;

      .left-section {
        .profile-container {
          .profile-stats {
            padding: 15px 0;
          }
        }
      }

      .middle-section {
        .stats-row {
          flex-wrap: wrap;

          :deep(.card-box) {
            width: 100% !important;
            margin-bottom: 15px;
          }
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .home-container {
    .main-content {
      .left-section {
        .profile-container {
          .avatar {
            width: 80px;
            height: 80px;
          }

          .profile-name {
            font-size: 1.3rem;
          }

          .profile-bio {
            font-size: 0.85rem;
          }

          .profile-stats {
            .stat-item {
              a {
                .stat-number {
                  font-size: 1rem;
                }

                .stat-label {
                  font-size: 0.75rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
