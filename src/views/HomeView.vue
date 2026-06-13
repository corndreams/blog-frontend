<template>
  <div class="home-container">
    <!-- 欢迎横幅区域 -->
    <WelcomeBanner :welcomeData="welcomeDataComputed" />

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 中间区域 -->
      <div class="middle-section">
        <div class="section-heading">
          <span class="section-kicker">Recent Posts</span>
          <div class="middle-section-title">文章列表</div>
        </div>
        <router-link
          v-for="art in articlesStore.list"
          :key="art.id"
          :to="`/article/${art.id}`"
          class="card-link"
        >
          <CardBox
            :width="'100%'"
            :height="'auto'"
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
          <div class="social-links">
            <a
              v-for="link in socialLinks"
              :key="link.id"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <img class="social-icon" :src="link.icon" :alt="link.name" loading="lazy" decoding="async" />
              <span>{{ link.name }}</span>
            </a>
          </div>
        </CardBox>
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
import { getSocialLinks, type SocialLinkItem } from '@/api/links'
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
const socialLinks = ref<SocialLinkItem[]>([])
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
  getSocialLinks().then((resp) => {
    socialLinks.value = resp.data.data || []
  })
})
</script>

<style scoped lang="scss">
.home-container {
  padding-top: 26px;

  .main-content {
    max-width: var(--max);
    margin: 0 auto;
    padding: 0 20px 24px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 330px;
    gap: 24px;
    align-items: start;
  }

  .left-section {
    position: sticky;
    top: 98px;

    :deep(.card-box) {
      margin-bottom: 0;
    }

    .profile-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 0 18px;
      text-align: center;

      .avatar {
        width: 116px;
        height: 116px;
        border-radius: 34px;
        background-size: cover;
        background-position: center;
        border: 4px solid color-mix(in srgb, var(--paper-solid) 80%, white);
        outline: 1px solid var(--line);
        box-shadow: 0 18px 36px rgba(74, 61, 40, 0.16);
        margin-bottom: 18px;
        transition: transform 0.3s ease;

        &:hover {
          transform: rotate(-2deg) scale(1.04);
        }
      }

      .profile-name {
        font-family: var(--serif);
        font-size: 1.65rem;
        font-weight: 800;
        margin: 8px 0 6px;
        color: var(--ink);
      }

      .profile-bio {
        font-size: 0.95rem;
        color: var(--muted);
        margin: 0 0 18px;
        line-height: 1.8;
      }

      .visit-stats {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        padding-top: 16px;
        border-top: 1px dashed var(--line);
      }

      .stat-item {
        a {
          display: flex;
          flex-direction: column;
          gap: 4px;
          cursor: default;
          padding: 10px 6px;
          border: 1px solid var(--line);
          border-radius: 18px;
          background: color-mix(in srgb, var(--paper-soft) 88%, transparent);
          transition: transform 0.2s ease, background 0.2s ease;

          &:hover {
            transform: translateY(-2px);
            background: var(--accent-soft);
          }

          .stat-number {
            font-family: var(--serif);
            font-size: 1.24rem;
            font-weight: 800;
            color: var(--accent-deep);
          }

          .stat-label {
            font-family: var(--mono);
            font-size: 11px;
            color: var(--muted);
          }
        }
      }
    }

    .social-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      padding-top: 14px;
      border-top: 1px dashed var(--line);

      .social-link {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        text-align: center;
        text-decoration: none;
        transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        padding: 8px 10px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: var(--paper-soft);

        &:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--accent) 40%, var(--line));
          background: var(--accent-soft);
        }

        .social-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
        }

        span {
          color: var(--text);
          font-size: 13px;
          line-height: 22px;
        }
      }
    }
  }

  .middle-section {
    min-width: 0;

    .section-heading {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 14px;
      margin: 0 0 16px;
      padding: 0 4px;
    }

    .section-kicker {
      order: 2;
      font-family: var(--mono);
      font-size: 12px;
      color: var(--accent-deep);
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .middle-section-title {
      font-family: var(--serif);
      font-size: clamp(28px, 4vw, 42px);
      font-weight: 900;
      color: var(--ink);
    }

    .card-link {
      text-decoration: none;
      display: block;
    }
  }
}

@media (max-width: 992px) {
  .home-container {
    .main-content {
      grid-template-columns: 1fr;
    }

    .left-section {
      position: static;
      order: -1;
    }
  }
}

@media (max-width: 576px) {
  .home-container {
    padding-top: 16px;

    .main-content {
      padding-inline: 14px;
    }

    .middle-section .section-heading {
      align-items: start;
      flex-direction: column;
      gap: 4px;
    }

    .left-section .profile-container {
      .avatar {
        width: 92px;
        height: 92px;
        border-radius: 26px;
      }

      .profile-name {
        font-size: 1.4rem;
      }

      .visit-stats {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
