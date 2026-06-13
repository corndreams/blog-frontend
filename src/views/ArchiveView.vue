<template>
  <div class="archive-container">
    <div class="main-content">
      <!-- 左：时间归档 / 时间轴 -->
      <CardBox :width="'auto'" :height="'auto'" class="archive-card">
        <section class="time-section">
          <div class="time-title">时间归档</div>
          <div class="timeline">
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
import { ref, computed, onMounted } from 'vue'
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
    max-width: var(--max);
    margin: 0 auto;
    padding: 30px 20px 24px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 24px;
    align-items: start;
  }

  :deep(.archive-card.card-box) {
    margin-bottom: 0;
  }

  .time-section {
    min-height: 680px;

    .time-title {
      font-family: var(--serif);
      font-weight: 900;
      font-size: clamp(30px, 4vw, 46px);
      color: var(--ink);
      margin-bottom: 24px;
    }

    .timeline {
      position: relative;
    }

    .groups {
      display: grid;
      gap: 18px;

      .group {
        display: grid;
        grid-template-columns: 150px minmax(0, 1fr);
        gap: 18px;
        padding: 18px;
        border: 1px solid var(--line);
        border-radius: 24px;
        background: color-mix(in srgb, var(--paper-soft) 76%, transparent);
      }

      .group-head {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;

        .group-label {
          color: var(--ink);
          font-family: var(--serif);
          font-size: 22px;
          font-weight: 800;
          line-height: 1.2;
        }

        .group-badge {
          background: var(--accent-soft);
          color: var(--accent-deep);
          padding: 6px 10px;
          border-radius: 999px;
          font-family: var(--mono);
          font-size: 12px;
          border: 1px solid color-mix(in srgb, var(--accent) 32%, transparent);
        }
      }

      .group-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 8px;

        .group-item {
          display: grid;
          grid-template-columns: 18px minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px dashed var(--line);

          &:last-child {
            border-bottom: none;
          }

          .dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background-color: var(--accent);
            box-shadow: 0 0 0 5px var(--accent-soft);
          }

          .item-title {
            color: var(--text);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-decoration: none;
            font-weight: 650;

            &:hover {
              color: var(--accent-deep);
            }
          }

          .item-date {
            color: var(--muted);
            font-family: var(--mono);
            font-size: 12px;
          }
        }
      }
    }
  }

  .category-section {
    position: sticky;
    top: 100px;

    :deep(.card-box .card-box) {
      box-shadow: none;
      margin-bottom: 0;
      background: var(--paper-soft);
    }

    .category-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;

      .category-title {
        font-family: var(--serif);
        font-weight: 800;
        font-size: 24px;
        color: var(--ink);
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
      gap: 10px;
      padding: 2px;

      .name {
        font-weight: 700;
        color: var(--text);
      }

      .count {
        min-width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        color: var(--accent-deep);
        font-family: var(--mono);
        font-size: 12px;
        border-radius: 50%;
        background: var(--accent-soft);
      }
    }

    .tags-section {
      .tags-title {
        font-family: var(--serif);
        font-weight: 800;
        font-size: 22px;
        color: var(--ink);
        margin-bottom: 12px;
      }

      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .tag {
        display: inline-flex;
        align-items: center;
        background: color-mix(in srgb, var(--leaf) 16%, transparent);
        border: 1px solid color-mix(in srgb, var(--leaf) 34%, transparent);
        padding: 6px 10px;
        border-radius: 999px;
        font-family: var(--mono);
        font-size: 12px;
        color: color-mix(in srgb, var(--leaf) 72%, var(--ink));

        .tag-count {
          margin-left: 6px;
          color: var(--muted);
          font-style: normal;
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .archive-container {
    .main-content {
      grid-template-columns: 1fr;
    }

    .category-section {
      position: static;
    }
  }
}

@media (max-width: 640px) {
  .archive-container {
    .main-content {
      padding-inline: 14px;
    }

    .time-section .groups .group {
      grid-template-columns: 1fr;
    }

    .time-section .groups .group-list .group-item {
      grid-template-columns: 18px minmax(0, 1fr);

      .item-date {
        grid-column: 2;
      }
    }
  }
}
</style>
