<template>
  <div class="head" :class="{ 'head-hidden': isHidden, 'head-visible': !isHidden }">
    <div class="head-left">
      <el-icon class="logo-icon"><Edit /></el-icon>
      <span class="name">我的博客</span>
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
      <el-sub-menu index="/article">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>文章</span>
        </template>
        <el-menu-item index="/article/latest">最新文章</el-menu-item>
        <el-menu-item index="/article/popular">热门文章</el-menu-item>
        <el-menu-item index="/article/archive">文章归档</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/category">
        <template #title>
          <el-icon><Collection /></el-icon>
          <span>分类</span>
        </template>
        <el-menu-item index="/category/tech">技术</el-menu-item>
        <el-menu-item index="/category/life">生活</el-menu-item>
        <el-menu-item index="/category/other">其他</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/message">
        <el-icon><ChatDotRound /></el-icon>
        <span>留言</span>
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
        <el-sub-menu index="/article">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>文章</span>
          </template>
          <el-menu-item index="/article/latest">最新文章</el-menu-item>
          <el-menu-item index="/article/popular">热门文章</el-menu-item>
          <el-menu-item index="/article/archive">文章归档</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/category">
          <template #title>
            <el-icon><Collection /></el-icon>
            <span>分类</span>
          </template>
          <el-menu-item index="/category/tech">技术</el-menu-item>
          <el-menu-item index="/category/life">生活</el-menu-item>
          <el-menu-item index="/category/other">其他</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/message">
          <el-icon><ChatDotRound /></el-icon>
          <span>留言</span>
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
const welcomeBannerHeight = ref(500) // WelcomeBanner的高度

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
  if (currentScrollTop > welcomeBannerHeight.value) {
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
body[data-theme='dark'] .head {
  background-color: rgba(0, 0, 0, 0.5); // 半透明背景
  backdrop-filter: blur(10px); // 背景模糊效果
  .el-menu {
    background-color: rgba(0, 0, 0, 0.5); // 半透明背景
  }
  .mobile-menu {
    background-color: rgba(#141414, 0.8); // 半透明背景
    backdrop-filter: blur(10px); // 背景模糊效果
  }
}

.head {
  height: 60px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5); // 半透明背景
  // background-color: rgba(var(--el-bg-color-rgb), 0.8); // 半透明背景
  backdrop-filter: blur(10px); // 背景模糊效果
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px var(--el-menu-border-color);
  position: fixed; // 固定在顶部
  top: 0;
  left: 0;
  z-index: 1000;
  transition: transform 0.3s ease;

  .el-menu {
    --el-menu-bg-color: none;
  }
  .el-menu--horizontal.el-menu {
    border-bottom: none;
  }

  // 滚动隐藏和显示的样式
  &.head-hidden {
    transform: translateY(-100%);
  }

  &.head-visible {
    transform: translateY(0);
  }

  .head-left {
    width: 200px;
    display: flex;
    align-items: center;
    margin: 0 20px;
    padding: 0 20px;

    .logo-icon {
      font-size: 24px;
      margin-right: 10px;
      color: var(--el-color-primary);
    }

    .name {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .head-content {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .dark {
    min-width: 100px;
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
  }

  // 移动端菜单按钮
  .mobile-menu-toggle {
    display: none;
    font-size: 24px;
    margin-right: 20px;
    cursor: pointer;
  }

  // 移动端菜单
  .mobile-menu {
    display: none;
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: rgba(#e3e3e3, 0.8);
    backdrop-filter: blur(10px);
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

// 移动端适配
@media (max-width: 768px) {
  .head {
    .desktop-menu {
      display: none;
    }

    .mobile-menu-toggle {
      display: block;
    }

    .mobile-menu {
      display: block;
    }

    .head-left {
      width: auto;
      margin: 0 10px;
      padding: 0 10px;
    }
  }
}
</style>
