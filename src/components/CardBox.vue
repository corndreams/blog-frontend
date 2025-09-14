<template>
  <div class="card-box" :style="cardStyle">
    
    <div class="card-header" v-if="title">
      <div class="card-title">{{ title }}</div>
      <div class="card-extra" v-if="$slots.extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="card-content">
      <div v-if="description">{{ description }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  width?: string | number
  height?: string | number
  padding?: string | number
  background?: string
  borderRadius?: string | number
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: '100%',
  height: 'auto',
  padding: '16px',
  background: 'var(--el-bg-color)',
  borderRadius: '8px',
})

const cardStyle = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    padding: typeof props.padding === 'number' ? `${props.padding}px` : props.padding,
    background: props.background,
    borderRadius:
      typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius,
  }
})
</script>

<style scoped lang="scss">
.card-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid var(--el-border-color-light);
  box-sizing: border-box;
  margin-bottom: 16px;

  &:hover {
    transform: translateY(-3px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    margin-bottom: 12px;

    .card-title {
      font-size: 16px;
      font-weight: bold;
      color: var(--el-text-color-primary);
    }
  }

  .card-content {
    color: var(--el-text-color-regular);
    font-size: 14px;
  }
}
</style>
