<template>
  <div class="article-detail-container">
    <div class="content-wrapper">
      <div class="toc-container">
        <div class="toc">
          <CardBox :height="'auto'" class="toc-card">
            <div class="toc-title">目录</div>
            <nav class="toc-list">
              <a v-for="sec in sections" :key="sec.id" class="toc-item" :href="`#${sec.id}`">
                {{ sec.title }}
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
          :time="article?.time"
          :tag="article?.tags"
        >
        </CardBox>
        <CardBox :width="'100%'" :height="'auto'">
          <div class="article-content" v-if="article">
            <section v-for="sec in sections" :key="sec.id" class="section">
              <h2 :id="sec.id" class="section-title">{{ sec.title }}</h2>
              <p v-for="(p, i) in sec.content" :key="i" class="paragraph">{{ p }}</p>
            </section>
          </div>
          <div v-else class="not-found">未找到对应的文章</div>
        </CardBox>
        <CommentForm type="comment" :article-id="articleId" @submitted="refreshComments" />
        <CommentList type="comment" :items="comments" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import CardBox from '@/components/CardBox.vue'
import { getArticleById } from '@/data/articlesData'
import CommentForm from '@/components/comments/CommentForm.vue'
import CommentList from '@/components/comments/CommentList.vue'
// 替换为拆分后的评论组件

const route = useRoute()
const articleId = Number(route.params.id)
const article = computed(() => getArticleById(articleId))
const sections = computed(() => article.value?.sections ?? [])
const comments = ref([...(getArticleById(articleId)?.comments ?? [])])
const refreshComments = () => {
  comments.value = [...(getArticleById(articleId)?.comments ?? [])]
}
</script>

<style scoped lang="scss">
.article-detail-container {
  .content-wrapper {
    max-width: 1200px;
    min-height: calc(100vh - 120px);
    margin: 0 auto;
    padding: 20px;
    display: flex;
    gap: 20px;
  }

  .toc-container {
    width: 220px;
  }

  .toc {
    width: 220px;
    position: sticky;
    top: 80px;
    height: auto;
    overflow: visible;

    :deep(.card-box) {
      margin-bottom: 0;
    }

    .toc-title {
      font-weight: bold;
      font-size: 18px;
      border-bottom: 1px solid var(--el-border-color-lighter);
      margin-bottom: 10px;
      color: var(--el-text-color-primary);
      padding-bottom: 6px;
      margin-bottom: 10px;
    }
    .toc-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .toc-item {
      color: var(--el-text-color-regular);
      width: 180px;
      text-decoration: none;
      padding: 6px 8px;
      border-radius: 4px;
      &:hover {
        background-color: var(--el-fill-color-light);
        color: var(--el-color-primary);
      }
    }
  }

  .article {
    flex: 1;

    .tags {
      padding: 6px 0 0 6px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      .tag {
        font-size: 12px;
        background-color: #e2fff4;
        padding: 4px 6px;
        border-radius: 4px;
      }
    }

    .article-content {
      // background-color: rgba(#fafafa, 0.6);
      // border: 1px solid var(--el-border-color-light);
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      padding: 20px;

      .section + .section {
        margin-top: 24px;
      }

      .section-title {
        font-size: 20px;
        font-weight: 600;
        color: var(--el-text-color-primary);
        margin-bottom: 10px;
        scroll-margin-top: 80px;
      }

      .paragraph {
        color: var(--el-text-color-regular);
        line-height: 1.8;
      }
    }

    .not-found {
      padding: 40px;
      text-align: center;
      color: var(--el-text-color-secondary);
    }
  }
}

@media (max-width: 992px) {
  .article-detail-container {
    .content-wrapper {
      flex-direction: column;
    }
    .toc {
      display: none;
    }
  }
}

body[data-theme='dark'] {
  .article-detail-container {
    .article {
      .article-content {
        background-color: rgba(#141414, 0.6);
      }
    }
    .toc {
      background-color: rgba(#141414, 0.6);
    }
  }
}
</style>
