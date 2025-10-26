<template>
  <div class="profile-intro">
    <div class="profile-avatar">
      <img :src="profileData.avatar" :alt="profileData.name" />
    </div>
    <div class="profile-content">
      <h1 class="profile-name">{{ profileData.name }}</h1>
      <h2 class="profile-title">{{ profileData.title }}</h2>
      <p class="profile-description">{{ profileData.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ProfileData {
  avatar: string
  name: string
  title: string
  description: string
  location?: string
  email?: string
}

interface Props {
  profileData: ProfileData
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.profile-intro {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 40px;
  //background: linear-gradient(135deg, #98a2cf 0%, #b69ccf 100%);
  border-radius: 16px;
  // color: white;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 24px;
    padding: 24px;
  }

  .profile-avatar {
    flex-shrink: 0;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid rgba(255, 255, 255, 0.3);
      object-fit: cover;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .profile-content {
    flex: 1;

    .profile-name {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      // background: linear-gradient(45deg, #fff, #e0e7ff);
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      // background-clip: text;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .profile-title {
      font-size: 1.25rem;
      font-weight: 400;
      margin: 0 0 16px 0;
      opacity: 0.9;
      // color: #e0e7ff;
    }

    .profile-description {
      font-size: 1rem;
      line-height: 1.6;
      margin: 0;
      opacity: 0.85;
      max-width: 600px;
    }
  }
}

</style>