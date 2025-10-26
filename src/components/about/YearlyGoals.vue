<template>
  <div class="yearly-goals">
    <div class="goals-header">
      <h3 class="goals-title">{{ goalsData.title }}</h3>
      <div class="goals-stats">
        <span class="stats-item">
          <span class="stats-number">{{ completedCount }}</span>
          <span class="stats-label">已完成</span>
        </span>
        <span class="stats-item">
          <span class="stats-number">{{ totalCount }}</span>
          <span class="stats-label">总计</span>
        </span>
      </div>
    </div>

    <div class="goals-list">
      <div
        v-for="goal in goalsData.items"
        :key="goal.id"
        class="goal-item"
        :class="{ completed: goal.status === '已完成' }"
      >
        <div class="goal-checkbox">
          <el-icon v-if="goal.status === '已完成'" class="check-icon">
            <Check />
          </el-icon>
          <span v-else class="goal-number">{{ goal.id }}</span>
        </div>
        <div class="goal-content">
          <span class="goal-text">{{ goal.content }}</span>
          <div class="goal-meta">
            <span class="goal-priority" :class="`priority-${goal.priority}`">
              {{ getPriorityText(goal.priority) }}
            </span>
            <span class="goal-status">{{ goal.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Check } from '@element-plus/icons-vue'

interface GoalItem {
  id: number
  content: string
  status: string
  priority: string
}

interface GoalsData {
  title: string
  items: GoalItem[]
}

interface Props {
  goalsData: GoalsData
}

const props = defineProps<Props>()

const completedCount = computed(() => {
  return props.goalsData.items.filter((item) => item.status === '已完成').length
})

const totalCount = computed(() => {
  return props.goalsData.items.length
})

const getPriorityText = (priority: string) => {
  const priorityMap = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级',
  }
  return priorityMap[priority as keyof typeof priorityMap] || priority
}
</script>

<style scoped lang="scss">
.yearly-goals {
  background: rgba(#fafafa, 0.8);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid var(--el-border-color-light);

  .goals-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--el-border-color-lighter);

    .goals-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--el-text-color-primary);
    }

    .goals-stats {
      display: flex;
      gap: 16px;

      .stats-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;

        .stats-number {
          font-size: 1.5rem;
          font-weight: bold;
          color: #667eea;
        }

        .stats-label {
          font-size: 0.8rem;
          color: var(--el-text-color-regular);
        }
      }
    }
  }

  .goals-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .goal-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    border: 1px solid var(--el-border-color-lighter);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &.completed {
      opacity: 0.7;
      background: #f0f9ff;
      border-color: #3b82f6;

      .goal-text {
        text-decoration: line-through;
        color: var(--el-text-color-regular);
      }
    }

    .goal-checkbox {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f3f4f6;
      border: 2px solid #d1d5db;
      font-weight: bold;
      font-size: 0.9rem;
      color: var(--el-text-color-primary);

      .check-icon {
        color: #10b981;
        font-size: 1.2rem;
      }

      .goal-number {
        color: #6b7280;
      }
    }

    .goal-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .goal-text {
        font-size: 1rem;
        line-height: 1.5;
        color: var(--el-text-color-primary);
      }

      .goal-meta {
        display: flex;
        gap: 12px;
        align-items: center;

        .goal-priority {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;

          &.priority-high {
            background: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
          }

          &.priority-medium {
            background: #fffbeb;
            color: #d97706;
            border: 1px solid #fed7aa;
          }

          &.priority-low {
            background: #f0fdf4;
            color: #16a34a;
            border: 1px solid #bbf7d0;
          }
        }

        .goal-status {
          font-size: 0.8rem;
          color: var(--el-text-color-regular);
          padding: 2px 8px;
          background: #f9fafb;
          border-radius: 12px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .goals-header {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }

    .goal-item {
      padding: 12px;
    }
  }
}

body[data-theme='dark'] {
  .yearly-goals {
    background-color: rgba(#141414, 0.8);
    .goal-item {
      background-color: #2f3835;
      &:hover {
        background-color: #3a4341;
      }
    }
  }
}
</style>
