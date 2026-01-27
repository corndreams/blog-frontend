<template>
  <div class="comment-list">
    <CardBox v-for="item in items" :key="keyOf(item)" :width="'100%'" :height="'auto'">
      <div class="comment-item" :style="{ marginLeft: level * 10 + 'px' }">
        <el-avatar :size="36" :src="item.avatar" />
        <div class="meta">
          <div class="head">
            <span class="author">{{ item.name || item.author }}</span>
            <span class="date">{{ item.created_at || item.date }}</span>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="actions" v-if="type === 'comment'">
            <el-link type="primary" @click="reply(item)">回复</el-link>
          </div>
          <div v-if="replyToId === item.id" class="reply-form">
            <CommentForm
              type="comment"
              :article-id="articleId"
              :parent-id="item.id"
              @submitted="submitted"
            />
          </div>
          <div class="children" v-if="(item as any).children && (item as any).children.length">
            <CommentList
              :type="type"
              :items="(item as any).children"
              :article-id="articleId"
              :level="level + 1"
              @submitted="submitted"
            />
          </div>
        </div>
      </div>
    </CardBox>
  </div>
</template>

<script setup lang="ts">
import CardBox from '@/components/CardBox.vue'
import CommentForm from './CommentForm.vue'
import { ref } from 'vue'

type CommentType = 'comment' | 'message'

interface BaseItem {
  id?: number
  name?: string
  author?: string
  content: string
  date?: string
  created_at?: string
  avatar?: string | null
}

interface Props {
  type: CommentType
  items: BaseItem[]
  articleId?: number
  level?: number
}

const props = withDefaults(defineProps<Props>(), { level: 0 })
console.log(props.items)
const replyToId = ref<number | null>(null)
const emit = defineEmits<{ (e: 'submitted'): void }>()

const keyOf = (item: BaseItem) =>
  `${item.id ?? item.author ?? item.name}-${item.created_at ?? item.date}-${item.content.slice(0, 10)}`
const reply = (item: BaseItem) => {
  replyToId.value = (item.id as number) || null
}
const submitted = () => {
  replyToId.value = null
  emit('submitted')
}
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
        line-height: 1.8;
        background: rgba(255, 255, 255, 0.6);
        border: 1px solid var(--el-border-color-lighter);
        border-radius: 8px;
        padding: 10px 12px;
      }
      .actions {
        margin-top: 6px;
      }
      .reply-form {
        margin-top: 10px;
      }
      .children {
        margin-top: 8px;
        border-left: 2px dashed var(--el-border-color-lighter);
        padding-left: 12px;
      }
    }
  }
}
</style>
