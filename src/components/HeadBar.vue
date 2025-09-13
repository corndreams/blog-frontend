<template>
  <div class="head" >
    <div class="head-left">
      <el-icon class="logo-icon"><Edit /></el-icon>
      <span class="name">我的博客</span>
    </div>
    <el-menu class="head-content" mode="horizontal" router>
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
    <ThemeDark class="dark" />
  </div>
</template>

<script setup lang="ts">
import ThemeDark from './ThemeDark.vue'
import { Edit, HomeFilled, Document, Collection, ChatDotRound, InfoFilled } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.head {
  height: 60px;
  width: 100%;
  /* background-color: #f5f5f5; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px var(--el-menu-border-color);

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
}
</style>
