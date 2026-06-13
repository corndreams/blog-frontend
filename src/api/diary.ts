import http from '@/api/http'

export interface DiaryItem {
  id: number
  title: string
  content: string
  created_at: string
  updated_at?: string | null
  diary_time: string | null
}

export interface DiaryListResp {
  code: number
  msg: string
  data: { list: DiaryItem[]; total: number; page: number; pageSize: number }
}

export interface DiaryMonthResp {
  code: number
  msg: string
  data: { id: number; day: number }[]
}

export interface DiaryDetailResp {
  code: number
  msg: string
  data: DiaryItem
}

export const getDiaryList = (params: { page?: number; pageSize?: number } = {}) => {
  const { page = 1, pageSize = 10 } = params
  return http.get<DiaryListResp>('/diary', { params: { page, pageSize } })
}

export const getDiaryMonth = (year: number, month: number) => {
  return http.get<DiaryMonthResp>('/diary/time', { params: { year, month } })
}

export const getDiaryDetail = (id: number) => {
  return http.get<DiaryDetailResp>(`/diary/${id}`)
}