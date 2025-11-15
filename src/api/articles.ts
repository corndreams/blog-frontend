import http from '@/api/http'

export interface ArticleListItem {
  id: number
  title: string
  description: string
  cover: string
  category_id?: number
  category_name?: string
  views?: number
  created_at?: string
  updated_at?: string
}

export interface ArticleListResp {
  code: number
  msg: string
  data: { list: ArticleListItem[] }
}

export interface ArticleDetailResp {
  code: number
  msg: string
  data: {
    id: number
    title: string
    description: string
    content: string
    cover: string
    category_id?: number
    category_name?: string
    views?: number
    created_at?: string
    updated_at?: string
    tags?: { id: number; name: string }[]
  }
}

export const getPublishedArticles = () => http.get<ArticleListResp>('/articles/published')
export const getArticleDetail = (id: number) => http.get<ArticleDetailResp>(`/articles/${id}`)