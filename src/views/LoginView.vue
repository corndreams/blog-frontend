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
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(1000px 400px at 80% 20%, rgba(64, 158, 255, 0.6), transparent),
    radial-gradient(800px 300px at 20% 60%, rgba(64, 158, 255, 0.3), transparent),
    linear-gradient(135deg, #0b1f3a, #102c4f 60%, #0b1f3a);
}
.card {
  position: relative;
  width: 380px;
  padding: 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 12px 40px rgba(64, 158, 255, 0.35), 0 0 30px rgba(64, 158, 255, 0.6) inset;
  display: grid;
  gap: 16px;
}
.logo {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #1f2d3d;
  margin-bottom: 8px;
}
.login-btn {
  height: 44px;
  border-radius: 999px;
  box-shadow: 0 12px 30px rgba(64, 158, 255, 0.4);
}
.links {
  display: flex;
  justify-content: space-between;
}

body[data-theme='dark'] .card {
  background: rgba(20, 20, 20, 0.9);
  box-shadow: 0 12px 40px rgba(64, 158, 255, 0.35), 0 0 30px rgba(64, 158, 255, 0.4) inset;
}
body[data-theme='dark'] .bg {
  background: radial-gradient(1000px 400px at 80% 20%, rgba(64, 158, 255, 0.35), transparent),
    radial-gradient(800px 300px at 20% 60%, rgba(64, 158, 255, 0.25), transparent),
    linear-gradient(135deg, #0b1f3a, #0b1f3a 60%, #0b1f3a);
}
</style>