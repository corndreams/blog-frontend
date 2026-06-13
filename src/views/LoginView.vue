<template>
  <div class="login-container">
    <div class="bg"></div>
    <div class="card">
      <div class="logo">博客</div>
      <el-input v-model="username" placeholder="用户名/邮箱" size="large">
        <template #prefix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
      <el-input v-model="password" :type="show ? 'text' : 'password'" placeholder="密码" size="large">
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
        <template #suffix>
          <el-link type="primary" @click="show = !show">{{ show ? '隐藏密码' : '显示密码' }}</el-link>
        </template>
      </el-input>
      <el-button type="primary" class="login-btn" size="large">登录</el-button>
      <div class="links">
        <el-link type="primary">忘记密码?</el-link>
        <el-link type="primary">注册账号</el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
const username = ref('')
const password = ref('')
const show = ref(false)
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 40px 20px;
}

.bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 78% 18%, var(--accent-soft), transparent 26rem),
    radial-gradient(circle at 20% 70%, color-mix(in srgb, var(--warm) 18%, transparent), transparent 28rem);
}

.card {
  position: relative;
  width: min(390px, 100%);
  padding: 30px;
  border-radius: 30px;
  border: 1px solid var(--line);
  background: var(--paper);
  box-shadow: var(--shadow);
  display: grid;
  gap: 16px;
  backdrop-filter: blur(18px);
}

.logo {
  text-align: center;
  font-family: var(--serif);
  font-size: 34px;
  font-weight: 900;
  color: var(--ink);
  margin-bottom: 8px;
}

:deep(.el-input__wrapper) {
  border-radius: 18px;
  background: var(--paper-soft);
  box-shadow: 0 0 0 1px var(--line) inset;
}

.login-btn {
  height: 46px;
  border-radius: 999px;
  background: var(--accent-deep);
  border-color: var(--accent-deep);
  box-shadow: 0 12px 26px color-mix(in srgb, var(--accent) 30%, transparent);
}

.links {
  display: flex;
  justify-content: space-between;

  :deep(.el-link) {
    color: var(--accent-deep);
  }
}
</style>