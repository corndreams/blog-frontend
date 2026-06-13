import http from '@/api/http'

export interface CommentItem {
  id: number
  article_id: number
  user_id?: number | null
  name: string
  content: string
  parent_id?: number | null
  link?: string | null
  ip?: string | null
  avatar?: string | null
  created_at?: string
  updated_at?: string | null
  article_title?: string
  children_count?: number
  children?: CommentItem[]
}

export interface AddCommentResp {
  code: number
  msg: string
  data: { id: number }
}

export const getCommentsTree = (article_id: number) => {
  return http.get<{ code: number; msg: string; data: CommentItem[] }>(`/comments/tree/${article_id}`)
}

export const addComment = (payload: {
  article_id: number
  name: string
  content: string
  parent_id?: number | null
  link?: string | null
  avatar?: string | null
}) => {
  const form = new URLSearchParams()
  form.set('article_id', String(payload.article_id))
  form.set('name', payload.name)
  form.set('content', payload.content)
  if (payload.parent_id != null) form.set('parent_id', String(payload.parent_id))
  if (payload.link) form.set('link', payload.link)
  if (payload.avatar) form.set('avatar', payload.avatar)
  return http.post<AddCommentResp>('/comments/add', form)
}