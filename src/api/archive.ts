import http from '@/api/http'

export interface ArchiveArticleItem {
  id: number
  title: string
  description?: string
  cover?: string | null
  category_id?: number
  created_at?: string
}

export interface TimeArchiveMonth {
  month: string
  count: number
  list: ArchiveArticleItem[]
}

export interface TimeArchiveResp {
  code: number
  msg: string
  data: Record<string, TimeArchiveMonth[]>
}

export const getTimeArchive = () => http.get<TimeArchiveResp>('/archive/time')

export interface CategoryArchiveItem {
  id: number
  name: string
  slug: string
  count: number
}

export interface TagArchiveItem {
  id: number
  name: string
  slug: string
  count: number
}

export const getCategoryArchive = () => http.get<{ code: number; msg: string; data: CategoryArchiveItem[] }>('/archive/categories')
export const getTagArchive = () => http.get<{ code: number; msg: string; data: TagArchiveItem[] }>('/archive/tags')