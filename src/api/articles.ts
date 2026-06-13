import http from '@/api/http'

export interface ArticleListItem {
  id: number
  title: string
  description: string
  cover: string
  category_id?: number
  category_name?: string
  tags?: string
  views?: number
  created_at?: string
  updated_at?: string
}

export interface ArticleListResp {
  code: number
  msg: string
  data: { list: ArticleListItem[]; total?: number; page?: number; pageSize?: number }
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

export const getPublishedArticles = (params?: { page?: number; pageSize?: number; category_id?: number; tag_id?: number }) => {
  const p = {
    page: params?.page ?? 1,
    pageSize: params?.pageSize ?? 10,
    category_id: params?.category_id,
    tag_id: params?.tag_id,
  }
  return http.get<ArticleListResp>('/articles/published', { params: p })
}
export const getArticleDetail = (id: number) => http.get<ArticleDetailResp>(`/articles/${id}`)