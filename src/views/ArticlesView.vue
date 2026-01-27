<template>
  <div class="articles-container">
    <div class="main-content">
      <section class="filters">
        <CardBox :width="'100%'" :height="'auto'" :title="'筛选'">
          <div class="filter-row">
            <el-select v-model="categoryId" placeholder="选择分类" clearable style="width: 220px" @change="reload">
              <el-option v-for="c in categories" :key="c.id" :label="`${c.name} (${c.count})`" :value="c.id" />
            </el-select>
            <el-select v-model="tagId" placeholder="选择标签" clearable style="width: 220px" @change="reload">
              <el-option v-for="t in tags" :key="t.id" :label="`${t.name} (${t.count})`" :value="t.id" />
            </el-select>
            <el-button type="primary" @click="reset">重置</el-button>
          </div>
        </CardBox>
      </section>

      <section class="list">
        <router-link v-for="art in list" :key="art.id" :to="`/article/${art.id}`" class="card-link">
          <CardBox
            :width="'100%'"
            :height="'220px'"
            :title="art.title"
            :description="art.description"
            :img="art.cover"
            :time="art.created_at"
            :category="art.category_name || ''"
            :tags="art.tags ? art.tags.split(',') : []"
            :visits="art.views || 0"
          />
        </router-link>
        <div v-if="!list.length && !loading" class="empty">暂无文章</div>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next, sizes, total"
            :total="total"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 20, 30]"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CardBox from '@/components/CardBox.vue'
import { getPublishedArticles, type ArticleListItem } from '@/api/articles'
import { getCategoryArchive, getTagArchive, type CategoryArchiveItem, type TagArchiveItem } from '@/api/archive'

const list = ref<ArticleListItem[]>([])
const loading = ref(false)
const categoryId = ref<number | undefined>(undefined)
const tagId = ref<number | undefined>(undefined)
const categories = ref<CategoryArchiveItem[]>([])
const tags = ref<TagArchiveItem[]>([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

const fetchList = async () => {
  loading.value = true
  try {
    const resp = await getPublishedArticles({ page: page.value, pageSize: pageSize.value, category_id: categoryId.value, tag_id: tagId.value })
    list.value = resp.data.data.list || []
    total.value = resp.data.data.total ?? list.value.length
  } finally {
    loading.value = false
  }
}

const reload = () => { page.value = 1; fetchList() }
const reset = () => { categoryId.value = undefined; tagId.value = undefined; page.value = 1; fetchList() }

onMounted(async () => {
  const [cResp, tResp] = await Promise.all([getCategoryArchive(), getTagArchive()])
  categories.value = cResp.data.data || []
  tags.value = tResp.data.data || []
  await fetchList()
})

const handlePageChange = (p: number) => { page.value = p; fetchList() }
const handleSizeChange = (s: number) => { pageSize.value = s; page.value = 1; fetchList() }
</script>

<style scoped lang="scss">
.articles-container {
  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  .filters {
    .filter-row {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }
  .list {
    margin-top: 12px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    .card-link { text-decoration: none; display: block; }
    .empty { text-align: center; color: var(--el-text-color-secondary); padding: 20px; }
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin: 12px 0 24px;
  }
}
</style>