<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConflictStore } from '../stores/conflicts'
import { formatDate } from '../utils/format'
import { useI18n } from '../i18n'
import AppShell from '../components/AppShell.vue'
import SectionPanel from '../components/SectionPanel.vue'
import EmptyState from '../components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const store = useConflictStore()
const { t, locale } = useI18n()

const conflictId = computed(() => route.params.id)

onMounted(() => {
  if (!store.conflicts.length) {
    store.fetchConflicts()
  }
})

const conflict = computed(() => store.byId(conflictId.value))

const displayDate = computed(() => formatDate(conflict.value?.startDate, locale.value))

const goBack = () => router.push('/')
</script>

<template>
  <AppShell :title="conflict?.name || 'Conflict detail'" :subtitle="conflict?.description || ''">
    <template #actions>
      <button type="button" class="ghost" @click="goBack">{{ t.detail.back }}</button>
    </template>

    <SectionPanel v-if="conflict" :title="t.detail.context">
      <div class="detail-grid">
        <div class="detail-card">
          <p class="label">{{ t.detail.status }}</p>
          <span class="status" :class="conflict.status?.toLowerCase()">{{
            t.statusNames[conflict.status] || conflict.status
          }}</span>
        </div>
        <div class="detail-card">
          <p class="label">{{ t.detail.start }}</p>
          <p class="value">{{ displayDate }}</p>
        </div>
        <div class="detail-card">
          <p class="label">{{ t.detail.countries }}</p>
          <p class="value">{{ conflict.countryCodes?.join(', ') || '-' }}</p>
        </div>
        <div class="detail-card">
          <p class="label">{{ t.detail.actors }}</p>
          <p class="value">{{ conflict.factionNames?.join(', ') || '-' }}</p>
        </div>
      </div>
    </SectionPanel>

    <EmptyState v-else title="Conflict not found" message="Try returning to the list." />
  </AppShell>
</template>

<style scoped>
button.ghost {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 10px 16px;
  background: #fff;
  cursor: pointer;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.detail-card {
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.8);
}

.label {
  margin: 0 0 8px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.value {
  margin: 0;
  font-weight: 600;
}
</style>
