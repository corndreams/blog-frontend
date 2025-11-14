export const articlesData = [
  {
    id: 1,
    title: 'Vue3 项目结构与代码风格实践',
    time: '2025-10-01',
    tags: ['Vue3', '项目结构', '最佳实践'],
    sections: [
      {
        id: 'intro',
        title: '引言',
        level: 2,
        content: [
          '本文基于当前项目的代码结构与风格，总结了在 Vue3 + Vue Router + Element Plus 环境下的页面拆分与组件复用思路。',
        ],
      },
      {
        id: 'structure',
        title: '项目结构',
        level: 2,
        content: [
          'src/views 放置路由页面，src/components 放置通用组件，src/data 放置静态数据，保持职责清晰。',
          '样式以 scoped + scss 为主，配合 Element Plus 的主题变量实现一致的色彩与暗黑模式。',
        ],
      },
      {
        id: 'toc',
        title: '目录生成',
        level: 2,
        content: ['详情页的目录基于 sections 的标题自动生成，通过锚点实现章节定位与滚动。'],
      },
      {
        id: 'txx',
        title: 'tc',
        level: 2,
        content: [
          '详情页的目录基于 sections 的标题自动生成，通过锚点实现章节定位与滚动。目录项点击后，页面会平滑滚动到对应章节。',
          '目录项点击后，页面会平滑滚动到对应章节。',
          '目录项点击后，页面会平滑滚动到对应章节。',
          '详情页的目录基于 sections 的标题自动生成，通过锚点实现章节定位与滚动。目录项点击后，页面会平滑滚动到对应章节。',
          '目录项点击后，页面会平滑滚动到对应章节。',
          '目录项点击后，页面会平滑滚动到对应章节。',
          '详情页的目录基于 sections 的标题自动生成，通过锚点实现章节定位与滚动。目录项点击后，页面会平滑滚动到对应章节。',
          '目录项点击后，页面会平滑滚动到对应章节。',
          '目录项点击后，页面会平滑滚动到对应章节。',
          '详情页的目录基于 sections 的标题自动生成，通过锚点实现章节定位与滚动。目录项点击后，页面会平滑滚动到对应章节。',
          '目录项点击后，页面会平滑滚动到对应章节。',
          '目录项点击后，页面会平滑滚动到对应章节。',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'CardBox 组件在列表与详情的应用',
    time: '2025-10-05',
    tags: ['组件设计', 'UI', '复用'],
    sections: [
      {
        id: 'usage',
        title: '在列表中的使用',
        level: 2,
        content: ['首页文章列表通过 CardBox 展示标题、摘要、标签与封面图，支持响应式布局。'],
      },
      {
        id: 'improve',
        title: '交互可用性提升',
        level: 2,
        content: ['将卡片包裹在路由链接中，使用户可以直接点击进入文章详情页。'],
      },
    ],
  },
  {
    id: 3,
    title: 'Element Plus 主题与暗黑模式',
    time: '2025-10-10',
    tags: ['Element Plus', '主题', '暗黑模式'],
    sections: [
      {
        id: 'theme',
        title: '主题变量',
        level: 2,
        content: ['通过自定义主题变量，统一全站的主色与文本色，提升一致性。'],
      },
      {
        id: 'dark',
        title: '暗黑模式',
        level: 2,
        content: ['利用 data-theme 切换背景与组件颜色，在不同主题下保持良好可读性。'],
      },
    ],
  },
]

export const getArticleById = (id: number) => {
  return articlesData.find((a) => a.id === id)
}
