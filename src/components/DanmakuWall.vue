<template>
  <div class="wall" :style="{ height: wallHeight }">
    <div
      v-for="(m, i) in styled"
      :key="i + '-' + m.author + '-' + m.content"
      class="item"
      :style="{
        top: m.lane * 44 + 'px',
        animationDuration: m.duration + 's',
        animationDelay: m.delay + 's',
      }"
    >
      <span class="text">{{ m.author }}：{{ m.content }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface WallItem {
  author: string
  content: string
}

interface StyledItem extends WallItem {
  lane: number
  duration: number
  delay: number
}

interface Props {
  items: WallItem[]
  lanes?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), { lanes: 8, height: 320 })

const lanes = props.lanes
const wallHeight = computed(() => `${props.height}px`)

const styled = computed<StyledItem[]>(() => {
  return (props.items || []).map((m, idx) => {
    const lane = idx % lanes
    const duration = 14 + (idx % 5) * 2
    const delay = (idx % 10) * 0.4
    return { ...m, lane, duration, delay }
  })
})
</script>

<style scoped lang="scss">
.wall {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--el-border-color-light);
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(64,158,255,0.08), rgba(255,255,255,0.8));
  box-shadow: 0 8px 24px rgba(64, 158, 255, 0.2);
}
.item {
  position: absolute;
  left: 100%;
  display: inline-flex;
  align-items: center;
  height: 44px;
  animation-name: fly;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.text {
  padding: 8px 12px;
  border-radius: 15px;
  width: 500px;
  // background: #fff;
  // box-shadow: 0 10px 22px rgba(64, 158, 255, 0.25);
  // color: var(--el-text-color-primary);
}
@keyframes fly {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-150vw);
  }
}

body[data-theme='dark'] .wall {
  background-color: rgba(#141414, 0.6);
}
</style>
