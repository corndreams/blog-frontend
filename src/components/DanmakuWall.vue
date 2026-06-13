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
  border: 1px solid var(--line);
  border-radius: 24px;
  background:
    radial-gradient(circle at 16% 18%, var(--accent-soft), transparent 18rem),
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 35px,
      color-mix(in srgb, var(--line) 45%, transparent) 36px
    ),
    var(--paper-soft);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
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
  display: inline-flex;
  align-items: center;
  max-width: min(520px, 80vw);
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--paper) 88%, transparent);
  box-shadow: 0 10px 24px rgba(74, 61, 40, 0.1);
  color: var(--text);
  white-space: nowrap;
}

@keyframes fly {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-150vw);
  }
}
</style>
