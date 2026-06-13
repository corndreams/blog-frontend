import { defineStore } from 'pinia'
import { getPublishedArticles, type ArticleListItem, type ArticleListResp } from '@/api/articles'

export const useArticlesStore = defineStore('articles', {
  state: () => ({ list: [] as ArticleListItem[], loading: false, error: '' as string }),
  actions: {
    async fetchPublished() {
      this.loading = true
      this.error = ''
      try {
        const resp = await getPublishedArticles()
        this.list = resp.data?.data?.list || []
      } catch (e: any) {
        this.error = e?.message || 'error'
      } finally {
        this.loading = false
      }
    },
  },
})