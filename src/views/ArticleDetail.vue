<template>
  <div class="article-detail-container">
    <div class="content-wrapper">
      <div class="toc-container">
        <div class="toc">
          <CardBox :height="'auto'" class="toc-card">
            <div class="toc-title">目录</div>
            <nav class="toc-list">
              <a v-for="item in toc" :key="item.id" class="toc-item" :href="`#${item.id}`">
                {{ item.title }}
              </a>
            </nav>
          </CardBox>
        </div>
      </div>

      <main class="article">
        <CardBox
          :width="'100%'"
          :height="'auto'"
          :title="article?.title"
          :time="article?.created_at"
          :tag="article?.tags ? article.tags.map((t) => t.name) : []"
          class="article-header-card"
        >
        </CardBox>
        <CardBox :width="'100%'" :height="'auto'" class="article-body-card">
          <div class="article-content" v-if="article" ref="contentRef" v-html="article.content"></div>
          <div v-else class="not-found">未找到对应的文章</div>
        </CardBox>
        <CommentForm type="comment" :article-id="articleId" @submitted="refreshComments" />
        <CommentList type="comment" :items="comments" :article-id="articleId" @submitted="refreshComments" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import CardBox from '@/components/CardBox.vue'
import CommentForm from '@/components/comments/CommentForm.vue'
import CommentList from '@/components/comments/CommentList.vue'
import { getArticleDetail, type ArticleDetailResp } from '@/api/articles'
import { getCommentsTree } from '@/api/comments'

const route = useRoute()
const articleId = ref(Number(route.params.id))
const article = ref<ArticleDetailResp['data'] | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const toc = ref<{ id: string; title: string; level: number }[]>([])
const comments = ref<any[]>([])

const loadDetail = async () => {
  const resp = await getArticleDetail(articleId.value)
  article.value = resp.data.data
  if (article.value?.title) {
    document.title = `${article.value.title} - 晚风漫记`
  }
  await nextTick()
  buildToc()
}

const loadComments = async () => {
  const resp = await getCommentsTree(articleId.value)
  comments.value = resp.data.data || []
}

const buildToc = () => {
  toc.value = []
  const el = contentRef.value
  if (!el) return
  const nodes = el.querySelectorAll('h1, h2, h3')
  let idx = 0
  nodes.forEach((node) => {
    const level = Number(node.tagName.replace('H', ''))
    idx += 1
    const text = (node.textContent || '').trim() || `标题${idx}`
    const id = node.id || `h${level}-${idx}`
    node.id = id
    toc.value.push({ id, title: text, level })
  })
}

onMounted(async () => {
  await loadDetail()
  await loadComments()
})
watch(
  () => route.params.id,
  (val) => {
    articleId.value = Number(val)
    loadDetail()
    loadComments()
  }
)

const refreshComments = () => {
  loadComments()
}
</script>

<style scoped lang="scss">
.article-detail-container {
  .content-wrapper {
    max-width: var(--max);
    min-height: calc(100vh - 120px);
    margin: 0 auto;
    padding: 30px 20px 24px;
    display: grid;
    grid-template-columns: 230px minmax(0, 1fr);
    gap: 24px;
  }

  .toc-container {
    width: 230px;
  }

  .toc {
    width: 230px;
    position: sticky;
    top: 100px;
    height: auto;
    overflow: visible;

    :deep(.card-box) {
      margin-bottom: 0;
    }

    .toc-title {
      font-family: var(--mono);
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      border-bottom: 1px dashed var(--line);
      color: var(--accent-deep);
      padding-bottom: 10px;
      margin-bottom: 12px;
    }

    .toc-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .toc-item {
      color: var(--muted);
      width: 100%;
      text-decoration: none;
      padding: 8px 10px;
      border-radius: 14px;
      line-height: 1.5;
      transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;

      &:hover {
        background: var(--accent-soft);
        color: var(--accent-deep);
        transform: translateX(2px);
      }
    }
  }

  .article {
    min-width: 0;

    :deep(.article-header-card .card-title) {
      font-size: clamp(34px, 5vw, 58px);
      line-height: 1.08;
    }

    :deep(.article-body-card.card-box) {
      background:
        repeating-linear-gradient(
          to bottom,
          transparent 0,
          transparent 35px,
          color-mix(in srgb, var(--line) 50%, transparent) 36px
        ),
        var(--paper);
    }

    .article-content {
      padding: clamp(8px, 3vw, 24px);
      color: var(--text);
      font-family: var(--serif);
      font-size: 18px;
      line-height: 2;

      :deep(h1),
      :deep(h2),
      :deep(h3) {
        color: var(--ink);
        font-family: var(--serif);
        line-height: 1.25;
        scroll-margin-top: 110px;
      }

      :deep(h1) {
        font-size: clamp(34px, 5vw, 52px);
      }

      :deep(h2) {
        font-size: clamp(27px, 4vw, 38px);
        margin-top: 2.2em;
      }

      :deep(h3) {
        font-size: 24px;
        margin-top: 1.8em;
      }

      :deep(p) {
        margin: 1.1em 0;
      }

      :deep(a) {
        color: var(--accent-deep);
        text-decoration-thickness: 1px;
        text-underline-offset: 4px;
      }

      :deep(blockquote) {
        margin: 28px 0;
        padding: 18px 22px;
        border-left: 4px solid var(--accent);
        border-radius: 0 22px 22px 0;
        background: var(--accent-soft);
        color: var(--ink);
      }

      :deep(pre) {
        padding: 18px;
        overflow: auto;
        border: 1px solid var(--line);
        border-radius: 20px;
        background: color-mix(in srgb, var(--ink) 8%, var(--paper-soft));
        font-family: var(--mono);
        font-size: 14px;
        line-height: 1.7;
      }

      :deep(code) {
        font-family: var(--mono);
        border-radius: 8px;
        padding: 0.12em 0.35em;
        background: color-mix(in srgb, var(--accent) 14%, transparent);
      }

      :deep(pre code) {
        padding: 0;
        background: transparent;
      }

      :deep(img) {
        max-width: 100%;
        border-radius: 22px;
        border: 1px solid var(--line);
        box-shadow: var(--shadow-soft);
      }

      :deep(table) {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        border-radius: 16px;
      }

      :deep(th),
      :deep(td) {
        border: 1px solid var(--line);
        padding: 10px 12px;
      }
    }

    .not-found {
      padding: 40px;
      text-align: center;
      color: var(--muted);
    }
  }
}

@media (max-width: 992px) {
  .article-detail-container {
    .content-wrapper {
      grid-template-columns: 1fr;
    }

    .toc-container,
    .toc {
      display: none;
    }

    .article-content {
      padding: 5px;
    }
  }
}

@media (max-width: 576px) {
  .article-detail-container .content-wrapper {
    padding-inline: 14px;
  }
}
</style>
