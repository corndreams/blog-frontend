import http from '@/api/http'

export interface MessageItem {
  name: string
  content: string
}

export const getAllMessages = () => http.get<{ code: number; msg: string; data: MessageItem[] }>('/messages/all')

export const addMessage = (payload: { name: string; content: string }) => {
  const form = new URLSearchParams()
  form.set('name', payload.name)
  form.set('content', payload.content)
  return http.post<{ code: number; msg: string; data: { id: number } }>('/messages/add', form)
}