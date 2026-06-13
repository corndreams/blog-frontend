<template>
  <CardBox>
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
  </CardBox>
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
  .goals-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
    padding-bottom: 16px;
    border-bottom: 1px dashed var(--line);

    .goals-title {
      margin: 0;
      font-family: var(--serif);
      font-size: 1.8rem;
      font-weight: 900;
      color: var(--ink);
    }

    .goals-stats {
      display: flex;
      gap: 12px;

      .stats-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        min-width: 68px;
        padding: 8px 10px;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: var(--paper-soft);

        .stats-number {
          font-family: var(--serif);
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--accent-deep);
        }

        .stats-label {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--muted);
        }
      }
    }
  }

  .goals-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .goal-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px;
    background: var(--paper-soft);
    border-radius: 20px;
    border: 1px solid var(--line);
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-soft);
      background: var(--paper);
    }

    &.completed {
      opacity: 0.82;
      background: var(--accent-soft);
      border-color: color-mix(in srgb, var(--accent) 35%, var(--line));

      .goal-text {
        text-decoration: line-through;
        color: var(--muted);
      }
    }

    .goal-checkbox {
      flex-shrink: 0;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--paper-solid);
      border: 1px solid var(--line);
      font-family: var(--mono);
      font-weight: bold;
      font-size: 0.9rem;
      color: var(--accent-deep);

      .check-icon {
        color: var(--accent-deep);
        font-size: 1.2rem;
      }

      .goal-number {
        color: var(--muted);
      }
    }

    .goal-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .goal-text {
        font-size: 1rem;
        line-height: 1.6;
        color: var(--text);
      }

      .goal-meta {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;

        .goal-priority,
        .goal-status {
          padding: 3px 9px;
          border-radius: 999px;
          font-family: var(--mono);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .goal-priority.priority-high {
          background: color-mix(in srgb, #dc2626 12%, transparent);
          color: #dc2626;
          border: 1px solid color-mix(in srgb, #dc2626 24%, transparent);
        }

        .goal-priority.priority-medium {
          background: color-mix(in srgb, var(--warm) 16%, transparent);
          color: var(--warm);
          border: 1px solid color-mix(in srgb, var(--warm) 28%, transparent);
        }

        .goal-priority.priority-low {
          background: color-mix(in srgb, var(--leaf) 16%, transparent);
          color: color-mix(in srgb, var(--leaf) 72%, var(--ink));
          border: 1px solid color-mix(in srgb, var(--leaf) 28%, transparent);
        }

        .goal-status {
          color: var(--muted);
          background: var(--paper-solid);
          border: 1px solid var(--line);
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
</style>
