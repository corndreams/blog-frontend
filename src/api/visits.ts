import http from '@/api/http'

export interface VisitStatsResp {
  code: number
  msg: string
  data: {
    total: number
    total_article: number
    total_diary: number
  }
}

export const getVisitStats = () => http.get<VisitStatsResp>('/visits/stats')

export const trackVisit = (path: string) => {
  const form = new URLSearchParams()
  form.set('path', path)
  return http.post<{ code: number; msg: string }>('/visits/track', form)
}