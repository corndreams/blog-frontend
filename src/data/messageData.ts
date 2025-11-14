export interface WallItem {
  author: string
  content: string
}

export interface MessageItem {
  id: number
  author: string
  content: string
  date: string
  avatar?: string
}

export const messageData = {
  wall: <WallItem[]>[
    { author: 'Alice', content: '坚持就是胜利' },
    { author: 'Bob', content: '今天也要元气满满' },
    { author: 'Carol', content: '写代码如写诗' },
    { author: 'Dave', content: '但行好事，莫问前程' },
    { author: 'Eve', content: '不积跬步，无以至千里' },
    { author: 'Frank', content: '生活不止眼前的苟且' },
    { author: 'Grace', content: '保持好奇心' },
    { author: 'Heidi', content: '热爱可抵岁月漫长' },
    { author: 'Ivan', content: '少说话，多做事' },
    { author: 'Judy', content: '保持输出，持续成长' },
  ],
  messages: <MessageItem[]>[
    {
      id: 1,
      author: '访客A',
      content: '站点很漂亮，加油',
      date: '2025-10-12',
      avatar: 'https://picsum.photos/seed/ma/40/40',
    },
    {
      id: 2,
      author: '访客B',
      content: '归档页面设计不错',
      date: '2025-10-15',
      avatar: 'https://picsum.photos/seed/mb/40/40',
    },
  ],
}

export const getWallMessages = () => messageData.wall

export const addMessage = (author: string, content: string) => {
  const date = new Date().toISOString().slice(0, 10)
  const id = Date.now()
  const avatar = `https://picsum.photos/seed/${encodeURIComponent(author)}/40/40`
  const item: MessageItem = { id, author, content, date, avatar }
  messageData.messages = [item, ...messageData.messages]
  messageData.wall = [{ author, content }, ...messageData.wall]
  return item
}
