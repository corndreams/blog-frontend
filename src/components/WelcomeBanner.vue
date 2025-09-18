<template>
  <div class="welcome-banner">
    <div class="welcome-content">
      <h1 class="welcome-title">{{ welcomeData.title }}</h1>
      <p class="welcome-subtitle">{{ welcomeData.subtitle }}</p>
      <p class="welcome-author">{{ welcomeData.author }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface WelcomeData {
  title: string;
  subtitle: string;
  author: string;
}

interface Props {
  welcomeData: WelcomeData;
}

const props = defineProps<Props>();

console.log(props.welcomeData);

</script>

<style scoped lang="scss">
.welcome-banner {
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  
  .welcome-content {
    position: relative;
    z-index: 2;
    padding: 20px;
    max-width: 800px;
    
    .welcome-title {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: bold;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .welcome-subtitle {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      line-height: 1.6;
      opacity: 0.9;
    }
    
    .welcome-author {
      font-size: 1rem;
      font-style: italic;
      opacity: 0.8;
      margin-top: 1rem;
    }
  }
}

@media (max-width: 768px) {
  .welcome-banner {
    height: 250px;
    
    .welcome-content {
      .welcome-title {
        font-size: 1.8rem;
      }
      
      .welcome-subtitle {
        font-size: 1rem;
      }
    }
  }
}
</style>