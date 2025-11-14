<template>
  <div class="comment-list">
    <CardBox v-for="item in items" :key="keyOf(item)" :width="'100%'" :height="'auto'">
      <div class="comment-item">
        <el-avatar :size="32" :src="item.avatar" />
        <div class="meta">
          <div class="head">
            <span class="author">{{ item.author }}</span>
            <span class="date">{{ item.date }}</span>
          </div>
          <div class="content">{{ item.content }}</div>
        </div>
      </div>
    </CardBox>
  </div>
</template>

<script setup lang="ts">
import CardBox from '@/components/CardBox.vue'

type CommentType = 'comment' | 'message'

interface BaseItem {
  id?: number
  author: string
  content: string
  date: string
  avatar?: string
}

interface Props {
  type: CommentType
  items: BaseItem[]
}

const props = defineProps<Props>()

const keyOf = (item: BaseItem) => `${item.id ?? item.author}-${item.date}-${item.content.slice(0, 10)}`
</script>

<style scoped lang="scss">
.comment-list {
  margin-top: 10px;
  .comment-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    .meta {
      flex: 1;
      .head {
        display: flex;
        align-items: center;
        gap: 10px;
        .author {
          font-weight: 600;
          color: var(--el-text-color-primary);
        }
        .date {
          color: var(--el-text-color-secondary);
          font-size: 12px;
        }
      }
      .content {
        margin-top: 6px;
        color: var(--el-text-color-regular);
        line-height: 1.6;
      }
    }
  }
}
</style>
