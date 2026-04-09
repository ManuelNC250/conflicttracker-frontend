<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useConflictStore } from '../stores/conflicts'
import { formatDate, normalizeText } from '../utils/format'
import { useI18n } from '../i18n'
import AppShell from '../components/AppShell.vue'
import SectionPanel from '../components/SectionPanel.vue'
import ConflictFilters from '../components/ConflictFilters.vue'
import ConflictCard from '../components/ConflictCard.vue'
import StatPill from '../components/StatPill.vue'
import EmptyState from '../components/EmptyState.vue'

const store = useConflictStore()
const search = ref('')
const status = ref('ALL')
const showForm = ref(false)

const form = reactive({
  name: '',
  startDate: '',
  status: 'ACTIVE',
  description: '',
  countryCodes: '',
  factionNames: ''
})

const { t, locale, toggleLocale } = useI18n()

onMounted(() => {
  if (!store.conflicts.length) {
    store.fetchConflicts()
  }
})

const stats = computed(() => [
  { label: t.value.labels.total, value: store.totalCount, tone: 'neutral' },
  { label: t.value.labels.active, value: store.activeCount, tone: 'active' },
  { label: t.value.labels.frozen, value: store.frozenCount, tone: 'frozen' },
  { label: t.value.labels.resolved, value: store.resolvedCount, tone: 'resolved' }
])

const filteredConflicts = computed(() => {
  const term = normalizeText(search.value)
  return store.conflicts
    .filter((conflict) => (status.value === 'ALL' ? true : conflict.status === status.value))
    .filter((conflict) => {
      if (!term) return true
      const haystack = [
        conflict.name,
        conflict.description,
        ...(conflict.factionNames || []),
        ...(conflict.countryCodes || [])
      ]
        .map(normalizeText)
        .join(' ')
      return haystack.includes(term)
    })
    .map((conflict) => ({
      ...conflict,
      displayDate: formatDate(conflict.startDate, locale.value)
    }))
})

const handleAdd = async () => {
  if (!form.name || !form.startDate) return
  await store.addConflict({
    name: form.name,
    startDate: form.startDate,
    status: form.status,
    description: form.description || '-',
    countryCodes: form.countryCodes.split(',').map((item) => item.trim()).filter(Boolean),
    factionNames: form.factionNames.split(',').map((item) => item.trim()).filter(Boolean)
  })
  if (!store.error) {
    Object.assign(form, {
      name: '',
      startDate: '',
      status: 'ACTIVE',
      description: '',
      countryCodes: '',
      factionNames: ''
    })
    showForm.value = false
  }
}
</script>

<template>
  <AppShell :title="t.title" :subtitle="t.subtitle">
    <template #actions>
      <div class="lang-switch">
        <button type="button" @click="toggleLocale">
          {{ locale === 'ca' ? 'EN' : 'CA' }}
        </button>
      </div>
    </template>

    <SectionPanel :title="t.filters.title" :subtitle="t.filters.subtitle">
      <ConflictFilters v-model="search" v-model:status="status" />
    </SectionPanel>

    <SectionPanel :title="t.stats.title" :subtitle="t.stats.subtitle">
      <div class="stats-grid">
        <StatPill
          v-for="item in stats"
          :key="item.label"
          :label="item.label"
          :value="item.value"
          :tone="item.tone"
        />
      </div>
      <template #actions>
        <div class="panel-actions">
          <button type="button" class="ghost" @click="store.fetchConflicts()">
            {{ t.actions.refresh }}
          </button>
          <button type="button" class="solid" @click="showForm = !showForm">
            {{ t.actions.add }}
          </button>
        </div>
      </template>
    </SectionPanel>

    <SectionPanel :title="t.list.title" :subtitle="t.list.subtitle">
      <div v-if="showForm" class="form surface">
        <form @submit.prevent="handleAdd">
          <div class="form-grid">
            <label>
              {{ t.form.name }}
              <input v-model="form.name" type="text" placeholder="Mediterranean Crisis" />
            </label>
            <label>
              {{ t.form.startDate }}
              <input v-model="form.startDate" type="date" />
            </label>
            <label>
              {{ t.form.status }}
              <select v-model="form.status">
                <option value="ACTIVE">{{ t.statusNames.ACTIVE }}</option>
                <option value="FROZEN">{{ t.statusNames.FROZEN }}</option>
                <option value="RESOLVED">{{ t.statusNames.RESOLVED }}</option>
              </select>
            </label>
            <label>
              {{ t.form.description }}
              <input v-model="form.description" type="text" placeholder="Short summary" />
            </label>
            <label>
              {{ t.form.countries }}
              <input v-model="form.countryCodes" type="text" placeholder="ES, FR" />
            </label>
            <label>
              {{ t.form.factions }}
              <input v-model="form.factionNames" type="text" placeholder="Navy, Coast Guard" />
            </label>
          </div>
          <button type="submit" class="solid">{{ t.form.save }}</button>
        </form>
      </div>

      <div v-if="store.loading" class="loading">{{ t.messages.loading }}</div>
      <div v-else-if="store.error" class="error">
        {{ store.error.message || t.messages.loadError }}
      </div>
      <EmptyState
        v-else-if="!filteredConflicts.length"
        :title="t.empty.title"
        :message="t.empty.message"
      />
      <div v-else class="list">
        <ConflictCard
          v-for="conflict in filteredConflicts"
          :key="conflict.id"
          :conflict="{ ...conflict, startDate: conflict.displayDate }"
          :read="store.isRead(conflict.id)"
          @toggle-read="store.toggleRead"
          @dismiss="store.dismissConflict"
        />
      </div>
    </SectionPanel>
  </AppShell>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.panel-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
}

button.ghost {
  background: rgba(28, 27, 24, 0.1);
}

button.solid {
  background: var(--accent);
  color: #fff;
}

.list {
  display: grid;
  gap: 16px;
}

.loading,
.error {
  padding: 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px dashed var(--border);
}

.error {
  color: var(--accent-2);
}

.form {
  padding: 16px;
  margin-bottom: 16px;
}

.form form {
  display: grid;
  gap: 14px;
}

.form-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
  font-size: 0.9rem;
}

input,
select {
  border-radius: 12px;
  border: 1px solid var(--border);
  padding: 10px 12px;
}

.lang-switch button {
  background: #fff;
  border: 1px solid var(--border);
}
</style>
