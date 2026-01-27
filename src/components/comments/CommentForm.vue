<template>
  <CardBox :width="'100%'" :height="'auto'" :title="title">
    <div class="comment-form">
      <el-input v-model="author" placeholder="你的昵称" class="input" />
      <el-input v-model="content" type="textarea" :rows="3" placeholder="写下你的内容..." class="input" />
      <el-button type="primary" @click="submit" :disabled="!canSubmit">提交</el-button>
    </div>
  </CardBox>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CardBox from '@/components/CardBox.vue'
import { addComment as addCommentApi } from '@/api/comments'
import { addMessage as addMessageApi } from '@/api/messages'

type CommentType = 'comment' | 'message'

interface Props {
  type: CommentType
  articleId?: number
  parentId?: number | null
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'submitted'): void }>()

const title = computed(() => (props.type === 'message' ? '留言' : '评论'))

const author = ref('')
const content = ref('')
const canSubmit = computed(() => author.value.trim() && content.value.trim())

const submit = async () => {
  if (!canSubmit.value) return
  // const date = new Date().toISOString().slice(0, 10)
  if (props.type === 'comment') {
    if (props.articleId == null) return
    const avatar = `https://picsum.photos/seed/${encodeURIComponent(author.value.trim())}/40/40`
    await addCommentApi({
      article_id: props.articleId,
      name: author.value.trim(),
      content: content.value.trim(),
      parent_id: props.parentId ?? null,
      avatar,
    })
  } else {
    await addMessageApi({ name: author.value.trim(), content: content.value.trim() })
  }
  author.value = ''
  content.value = ''
  emit('submitted')
}
</script>

<style scoped lang="scss">
.comment-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  padding: 6px;
  .input {
    width: 100%;
  }
}
</style>
