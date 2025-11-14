export interface TimeArchiveItem {
  title: string
  date: string
  reads: number
}

export interface TimeArchiveGroup {
  label: string
  items: TimeArchiveItem[]
}

export interface CategoryArchiveItem {
  name: string
  date: string
  count: number
  cover?: string
}

export const archiveData = {
  timeArchive: <TimeArchiveGroup[]>[
    {
      label: '2025年 · 10月',
      items: [
        { title: 'Vue3 项目结构与代码风格实践', date: '2025-10-01', reads: 206 },
        { title: 'CardBox 组件在列表与详情的应用', date: '2025-10-05', reads: 265 },
        { title: 'Element Plus 主题与暗黑模式', date: '2025-10-10', reads: 205 },
      ],
    },
    {
      label: '2025年 · 09月',
      items: [
        { title: '归档页面设计思路', date: '2025-09-20', reads: 225 },
        { title: '首页布局与响应式优化', date: '2025-09-18', reads: 265 },
        { title: '导航栏交互与暗黑模式', date: '2025-09-15', reads: 206 },
      ],
    },
  ],
  categoryArchive: <CategoryArchiveItem[]>[
    {
      name: '前端工程化',
      date: '2025-10-01',
      count: 77,
      cover: 'https://picsum.photos/seed/fe1/120/80',
    },
    {
      name: 'UI/UX 设计',
      date: '2025-10-05',
      count: 97,
      cover: 'https://picsum.photos/seed/uiux/120/80',
    },
    {
      name: '组件复用',
      date: '2025-10-10',
      count: 53,
      cover: 'https://picsum.photos/seed/cmp/120/80',
    },
    {
      name: '性能优化',
      date: '2025-09-18',
      count: 59,
      cover: 'https://picsum.photos/seed/perf/120/80',
    },
    {
      name: '样式与主题',
      date: '2025-09-15',
      count: 31,
      cover: 'https://picsum.photos/seed/theme/120/80',
    },
  ],
}

export const getCategoriesByQuery = (q: string) => {
  const query = q.trim().toLowerCase()
  if (!query) return archiveData.categoryArchive
  return archiveData.categoryArchive.filter((c) => c.name.toLowerCase().includes(query))
}
