<template>
  <div class="card-box" :style="cardStyle">
    <div class="card-text">
      <img
        v-if="img"
        :src="img"
        :alt="title || '文章封面'"
        class="card-img-mobile"
        loading="lazy"
        decoding="async"
      />
      <div class="card-header" v-if="title">
        <div class="card-title">{{ title }}</div>
        <div class="card-time" v-if="time">{{ time }}</div>
        <div class="card-extra" v-if="$slots.extra">
          <slot name="extra"></slot>
        </div>
      </div>
      <div class="card-content">
        <div v-if="description" class="card-description">{{ description }}</div>
        <slot></slot>
        <div class="meta-box" v-if="category || displayTags.length || visits !== undefined">
          <span v-if="category" class="meta-chip">分类：{{ category }}</span>
          <span v-for="t in displayTags" :key="t" class="card-tag" @click.stop="">{{ t }}</span>
          <span v-if="visits !== undefined" class="visit-chip">访问：{{ visits }}</span>
        </div>
      </div>
    </div>
    <div class="card-img-box" v-if="img">
      <img :src="img" :alt="title || '文章封面'" class="card-img" loading="lazy" decoding="async" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  width?: string | number
  height?: string | number
  // padding?: string | number
  background?: string
  borderRadius?: string | number
  description?: string
  img?: string
  tag?: string[]
  time?: string
  category?: string
  tags?: string[]
  visits?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: '100%',
  height: 'auto',
  background: 'var(--paper)',
  borderRadius: '28px',
})

const displayTags = computed(() => (props.tags?.length ? props.tags : props.tag || []))

const cardStyle = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    borderRadius:
      typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius,
  }
})
</script>

<style scoped lang="scss">
.card-box {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--paper) 94%, white), var(--paper)),
    var(--paper-solid);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--line);
  box-sizing: border-box;
  margin-bottom: 18px;
  color: var(--text);
  backdrop-filter: blur(16px);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
    border-color: color-mix(in srgb, var(--accent) 32%, var(--line));
  }

  .card-text {
    width: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 22px;
  }

  .card-img-mobile {
    display: none;
  }

  .card-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: 12px;
    padding-bottom: 14px;
    border-bottom: 1px dashed var(--line);
    margin-bottom: 14px;

    .card-title {
      min-width: 0;
      font-family: var(--serif);
      font-size: clamp(20px, 2.2vw, 28px);
      line-height: 1.22;
      font-weight: 800;
      color: var(--ink);
      overflow-wrap: anywhere;
    }

    .card-time {
      color: var(--muted);
      font-family: var(--mono);
      font-size: 12px;
      white-space: nowrap;
      padding-top: 5px;
    }

    .card-extra {
      grid-column: 1 / -1;
    }
  }

  .card-content {
    color: var(--text);
    width: 100%;
    font-size: 15px;
    line-height: 1.8;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .card-description {
      color: var(--muted);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }

    .meta-box {
      margin-top: 16px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .meta-chip,
    .visit-chip,
    .card-tag {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      padding: 5px 10px;
      font-family: var(--mono);
      font-size: 12px;
      line-height: 1.2;
      border: 1px solid transparent;
    }

    .meta-chip {
      color: var(--accent-deep);
      background: var(--accent-soft);
      border-color: color-mix(in srgb, var(--accent) 34%, transparent);
    }

    .visit-chip {
      color: var(--warm);
      background: color-mix(in srgb, var(--warm) 13%, transparent);
      border-color: color-mix(in srgb, var(--warm) 26%, transparent);
    }

    .card-tag {
      color: color-mix(in srgb, var(--leaf) 75%, var(--ink));
      background: color-mix(in srgb, var(--leaf) 15%, transparent);
      border-color: color-mix(in srgb, var(--leaf) 32%, transparent);
      transition: transform 0.2s ease, background 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        background: color-mix(in srgb, var(--leaf) 24%, transparent);
      }
    }
  }

  .card-img-box {
    width: min(38%, 300px);
    min-width: 220px;
    display: flex;
    padding: 16px 16px 16px 0;

    .card-img {
      width: 100%;
      height: 100%;
      max-height: 220px;
      border-radius: 22px;
      margin: auto;
      object-fit: cover;
      border: 1px solid var(--line);
      box-shadow: 0 12px 30px rgba(71, 58, 37, 0.12);
    }
  }
}

@media screen and (max-width: 700px) {
  .card-box {
    .card-text {
      padding: 16px;
    }

    .card-img-mobile {
      display: block;
      width: 100%;
      max-height: 180px;
      object-fit: cover;
      margin: 0 auto 14px;
      border-radius: 20px;
      border: 1px solid var(--line);
    }

    .card-header {
      grid-template-columns: 1fr;
      gap: 6px;

      .card-title {
        font-size: 21px;
      }

      .card-time {
        padding-top: 0;
        white-space: normal;
      }
    }

    .card-img-box {
      display: none;
    }
  }
}
</style>
