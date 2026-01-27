<template>
  <div class="archive-container">
    <div class="main-content">
      <!-- 左：时间归档 / 时间轴 -->
      <CardBox :width="'auto'" :height="'auto'" >
      <section class="time-section">
        <div class="time-title">时间归档</div>
        <div class="timeline">
          <div class="line"></div>
          <div class="groups">
            <div class="group" v-for="(group, gi) in timeGroups" :key="gi">
              <div class="group-head">
                <span class="group-label">{{ group.label }}</span>
                <span class="group-badge">月份</span>
              </div>
              <ul class="group-list">
                <li class="group-item" v-for="(item, ii) in group.items" :key="ii">
                  <span class="dot"></span>
                  <router-link :to="`/article/${item.id}`" class="item-title">{{ item.title }}</router-link>
                  <span class="item-date">{{ item.date }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </CardBox>

      <!-- 右：分类归档 -->
      <section class="category-section">
      <CardBox>
        <div class="category-header">
          <div class="category-title">分类归档</div>
          <!-- <el-input v-model="query" placeholder="搜索分类" clearable class="category-search" /> -->
        </div>
        <div class="category-grid">
          <CardBox
            v-for="(c, idx) in filteredCategories"
            :key="idx"
            :width="'100%'"
            :height="'auto'"
          >
            <div class="category-card">
              <div class="name">{{ c.name }}</div>
              <div class="count">{{ c.count }}</div>
            </div>
          </CardBox>
        </div>
        </CardBox>
        <CardBox>
        <div class="tags-section">
          <div class="tags-title">标签归档</div>
          <div class="tag-list">
            <span class="tag" v-for="(t, i) in tags" :key="i">{{ t.name }}<em class="tag-count">{{ t.count }}</em></span>
          </div>
        </div>
        </CardBox>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,computed, onMounted } from 'vue'
import CardBox from '@/components/CardBox.vue'
import { getTimeArchive, getCategoryArchive, getTagArchive, type CategoryArchiveItem, type TagArchiveItem } from '@/api/archive'

const query = ref('')
const categories = ref<CategoryArchiveItem[]>([])
const tags = ref<TagArchiveItem[]>([])
const filteredCategories = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return categories.value
  return categories.value.filter((c) => c.name.toLowerCase().includes(q))
})

type TimeGroup = { label: string; items: { id: number; title: string; date: string }[] }
const timeGroups = ref<TimeGroup[]>([])

const loadTimeArchive = async () => {
  const resp = await getTimeArchive()
  const data = resp.data.data || {}
  const groups: TimeGroup[] = []
  Object.keys(data).forEach((year) => {
    data[year].forEach((m) => {
      const label = `${year}年 · ${m.month}月`
      const items = (m.list || []).map((a) => ({ id: a.id, title: a.title, date: a.created_at || '' }))
      groups.push({ label, items })
    })
  })
  timeGroups.value = groups
}

onMounted(loadTimeArchive)
onMounted(async () => {
  const [cResp, tResp] = await Promise.all([getCategoryArchive(), getTagArchive()])
  categories.value = cResp.data.data || []
  tags.value = tResp.data.data || []
})
</script>

<style scoped lang="scss">
.archive-container {
  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    gap: 20px;
  }

  .time-section {
    flex: 2;
    // background-color: rgba(#fafafa, 0.6);
    // border: 1px solid var(--el-border-color-light);
    // border-radius: 8px;
    padding-right: 16px;
    min-height: 700px;

    .time-title {
      font-weight: bold;
      font-size: 18px;
      color: var(--el-text-color-primary);
      margin-bottom: 10px;
    }

    .timeline {
      position: relative;
      padding-left: 80px;

      .line {
        position: absolute;
        left: 30px;
        top: 0;
        bottom: 0;
        width: 4px;
        border-radius: 2px;
        background: linear-gradient(
          to bottom,
          var(--el-color-primary),
          var(--el-border-color-lighter)
        );
      }

      .groups {
        margin-left: -25px;
        .group {
          margin-bottom: 18px;

          .group-head {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
            position: relative;

            .group-label {
              color: var(--el-text-color-regular);
            }
            .group-badge {
              background-color: var(--el-color-primary);
              color: #fff;
              padding: 6px 10px;
              border-radius: 999px;
              font-size: 12px;
              box-shadow: 0 8px 20px rgba(64, 158, 255, 0.35);
            }
          }

          .group-list {
            list-style: none;
            padding: 0;
            margin: 0;

            .group-item {
              display: grid;
              grid-template-columns: 20px 1fr auto;
              align-items: center;
              gap: 10px;
              padding: 8px 0;
              border-bottom: 1px dotted var(--el-border-color-lighter);

              .dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: var(--el-color-primary);
                box-shadow: 0 6px 14px rgba(64, 158, 255, 0.3);
              }
              .item-title {
                color: var(--el-text-color-primary);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .item-date {
                color: var(--el-text-color-secondary);
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

  .category-section {
    flex: 1.5;

    .category-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .category-title {
        font-weight: bold;
        font-size: 18px;
        color: var(--el-text-color-primary);
      }

      .category-search {
        width: 160px;
      }
    }

    .category-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .category-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      .name {
        font-weight: 600;
        color: var(--el-text-color-primary);
      }
      .count {
        color: var(--el-text-color-secondary);
        font-size: 12px;
      }
    }

    .tags-section {
      margin-top: 16px;
      .tags-title {
        font-weight: bold;
        font-size: 16px;
        color: var(--el-text-color-primary);
        margin-bottom: 8px;
      }
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .tag {
        background-color: #e2fff4;
        padding: 4px 8px;
        border-radius: 16px;
        font-size: 12px;
        color: var(--el-text-color-primary);
        .tag-count {
          margin-left: 6px;
          color: var(--el-text-color-secondary);
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .archive-container {
    .main-content {
      flex-direction: column;
    }
  }
}

body[data-theme='dark'] {
  .archive-container {
    .time-section {
      background-color: rgba(#141414, 0.6);
    }
  }
}
</style>
