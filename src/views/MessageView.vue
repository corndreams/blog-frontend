<template>
  <div class="message-container">
    <div class="main-content">
      <section class="wall-section full-row">
        <div class="section-title">弹幕留言墙</div>
        <DanmakuWall :items="wallItems" :height="400" :lanes="10" />
      </section>

      <section class="content-row">
        <div class="col">
          <CommentForm type="message" @submitted="refresh" />
        </div>
        <!-- <div class="col">
          <CommentList type="message" :items="messages" />
        </div> -->
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DanmakuWall from '@/components/DanmakuWall.vue'
import CommentForm from '@/components/comments/CommentForm.vue'
// import CommentList from '@/components/comments/CommentList.vue'
import { getAllMessages } from '@/api/messages'

const wallItems = ref<{ author: string; content: string }[]>([])
const messages = ref<any[]>([])

const loadMessages = async () => {
  const resp = await getAllMessages()
  const arr = resp.data.data || []
  wallItems.value = arr.map((m) => ({ author: m.name, content: m.content }))
  messages.value = arr.map((m, i) => ({ id: i + 1, author: m.name, content: m.content, avatar: `https://picsum.photos/seed/${encodeURIComponent(m.name)}/40/40` }))
}

const refresh = () => {
  loadMessages()
}

onMounted(loadMessages)
</script>

<style scoped lang="scss">
.message-container {
  // min-height: calc(100% - 120px);

  .main-content {
    max-width: 1200px;
    min-height: calc(100vh - 120px);
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .wall-section {
    flex: 1.5;
    .section-title {
      font-weight: bold;
      font-size: 18px;
      color: var(--el-text-color-primary);
      margin-bottom: 10px;
    }
  }

  .content-row {
    // display: grid;
    // grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
}

@media (max-width: 992px) {
  .message-container {
    .main-content {
      flex-direction: column;
    }
    .content-row {
      grid-template-columns: 1fr;
    }
  }
}
</style>
