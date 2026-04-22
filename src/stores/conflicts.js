import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL
const CONFLICTS_ENDPOINT = `${API_URL}/v1/conflicts`

export const useConflictStore = defineStore('conflicts', {
  state: () => ({
    conflicts: [],
    loading: false,
    error: null,
    readIds: new Set(),
    apiBaseUrl: CONFLICTS_ENDPOINT
  }),
  getters: {
    totalCount: (state) => state.conflicts.length,
    activeCount: (state) => state.conflicts.filter((c) => c.status === 'ACTIVE').length,
    frozenCount: (state) => state.conflicts.filter((c) => c.status === 'FROZEN').length,
    resolvedCount: (state) => state.conflicts.filter((c) => c.status === 'RESOLVED').length,
    byId: (state) => (id) => state.conflicts.find((c) => String(c.id) === String(id)),
    isRead: (state) => (id) => state.readIds.has(String(id))
  },
  actions: {
    async fetchConflicts() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(this.apiBaseUrl)
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        const data = await response.json()
        this.conflicts = Array.isArray(data) ? data : []
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    markRead(id) {
      this.readIds.add(String(id))
    },
    toggleRead(id) {
      const key = String(id)
      if (this.readIds.has(key)) {
        this.readIds.delete(key)
      } else {
        this.readIds.add(key)
      }
    },
    async dismissConflict(id) {
      const key = String(id)
      this.error = null
      try {
        const response = await fetch(`${this.apiBaseUrl}/${key}`, {
          method: 'DELETE'
        })
        if (!response.ok) {
          throw new Error(`Delete error: ${response.status}`)
        }
        this.conflicts = this.conflicts.filter((c) => String(c.id) !== key)
        this.readIds.delete(key)
      } catch (error) {
        this.error = error
      }
    },
    async addConflict(payload) {
      this.error = null
      try {
        const response = await fetch(this.apiBaseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        if (!response.ok) {
          throw new Error(`Save error: ${response.status}`)
        }
        const saved = await response.json()
        this.conflicts.unshift(saved)
      } catch (error) {
        this.error = error
      }
    }
  }
})
