<template>
  <CardBox>
    <div class="mbti-analysis">
      <div class="mbti-header">
        <div class="mbti-type">
          <h3 class="mbti-title">{{ mbtiData.title }}</h3>
          <span class="mbti-badge">{{ mbtiData.type }}</span>
        </div>
        <!-- <div class="mbti-avatar">
          <img :src="mbtiData.img" alt="" />
        </div> -->
      </div>

      <p class="mbti-description" v-html="mbtiData.description"></p>

      <!-- <div class="traits-container">
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
    </div> -->
    </div>
  </CardBox>
</template>

<script setup lang="ts">
interface TraitData {
  name: string
  value: number
  opposite: string
  color: string
}

interface MBTIData {
  type: string | undefined
  title: string
  description: string | undefined
  // traits: TraitData[]
  // img: string
}

interface Props {
  mbtiData: MBTIData
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.mbti-analysis {
  padding: 6px;

  .mbti-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    padding-bottom: 16px;
    border-bottom: 1px dashed var(--line);

    .mbti-type {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;

      .mbti-badge {
        background: var(--accent-soft);
        color: var(--accent-deep);
        border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
        padding: 8px 16px;
        border-radius: 999px;
        font-family: var(--mono);
        font-weight: 800;
        font-size: 1rem;
      }

      .mbti-title {
        margin: 0;
        color: var(--ink);
        font-family: var(--serif);
        font-size: 1.8rem;
        font-weight: 900;
      }
    }

    .mbti-avatar {
      flex-shrink: 0;
    }
  }

  .mbti-description {
    color: var(--text);
    line-height: 1.9;
    white-space: pre-line;
    margin: 0;
    font-size: 1rem;
  }

  .traits-container {
    .traits-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 20px;
    }

    .traits-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
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
</style>
