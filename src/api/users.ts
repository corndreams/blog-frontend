import http from '@/api/http'

export interface UserInfoResp {
  code: number
  msg: string
  data: {
    id: number
    user_id: number
    avatar: string
    name: string
    tagline: string
    quote: string
    mbti: string
    mbti_intro: string
    about: string
    created_at?: string
    updated_at?: string
  }
}

export const getUserInfo = () => http.get<UserInfoResp>('/users/info')