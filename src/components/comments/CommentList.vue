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

withDefaults(defineProps<Props>(), { level: 0 })
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
  margin-top: 12px;

  :deep(.card-box) {
    box-shadow: 0 10px 28px rgba(84, 70, 48, 0.08);
  }

  .comment-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;

    :deep(.el-avatar) {
      border: 2px solid var(--paper-solid);
      box-shadow: 0 8px 18px rgba(71, 58, 37, 0.14);
    }

    .meta {
      flex: 1;
      min-width: 0;

      .head {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;

        .author {
          font-family: var(--serif);
          font-weight: 800;
          color: var(--ink);
        }

        .date {
          color: var(--muted);
          font-family: var(--mono);
          font-size: 12px;
        }
      }

      .content {
        margin-top: 8px;
        color: var(--text);
        line-height: 1.85;
        background: color-mix(in srgb, var(--paper-soft) 84%, transparent);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 12px 14px;
      }

      .actions {
        margin-top: 8px;

        :deep(.el-link) {
          color: var(--accent-deep);
          font-family: var(--mono);
        }
      }

      .reply-form {
        margin-top: 12px;
      }

      .children {
        margin-top: 10px;
        border-left: 2px dashed var(--line);
        padding-left: 14px;
      }
    }
  }
}
</style>
