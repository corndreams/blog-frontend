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
            <div class="group" v-for="(group, gi) in archive.timeArchive" :key="gi">
              <div class="group-head">
                <span class="group-label">{{ group.label }}</span>
                <span class="group-badge">月份</span>
              </div>
              <ul class="group-list">
                <li class="group-item" v-for="(item, ii) in group.items" :key="ii">
                  <span class="dot"></span>
                  <span class="item-title">{{ item.title }}</span>
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
        <div class="category-header">
          <div class="category-title">分类归档</div>
          <el-input v-model="query" placeholder="搜索" clearable class="category-search" />
        </div>
        <div class="category-list">
          <CardBox
            v-for="(c, idx) in filteredCategories"
            :key="idx"
            :width="'100%'"
            :height="'auto'"
          >
            <div class="category-item">
              <img v-if="c.cover" :src="c.cover" class="cover" alt="cover" />
              <div class="meta">
                <div class="name">{{ c.name }}</div>
                <div class="sub">
                  <span class="date">{{ c.date }}</span>
                  <span class="count">{{ c.count }}</span>
                </div>
              </div>
            </div>
          </CardBox>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CardBox from '@/components/CardBox.vue'
import { archiveData, getCategoriesByQuery } from '@/data/archiveData'

const archive = archiveData
const query = ref('')
const filteredCategories = computed(() => getCategoriesByQuery(query.value))
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

    .category-item {
      display: flex;
      align-items: center;
      gap: 12px;
      .cover {
        width: 100px;
        height: 64px;
        object-fit: cover;
        border-radius: 6px;
        box-shadow: 8px 10px 18px rgba(64, 158, 255, 0.25);
      }
      .meta {
        flex: 1;
        .name {
          font-weight: 600;
          color: var(--el-text-color-primary);
        }
        .sub {
          display: flex;
          align-items: center;
          gap: 10px;
          .date {
            color: var(--el-text-color-secondary);
            font-size: 12px;
          }
          .count {
            color: var(--el-text-color-regular);
            font-size: 12px;
          }
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
