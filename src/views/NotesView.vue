<template>
  <div class="notes-container">
    <div class="main-content">
      <section class="left-panel">
        <CardBox :width="'100%'" :height="'auto'" :title="'随笔随记'">
          <div class="panel-switch">
            <el-radio-group v-model="mode" size="small">
              <el-radio-button label="日历" />
              <el-radio-button label="列表" />
            </el-radio-group>
          </div>
          <div v-if="mode === '日历'" class="calendar-box">
            <el-calendar v-model="calendarDate">
              <template #date-cell="{ data }">
                <div
                  class="date-cell"
                  :class="{ active: isNoteDate(data.day), today: isToday(data.day) }"
                  @click="selectDate(data.day)"
                >
                  {{ formatDay(data.day) }}
                </div>
              </template>
            </el-calendar>
          </div>
          <div v-else class="list-box">
            <div class="note-item" v-for="n in list" :key="n.id" @click="selectId(n.id)">
              <div v-if="isNoteDate(n.diary_time || n.created_at.slice(0, 10))" class="note-time">{{ n.diary_time || n.created_at.slice(0, 16).replace('T', ' ') }}</div>
              <div v-else class="note-time">{{ n.created_at.slice(0, 16).replace('T', ' ') }}</div>
              <div class="note-title">{{ n.title }}</div>
              <div class="note-snippet" v-html="n.content.slice(0, 60) + '...'"></div>
            </div>
            <div class="load-more">加载更多</div>
          </div>
        </CardBox>
      </section>

      <section class="right-panel">
        <CardBox :width="'100%'" :height="'auto'" :title="detail?.title" :time="detailTime">
          <div class="note-content" v-if="detail" >
            <!-- <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p> -->
            <div v-html="detail.content"></div>
          </div>
          <div v-else class="empty">请选择日期或左侧条目</div>
        </CardBox>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CardBox from '@/components/CardBox.vue'
import { getDiaryList, getDiaryMonth, getDiaryDetail } from '@/api/diary'

const mode = ref<'日历' | '列表'>('日历')

const route = useRoute()
const router = useRouter()

const calendarDate = ref(new Date())
const year = computed(() => calendarDate.value.getFullYear())
const month = computed(() => calendarDate.value.getMonth() + 1)

const monthDays = ref<{ id: number; day: number }[]>([])
const dateIdMap = computed<Record<string, number>>(() => {
  const y = year.value
  const m = `${month.value}`.padStart(2, '0')
  const map: Record<string, number> = {}
  monthDays.value.forEach((d) => {
    const day = `${d.day}`.padStart(2, '0')
    map[`${y}-${m}-${day}`] = d.id
  })
  return map
})

const list = ref<{ id: number; title: string; content: string; created_at: string; diary_time: string | null }[]>([])
const detail = ref<{ id: number; title: string; content: string; created_at: string; diary_time: string | null } | null>(null)

const isNoteDate = (day: string) => !!dateIdMap.value[day]
const isToday = (day: string) => day === new Date().toISOString().slice(0, 10)
const selectDate = (day: string) => {
  const id = dateIdMap.value[day]
  if (!id) return
  router.push(`/notes/${id}`)
}
const selectId = (id: number) => {
  router.push(`/notes/${id}`)
}

const detailTime = computed(() => detail.value?.diary_time || detail.value?.created_at?.slice(0, 16).replace('T', ' ') || '')
// const paragraphs = computed(() => (detail.value?.content || '').split(/\n+/))

const formatDay = (day: string) => day.slice(-2)

const loadMonth = async () => {
  const resp = await getDiaryMonth(year.value, month.value)
  monthDays.value = resp.data.data || []
}

const loadList = async () => {
  const resp = await getDiaryList({ page: 1, pageSize: 10 })
  list.value = resp.data.data.list || []
}

const loadDetail = async (id: number) => {
  const resp = await getDiaryDetail(id)
  detail.value = resp.data.data
}

onMounted(async () => {
  await Promise.all([loadMonth(), loadList()])
  const initId = route.params.id ? Number(route.params.id) : undefined
  if (initId) await loadDetail(initId)
})

watch([year, month], () => {
  loadMonth()
})

watch(
  () => route.params.id,
  (val) => {
    if (val) loadDetail(Number(val))
    else detail.value = null
  }
)
</script>

<style scoped lang="scss">
.notes-container {
  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 20px;
  }

  .panel-switch {
    padding: 8px 0 12px 0;
  }

  .calendar-box {
    :deep(.el-calendar) {
      border: none;
      .el-calendar__body {
        padding: 0 8px 8px;
      }
    }
    .date-cell {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      cursor: pointer;
      &.active {
        background: #e2fff4;
        color: var(--el-color-primary);
        font-weight: 600;
      }
      &.today {
        border: 1px solid var(--el-color-primary);
      }
    }
  }

  .list-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .note-item {
      padding: 10px 12px;
      border: 1px solid var(--el-border-color-lighter);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.85);
      cursor: pointer;
      &:hover {
        background: rgba(255, 255, 255, 0.95);
      }
      .note-time {
        color: var(--el-text-color-secondary);
        font-size: 12px;
      }
      .note-title {
        margin-top: 6px;
        font-weight: 600;
        color: var(--el-text-color-primary);
      }
      .note-snippet {
        margin-top: 6px;
        color: var(--el-text-color-regular);
      }
    }
    .load-more {
      text-align: center;
      color: var(--el-text-color-secondary);
      padding: 8px;
    }
  }

  .right-panel {
    .note-content {
      line-height: 1.8;
      color: var(--el-text-color-regular);
    }
    .empty {
      color: var(--el-text-color-secondary);
      text-align: center;
      padding: 20px;
    }
  }
}

@media (max-width: 992px) {
  .notes-container {
    .main-content {
      grid-template-columns: 1fr;
    }
  }
}

body[data-theme='dark'] .notes-container {
  .list-box .note-item {
    background: rgba(20, 20, 20, 0.8);
  }
}
</style>

<style>
.el-calendar-table .el-calendar-day {
  width: 100%;
  height: auto;
  text-align: center;
}
</style>
