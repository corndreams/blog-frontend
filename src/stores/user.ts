import { defineStore } from 'pinia'
import { getUserInfo, type UserInfoResp } from '@/api/users'

export const useUserStore = defineStore('user', {
  state: () => ({ info: null as UserInfoResp['data'] | null, loading: false, error: '' as string }),
  actions: {
    async fetchInfo() {
      this.loading = true
      this.error = ''
      try {
        const resp = await getUserInfo()
        this.info = resp.data.data
      } catch (e: any) {
        this.error = e?.message || 'error'
      } finally {
        this.loading = false
      }
    },
  },
})