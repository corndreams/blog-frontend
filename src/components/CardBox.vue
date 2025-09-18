<template>
  <div class="card-box" :style="cardStyle">
    <div class="card-text" :style="{ padding: padding }">
      <div class="card-header" v-if="title">
        <div class="card-title">{{ title }}</div>
        <div class="card-time" v-if="time">{{ time }}</div>
        <div class="card-extra" v-if="$slots.extra">
          <slot name="extra"></slot>
        </div>
      </div>
      <div class="card-content">
        <div v-if="description">{{ description }}</div>
        <slot></slot>
        <div class="card-tag-box" v-if="tag">
          <span class="card-tag" v-for="item in tag" :key="item">{{ item }}</span>
        </div>
      </div>
    </div>
    <img v-if="img" :src="img" alt="" class="card-img" />
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
  img?: string
  tag?: string[]
  time?: string
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
    // padding: typeof props.padding === 'number' ? `${props.padding}px` : props.padding,
    background: props.background,
    borderRadius:
      typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius,
  }
})
</script>

<style scoped lang="scss">
.card-box {
  display: flex;
  justify-content: space-between;
  background-color: rgba(var(--el-bg-color), 0.5);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid var(--el-border-color-light);
  box-sizing: border-box;
  margin-bottom: 16px;

  &:hover {
    transform: translateY(-3px);
  }

  .card-text {
    width: 100%;
    display: flex;
    flex-direction: column;
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

    .card-time{
      font-size: 12px;
      color: var(--el-text-color-regular);
    }
  }

  .card-content {
    color: var(--el-text-color-regular);
    width: 100%;
    font-size: 14px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .card-tag-box {
      display: flex;
      flex-wrap: wrap;
      .card-tag {
        margin-right: 8px;
      }
    }

    .card-tag {
      display: inline;
      border-radius: 5px;
      font-size: 12px;
      position: relative;
      bottom: 0;
      // color: var(--el-text-color-regular);
      // background-color: var(--el-bg-color);
      background-color: #e2fff4;
      // background-color: #2f3835;
      padding: 4px 6px;
      border-radius: 4px;
      &:hover {
        transform: translateY(-2px);
        background-color: #cdf5e6;
      }
    }
  }

  .card-img {
    // height: v100%;
    border-radius: 5px;
    padding: 5px;
  }
}

body[data-theme='dark'] {
  .card-content {
    .card-tag {
      background-color: #2f3835;
      &:hover {
        background-color: #3a4341;
      }
    }
  }
}
</style>
