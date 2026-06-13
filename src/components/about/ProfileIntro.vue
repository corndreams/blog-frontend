<template>
  <div class="profile-intro">
    <div class="profile-content">
      <div class="profile-avatar">
        <img :src="profileData.avatar" :alt="profileData.name || '个人头像'" loading="lazy" decoding="async" />
      </div>
      <div class="profile-info">
        <div class="profile-name">{{ profileData.name }}</div>
        <div class="profile-title">{{ profileData.title }}</div>
      </div>
    </div>
    <p class="profile-description" v-html="profileData.description"></p>
  </div>
</template>

<script setup lang="ts">
interface ProfileData {
  avatar: string | undefined
  name: string | undefined
  title: string | undefined
  description: string | undefined
  location?: string | undefined
  email?: string | undefined
}

interface Props {
  profileData: ProfileData
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.profile-intro {
  display: grid;
  gap: 24px;
  padding: clamp(16px, 3vw, 36px);

  .profile-content {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .profile-info {
    flex: 1;
    min-width: 0;
  }

  .profile-avatar {
    flex-shrink: 0;

    img {
      width: 128px;
      height: 128px;
      border-radius: 36px;
      border: 4px solid color-mix(in srgb, var(--paper-solid) 84%, white);
      outline: 1px solid var(--line);
      object-fit: cover;
      box-shadow: 0 18px 38px rgba(74, 61, 40, 0.16);
      transition: transform 0.3s ease;

      &:hover {
        transform: rotate(-2deg) scale(1.04);
      }
    }
  }

  .profile-name {
    font-family: var(--serif);
    font-size: clamp(34px, 5vw, 58px);
    font-weight: 900;
    line-height: 1.05;
    margin: 0 0 10px;
    color: var(--ink);
  }

  .profile-title {
    display: inline-flex;
    color: var(--accent-deep);
    background: var(--accent-soft);
    border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
    border-radius: 999px;
    padding: 7px 12px;
    font-family: var(--mono);
    font-size: 13px;
  }

  .profile-description {
    font-size: 1rem;
    line-height: 1.9;
    margin: 0;
    color: var(--text);
    padding-top: 20px;
    border-top: 1px dashed var(--line);
  }
}

@media (max-width: 768px) {
  .profile-intro {
    text-align: center;

    .profile-content {
      flex-direction: column;
    }

    .profile-avatar img {
      width: 108px;
      height: 108px;
      border-radius: 30px;
    }
  }
}
</style>
