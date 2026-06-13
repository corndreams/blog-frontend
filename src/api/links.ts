import http from '@/api/http'

export interface SocialLinkItem {
  id: number
  name: string
  icon: string
  url: string
  created_at: string
  updated_at: string
}

export interface SocialLinksResp {
  code: number
  msg: string
  data: SocialLinkItem[]
}

export const getSocialLinks = () => http.get<SocialLinksResp>('/links')
