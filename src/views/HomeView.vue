<template>
  <div class="home-container">
    <!-- 欢迎横幅区域 -->
    <WelcomeBanner :welcomeData="homeData.welcome" style="margin-top: 60px" />

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
                backgroundImage: `url(${homeData.social.profile.avatar})`
                }"
            ></div>
            <h3 class="profile-name">{{ homeData.social.profile.name }}</h3>
            <p class="profile-bio">{{ homeData.social.profile.bio }}</p>
            <nav class="profile-stats">
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
            </nav>
          </div>
          <div class="social-links">
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
          </div>
        </CardBox>
      </div>

      <!-- 中间区域 -->
      <div class="middle-section">
        <div class="middle-section-title">文章列表</div>
        <CardBox
          v-for="(item, index) in homeData.articles"
          :key="index"
          :width="'100%'"
          :height="'160px'"
          :title="item.title"
          :description="item.description"
          :tag="item.tag"
          :img="item.img"
          :time="item.time"
        >
        </CardBox>
      </div>

      <!-- 右侧区域 -->
      <div class="right-section">
        <!-- 通知区域卡片 -->
        <CardBox :width="'100%'" :height="'auto'" :title="homeData.notification.title">
          <div class="notification-content">
            <div
              v-for="(notice, index) in homeData.notification.items"
              :key="index"
              class="notice-item"
            >
              <div class="notice-title">{{ notice.content }}</div>
              <div class="notice-date">{{ notice.time }}</div>
            </div>
          </div>
        </CardBox>
        <!-- 开发列表卡片 -->
        <CardBox :width="'100%'" :height="'auto'" :title="homeData.devList.title">
          <div class="dev-list">
            <div v-for="(item, index) in homeData.devList.items" :key="index" class="dev-item">
              <el-icon><Document /></el-icon>
              <span>{{ item }}</span>
            </div>
          </div>
        </CardBox>
      </div>
    </div>

    <!-- 底部栏 -->
    <Footer :footerData="homeData.footer" />
  </div>
</template>

<script setup lang="ts">
// import CardBox from '@/components/CardBox.vue'
// import WelcomeBanner from '@/components/WelcomeBanner.vue'
// import Footer from '@/components/Footer.vue'
import { homeData } from '@/data/homeData'
import { Document } from '@element-plus/icons-vue'
// import { onMounted, ref, onUnmounted } from 'vue'

// 社交媒体图标映射
const socialIconMap: Record<string, string> = {
  'gitee-icon': 'Link',
  'github-icon': 'Link',
  'bilibili-icon': 'Link',
  'wechat-icon': 'Link',
}

// 获取社交媒体图标
const getSocialIcon = (iconName: string) => {
  return socialIconMap[iconName] || 'Link'
}
</script>

<style scoped lang="scss">
body[data-theme='dark'] .home-container {
  background-image: url('@/assets/img/dark.jpg');
}

.home-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  // margin-top: 60px;
  min-height: calc(100vh); // 减去导航栏高度
  background-image: url('@/assets/img/bg.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

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
      flex: 2;

      .middle-section-title {
        font-size: 18px;
        font-weight: bold;
        color: var(--el-text-color-primary);
        padding: 15px;
      }
    }

    .right-section {
      flex: 1;

      .notification-content {
        padding: 5px;

        .notice-item {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          border-bottom: 1px solid var(--el-border-color-lighter);
          transition: background-color 0.2s;

          &:last-child {
            border-bottom: none;
          }

          &:hover {
            background-color: var(--el-fill-color-light);
          }

          .notice-title {
            color: var(--el-text-color-primary);
            font-weight: 500;
          }

          .notice-date {
            color: var(--el-text-color-secondary);
            font-size: 12px;
          }
        }
      }

      .dev-list {
        padding: 15px;

        .dev-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          padding: 8px;
          border-radius: 4px;
          transition: background-color 0.2s;

          &:hover {
            background-color: var(--el-fill-color-light);
          }

          .el-icon {
            color: var(--el-color-primary);
          }

          span {
            color: var(--el-text-color-primary);
          }
        }
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
