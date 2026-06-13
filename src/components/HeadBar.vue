<template>
  <div class="head" :class="{ 'head-hidden': isHidden, 'head-visible': !isHidden }">
    <div class="head-left">
      <!-- <el-icon class="logo-icon"><Edit /></el-icon> -->
      <img class="logo-icon" src="../assets/img/logo.png" alt="logo" />
      <span class="name">晚风漫记</span>
    </div>

    <!-- 移动端菜单按钮 -->
    <div class="mobile-menu-toggle" @click="toggleMobileMenu">
      <el-icon v-if="!mobileMenuOpen"><Menu /></el-icon>
      <el-icon v-else><Close /></el-icon>
    </div>

    <!-- 桌面端菜单 -->
    <el-menu class="head-content desktop-menu" mode="horizontal" router>
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/articles">
        <el-icon><Document /></el-icon>
        <span>文章</span>
      </el-menu-item>
      <el-menu-item index="/archive">
        <el-icon><Collection /></el-icon>
        <span>归档</span>
      </el-menu-item>
      <el-menu-item index="/message">
        <el-icon><ChatDotRound /></el-icon>
        <span>留言</span>
      </el-menu-item>
      <el-menu-item index="/notes">
        <el-icon><Edit /></el-icon>
        <span>随记</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <el-icon><InfoFilled /></el-icon>
        <span>关于</span>
      </el-menu-item>
    </el-menu>

    <!-- 移动端菜单 -->
    <div class="mobile-menu" v-show="mobileMenuOpen">
      <el-menu mode="vertical" router @select="closeMobileMenu">
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/articles">
          <el-icon><Document /></el-icon>
          <span>文章</span>
        </el-menu-item>
        <el-menu-item index="/archive">
          <el-icon><Collection /></el-icon>
          <span>归档</span>
        </el-menu-item>
        <el-menu-item index="/message">
          <el-icon><ChatDotRound /></el-icon>
          <span>留言</span>
        </el-menu-item>
        <el-menu-item index="/notes">
          <el-icon><Edit /></el-icon>
          <span>随记</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <el-icon><InfoFilled /></el-icon>
          <span>关于</span>
        </el-menu-item>
      </el-menu>
    </div>

    <ThemeDark class="dark" />
  </div>
</template>

<script setup lang="ts">
import ThemeDark from './ThemeDark.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Edit,
  HomeFilled,
  Document,
  Collection,
  ChatDotRound,
  InfoFilled,
  Menu,
  Close,
} from '@element-plus/icons-vue'

// 控制导航栏显示隐藏
const isHidden = ref(false)
const lastScrollTop = ref(0)
// const welcomeBannerHeight = ref(500) // WelcomeBanner的高度

// 移动端菜单控制
const mobileMenuOpen = ref(false)

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// 处理滚动事件
const handleScroll = () => {
  const currentScrollTop = window.scrollY

  // 判断是否超过WelcomeBanner高度
  if (currentScrollTop > 100) {
    // 判断滚动方向
    if (currentScrollTop > lastScrollTop.value) {
      // 向下滚动，隐藏导航栏
      isHidden.value = true
    } else {
      // 向上滚动，显示导航栏
      isHidden.value = false
    }
  } else {
    // 未超过WelcomeBanner高度，始终显示
    isHidden.value = false
  }

  lastScrollTop.value = currentScrollTop
}

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.head {
  height: 72px;
  width: min(100% - 32px, 1240px);
  margin: 10px auto 0;
  padding: 0 12px 0 16px;
  background: color-mix(in srgb, var(--paper) 86%, transparent);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--line);
  border-radius: 999px;
  box-shadow: 0 14px 40px rgba(83, 66, 39, 0.1);
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);
  transition: transform 0.3s ease, background 0.25s ease, box-shadow 0.25s ease;

  :deep(.el-menu) {
    --el-menu-bg-color: transparent;
    --el-menu-hover-bg-color: transparent;
    --el-menu-active-color: var(--accent-deep);
    --el-menu-text-color: var(--muted);
    background: transparent;
    border-bottom: none;
  }

  :deep(.el-menu--horizontal.el-menu) {
    border-bottom: none;
  }

  :deep(.el-menu-item) {
    height: 42px;
    margin: 0 2px;
    padding: 0 14px;
    border-radius: 999px;
    color: var(--muted);
    font-weight: 600;
    transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;

    &::after {
      display: none;
    }

    &:hover,
    &.is-active {
      color: var(--accent-deep);
      background: var(--accent-soft);
      transform: translateY(-1px);
    }
  }

  &.head-hidden {
    transform: translate(-50%, -120%);
  }

  &.head-visible {
    transform: translate(-50%, 0);
  }

  .head-left {
    min-width: 210px;
    display: flex;
    align-items: center;
    gap: 10px;

    .logo-icon {
      width: 48px;
      height: 48px;
      object-fit: contain;
      border-radius: 16px;
      background: linear-gradient(135deg, var(--paper-solid), var(--accent-soft));
      border: 1px solid var(--line);
      padding: 4px;
      box-shadow: 0 8px 18px rgba(62, 52, 34, 0.08);
    }

    .name {
      font-family: var(--serif);
      font-size: 21px;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: var(--ink);
      white-space: nowrap;
    }
  }

  .head-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .dark {
    min-width: 78px;
    display: flex;
    justify-content: flex-end;
  }

  .mobile-menu-toggle {
    display: none;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--ink);
    background: var(--paper-soft);
    cursor: pointer;
  }

  .mobile-menu {
    display: none;
    position: fixed;
    top: 76px;
    left: 0;
    width: 100%;
    padding: 8px;
    background: color-mix(in srgb, var(--paper) 94%, transparent);
    backdrop-filter: blur(18px);
    border: 1px solid var(--line);
    border-radius: 24px;
    z-index: 999;
    box-shadow: var(--shadow-soft);

    :deep(.el-menu) {
      border: none;
      background: transparent;
    }

    :deep(.el-menu-item) {
      height: 46px;
      margin: 4px 0;
      border-radius: 16px;
    }
  }
}

@media (max-width: 980px) {
  .head {
    :deep(.el-menu-item) {
      padding: 0 10px;
    }

    .head-left {
      min-width: 178px;
    }
  }
}

@media (max-width: 768px) {
  .head {
    height: 64px;
    width: min(100% - 20px, 1240px);
    margin-top: 8px;
    border-radius: 24px;

    .desktop-menu {
      display: none;
    }

    .mobile-menu-toggle {
      display: inline-flex;
      order: 2;
    }

    .mobile-menu {
      display: block;
    }

    .head-left {
      min-width: auto;

      .logo-icon {
        width: 42px;
        height: 42px;
      }

      .name {
        font-size: 18px;
      }
    }

    .dark {
      min-width: auto;
      margin-left: auto;
      margin-right: 8px;
      order: 1;
    }
  }
}

@media (max-width: 420px) {
  .head {
    padding: 0 8px 0 10px;

    .head-left .name {
      display: none;
    }
  }
}
</style>
