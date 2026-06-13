<template>
  <div class="message-container">
    <div class="main-content">
      <section class="wall-section full-row">
        <div class="section-title">
          <span>Guestbook</span>
          <strong>弹幕留言墙</strong>
        </div>
        <div class="wall-card">
          <DanmakuWall :items="wallItems" :height="400" :lanes="10" />
        </div>
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
  .main-content {
    max-width: var(--max);
    min-height: calc(100vh - 120px);
    margin: 0 auto;
    padding: 30px 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .wall-section {
    .section-title {
      margin-bottom: 14px;
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 14px;

      span {
        order: 2;
        color: var(--accent-deep);
        font-family: var(--mono);
        font-size: 12px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      strong {
        color: var(--ink);
        font-family: var(--serif);
        font-size: clamp(32px, 5vw, 54px);
        line-height: 1;
      }
    }

    .wall-card {
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 32px;
      background: var(--paper);
      box-shadow: var(--shadow-soft);
    }
  }

  .content-row {
    max-width: 760px;
    width: 100%;
    margin: 0 auto;
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

@media (max-width: 576px) {
  .message-container {
    .main-content {
      padding-inline: 14px;
    }

    .wall-section .section-title {
      flex-direction: column;
      align-items: start;
      gap: 5px;
    }
  }
}
</style>
