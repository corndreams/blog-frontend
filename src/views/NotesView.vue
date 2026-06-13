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
        <CardBox :width="'100%'" :height="'auto'" :title="detail?.title" :time="detailTime" class="diary-card">
          <div class="note-content" v-if="detail">
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
    max-width: var(--max);
    margin: 0 auto;
    padding: 30px 20px 24px;
    display: grid;
    grid-template-columns: 380px minmax(0, 1fr);
    gap: 24px;
    align-items: start;
  }

  .left-panel {
    position: sticky;
    top: 100px;
  }

  .panel-switch {
    padding: 2px 0 16px;
    border-bottom: 1px dashed var(--line);
    margin-bottom: 16px;

    :deep(.el-radio-button__inner) {
      border-color: var(--line);
      background: var(--paper-soft);
      color: var(--muted);
    }

    :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
      background: var(--accent-deep);
      border-color: var(--accent-deep);
      color: var(--paper-solid);
      box-shadow: none;
    }
  }

  .calendar-box {
    :deep(.el-calendar) {
      border: none;
      background: transparent;

      .el-calendar__header {
        padding: 0 0 14px;
        border-bottom: 1px dashed var(--line);
      }

      .el-calendar__title {
        color: var(--ink);
        font-family: var(--serif);
        font-weight: 800;
      }

      .el-button {
        border-radius: 999px;
        background: var(--paper-soft);
        border-color: var(--line);
        color: var(--text);
      }

      .el-calendar__body {
        padding: 14px 0 0;
      }

      .el-calendar-table th {
        color: var(--muted);
        font-family: var(--mono);
        font-size: 11px;
      }

      .el-calendar-day {
        padding: 3px;
      }
    }

    .date-cell {
      width: 100%;
      min-height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 13px;
      cursor: pointer;
      color: var(--muted);
      font-family: var(--mono);
      transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease;

      &:hover {
        transform: translateY(-1px);
        background: color-mix(in srgb, var(--accent) 10%, transparent);
      }

      &.active {
        background: var(--accent-soft);
        color: var(--accent-deep);
        font-weight: 800;
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 36%, transparent);
      }

      &.today {
        border: 1px solid var(--warm);
        color: var(--warm);
      }
    }
  }

  .list-box {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .note-item {
      padding: 14px 16px;
      border: 1px solid var(--line);
      border-radius: 20px;
      background: color-mix(in srgb, var(--paper-soft) 88%, transparent);
      cursor: pointer;
      transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        background: var(--accent-soft);
        border-color: color-mix(in srgb, var(--accent) 40%, var(--line));
      }

      .note-time {
        color: var(--accent-deep);
        font-family: var(--mono);
        font-size: 12px;
      }

      .note-title {
        margin-top: 7px;
        font-family: var(--serif);
        font-size: 19px;
        font-weight: 800;
        color: var(--ink);
      }

      .note-snippet {
        margin-top: 6px;
        color: var(--muted);
        line-height: 1.7;
      }
    }

    .load-more {
      text-align: center;
      color: var(--faint);
      font-family: var(--mono);
      padding: 8px;
    }
  }

  .right-panel {
    min-width: 0;

    :deep(.diary-card.card-box) {
      background:
        repeating-linear-gradient(
          to bottom,
          transparent 0,
          transparent 35px,
          color-mix(in srgb, var(--line) 52%, transparent) 36px
        ),
        var(--paper);
    }

    :deep(.diary-card .card-header) {
      position: relative;
      padding-left: 86px;
      min-height: 76px;

      &::before {
        content: '日记';
        position: absolute;
        left: 0;
        top: 0;
        width: 64px;
        height: 64px;
        display: grid;
        place-items: center;
        border: 2px solid color-mix(in srgb, var(--warm) 70%, transparent);
        border-radius: 50%;
        color: var(--warm);
        font-family: var(--serif);
        font-weight: 800;
        transform: rotate(-10deg);
      }
    }

    .note-content {
      color: var(--text);
      font-family: var(--serif);
      font-size: 18px;
      line-height: 2;
      padding: 8px 6px 20px;

      :deep(p) {
        margin: 1em 0;
      }

      :deep(img) {
        max-width: 100%;
        border-radius: 20px;
        border: 1px solid var(--line);
        box-shadow: var(--shadow-soft);
      }

      :deep(blockquote) {
        margin: 22px 0;
        padding: 16px 20px;
        border-left: 4px solid var(--accent);
        border-radius: 0 18px 18px 0;
        background: var(--accent-soft);
      }
    }

    .empty {
      color: var(--muted);
      text-align: center;
      padding: 60px 20px;
      border: 1px dashed var(--line);
      border-radius: 22px;
      background: color-mix(in srgb, var(--paper-soft) 72%, transparent);
    }
  }
}

@media (max-width: 992px) {
  .notes-container {
    .main-content {
      grid-template-columns: 1fr;
    }

    .left-panel {
      position: static;
    }
  }
}

@media (max-width: 576px) {
  .notes-container {
    .main-content {
      padding-inline: 14px;
    }

    .right-panel :deep(.diary-card .card-header) {
      padding-left: 0;

      &::before {
        display: none;
      }
    }
  }
}
</style>

<style>
.el-calendar-table .el-calendar-day {
  width: 100%;
  height: auto;
  min-height: 42px;
  text-align: center;
}
</style>
