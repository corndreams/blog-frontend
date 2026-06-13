<template>
  <div class="welcome-banner">
    <div class="welcome-content">
      <p class="eyebrow">Wind Notes · Paper Blog</p>
      <h1 class="welcome-title">{{ welcomeData.title }}</h1>
      <p class="welcome-subtitle">{{ welcomeData.subtitle }}</p>
      <!-- <p class="welcome-author">{{ welcomeData.author }}</p> -->
    </div>
    <figure class="hero-card">
      <div class="hero-image-wrap">
        <img
          :src="homeImage"
          alt="晚风漫记首页插画"
          class="hero-image"
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <figcaption class="hero-caption">
        <span class="hero-date">Today</span>
        <span class="hero-caption-text">把日常、技术与灵感写成一页页纸上漫记。</span>
      </figcaption>
      <div class="hero-stamp">漫记</div>
    </figure>
  </div>
</template>

<script setup lang="ts">
import homeImage from '@/assets/img/home.png'

interface WelcomeData {
  title: string
  subtitle: string
  author: string
}

interface Props {
  welcomeData: WelcomeData
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.welcome-banner {
  width: min(var(--max), calc(100% - 40px));
  min-height: 430px;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
  align-items: center;
  gap: 36px;
  margin: 0 auto 28px;
  padding: clamp(28px, 5vw, 58px);
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 36px;
  background:
    radial-gradient(circle at 12% 18%, color-mix(in srgb, var(--warm) 24%, transparent), transparent 18rem),
    radial-gradient(circle at 92% 12%, color-mix(in srgb, var(--accent) 25%, transparent), transparent 18rem),
    linear-gradient(135deg, color-mix(in srgb, var(--paper-solid) 92%, white), var(--paper-soft));
  box-shadow: var(--shadow);

  &::before {
    content: '';
    position: absolute;
    inset: 18px;
    border: 1px dashed color-mix(in srgb, var(--line) 80%, transparent);
    border-radius: 28px;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    right: 22%;
    bottom: -110px;
    width: 270px;
    height: 270px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent) 18%, transparent);
    filter: blur(8px);
    pointer-events: none;
  }

  .welcome-content {
    position: relative;
    z-index: 2;
    max-width: 760px;

    .eyebrow {
      margin: 0 0 18px;
      color: var(--accent-deep);
      font-family: var(--mono);
      font-size: 13px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .welcome-title {
      font-family: var(--serif);
      font-size: clamp(42px, 7vw, 82px);
      line-height: 0.98;
      margin: 0 0 22px;
      font-weight: 900;
      letter-spacing: -0.04em;
      color: var(--ink);
      text-wrap: balance;
    }

    .welcome-subtitle {
      max-width: 620px;
      font-size: clamp(16px, 2vw, 20px);
      margin: 0;
      line-height: 1.9;
      color: var(--muted);
    }
  }

  .hero-card {
    position: relative;
    z-index: 1;
    margin: 0;
    border: 1px solid var(--line);
    border-radius: 30px;
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--paper-solid) 88%, white), var(--paper-soft));
    box-shadow: 0 20px 46px rgba(83, 66, 39, 0.16);
    transform: rotate(2deg);
    padding: 14px;

    &::before {
      content: '';
      position: absolute;
      inset: 9px;
      border: 1px dashed color-mix(in srgb, var(--line) 70%, transparent);
      border-radius: 24px;
      pointer-events: none;
      z-index: 2;
    }

    .hero-image-wrap {
      position: relative;
      overflow: hidden;
      min-height: 292px;
      border-radius: 24px;
      background:
        radial-gradient(circle at 14% 12%, color-mix(in srgb, var(--warm) 18%, transparent), transparent 16rem),
        var(--paper-warm);
    }

    .hero-image {
      width: 100%;
      height: 100%;
      min-height: 292px;
      display: block;
      object-fit: cover;
      filter: saturate(0.96) contrast(0.98);
      transition: transform 0.45s ease;
    }

    &:hover .hero-image {
      transform: scale(1.035);
    }

    .hero-caption {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 10px;
      align-items: center;
      margin-top: 12px;
      padding: 0 4px 2px;
    }

    .hero-date {
      display: inline-flex;
      padding: 6px 12px;
      border-radius: 999px;
      background: var(--accent-soft);
      color: var(--accent-deep);
      font-family: var(--mono);
      font-size: 12px;
      white-space: nowrap;
    }

    .hero-caption-text {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.7;
    }

    .hero-stamp {
      position: absolute;
      right: 26px;
      bottom: 58px;
      width: 78px;
      height: 78px;
      display: grid;
      place-items: center;
      border: 2px solid color-mix(in srgb, var(--warm) 72%, transparent);
      border-radius: 50%;
      color: var(--warm);
      background: color-mix(in srgb, var(--paper-solid) 64%, transparent);
      font-family: var(--serif);
      font-weight: 800;
      transform: rotate(-12deg);
      z-index: 3;
      backdrop-filter: blur(4px);
    }
  }
}

@media (max-width: 860px) {
  .welcome-banner {
    grid-template-columns: 1fr;
    min-height: auto;

    .hero-card {
      transform: none;

      .hero-image-wrap,
      .hero-image {
        min-height: 230px;
      }
    }
  }
}

@media (max-width: 768px) {
  .welcome-banner {
    width: min(100% - 28px, var(--max));
    padding: 28px;
    border-radius: 28px;

    &::before {
      inset: 12px;
      border-radius: 22px;
    }
  }
}

@media (max-width: 520px) {
  .welcome-banner {
    .hero-card {
      padding: 10px;
      border-radius: 24px;

      .hero-image-wrap,
      .hero-image {
        min-height: 190px;
        border-radius: 18px;
      }

      .hero-caption {
        grid-template-columns: 1fr;
      }

      .hero-stamp {
        right: 18px;
        bottom: 82px;
        width: 62px;
        height: 62px;
        font-size: 14px;
      }
    }
  }
}
</style>
