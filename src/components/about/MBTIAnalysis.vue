<template>
  <div class="mbti-analysis">
    <div class="mbti-header">
      <div class="mbti-type">
        <span class="mbti-badge">{{ mbtiData.type }}</span>
        <h3 class="mbti-title">{{ mbtiData.title }}</h3>
      </div>
      <div class="mbti-avatar">
        <img :src="mbtiData.img" alt="" />
      </div>
    </div>

    <p class="mbti-description">{{ mbtiData.description }}</p>

    <div class="traits-container">
      <div class="traits-title">我的性格</div>
      <div class="traits-list">
        <div v-for="(trait, index) in mbtiData.traits" :key="index" class="trait-item">
          <div class="trait-labels">
            <span class="trait-left">{{ trait.name }}</span>
            <span class="trait-percentage">{{ trait.value }}%</span>
            <span class="trait-right">{{ trait.opposite }}</span>
          </div>
          <div class="trait-bar">
            <div class="trait-track"></div>
            <div
              class="trait-progress"
              :style="{
                width: `${trait.value}%`,
                backgroundColor: trait.color,
              }"
            ></div>
            <div class="trait-indicator" :style="{ left: `${trait.value}%` }">?</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TraitData {
  name: string
  value: number
  opposite: string
  color: string
}

interface MBTIData {
  type: string
  title: string
  description: string
  traits: TraitData[]
  img: string
}

interface Props {
  mbtiData: MBTIData
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.mbti-analysis {
  background: rgba(#fafafa, 0.8);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid var(--el-border-color-light);

  .mbti-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .mbti-type {
      display: flex;
      align-items: center;
      gap: 12px;

      .mbti-badge {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 1.1rem;
      }

      .mbti-title {
        margin: 0;
        color: var(--el-text-color-primary);
        font-size: 1.5rem;
        font-weight: 600;
      }
    }

    .mbti-avatar {
      flex-shrink: 0;
    }
  }

  .mbti-description {
    color: var(--el-text-color-regular);
    line-height: 1.6;
    margin-bottom: 24px;
    font-size: 0.95rem;
  }

  .traits-container {
    .traits-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--el-text-color-primary);
      margin-bottom: 20px;
    }

    .traits-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .trait-item {
      .trait-labels {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        font-size: 0.9rem;

        .trait-left {
          color: var(--el-text-color-primary);
          font-weight: 500;
        }

        .trait-percentage {
          background: #f5f5f5;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 600;
          color: var(--el-text-color-primary);
        }

        .trait-right {
          color: var(--el-text-color-regular);
        }
      }

      .trait-bar {
        position: relative;
        height: 8px;
        border-radius: 4px;
        overflow: hidden;

        .trait-track {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #e5e7eb;
          border-radius: 4px;
        }

        .trait-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 4px;
          transition: width 0.8s ease;
        }

        .trait-indicator {
          position: absolute;
          top: -8px;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          background: white;
          border: 2px solid #ddd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          color: #666;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  @media (max-width: 768px) {
    .mbti-header {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
  }
}

body[data-theme='dark'] {
  .mbti-analysis {
    background-color: rgba(#141414, 0.8);
    .card-content {
      .card-tag {
        background-color: #2f3835;
        &:hover {
          background-color: #3a4341;
        }
      }
    }
  }
}
</style>
