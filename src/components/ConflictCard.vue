<script setup>
import { computed } from 'vue'
import { useI18n } from '../i18n'

const props = defineProps({
  conflict: {
    type: Object,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-read', 'dismiss'])
const { t } = useI18n()

const statusClass = computed(() => props.conflict.status?.toLowerCase())

const alpha3To2 = {
  UKR: 'ua',
  RUS: 'ru',
  ISR: 'il',
  PSE: 'ps',
  SYR: 'sy'
}

const flagUrl = (code) => {
  if (!code) return ''
  const iso2 = alpha3To2[code.toUpperCase()] || code.slice(0, 2).toLowerCase()
  return `https://flagcdn.com/24x18/${iso2}.png`
}
</script>

<template>
  <article class="card" :class="{ read }">
    <div class="card-top">
      <div class="flags">
        <img
          v-for="code in conflict.countryCodes"
          :key="code"
          class="flag"
          :src="flagUrl(code)"
          :alt="code"
          @error="$event.target.style.display = 'none'"
        />
      </div>
      <span class="status" :class="statusClass">{{ t.statusNames[conflict.status] || conflict.status }}</span>
    </div>
    <div class="card-body">
      <router-link :to="`/conflicts/${conflict.id}`" class="title">
        {{ conflict.name }}
      </router-link>
      <p class="description">{{ conflict.description }}</p>
    </div>
    <div class="meta">
      <div>
        <p class="label">{{ t.labels.start }}</p>
        <p class="value">{{ conflict.startDate }}</p>
      </div>
      <div>
        <p class="label">{{ t.labels.actors }}</p>
        <p class="value">{{ conflict.factionNames?.join(', ') || '-' }}</p>
      </div>
    </div>
    <div class="actions">
      <button class="ghost" type="button" @click="emit('toggle-read', conflict.id)">
        {{ read ? t.actions.markUnread : t.actions.markRead }}
      </button>
      <button class="danger" type="button" @click="emit('dismiss', conflict.id)">
        {{ t.actions.delete }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 18px 20px;
  background: #fff;
  display: grid;
  gap: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -30px rgba(20, 20, 20, 0.5);
}

.card.read {
  opacity: 0.6;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flags {
  display: flex;
  gap: 6px;
}

.flag {
  width: 24px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
}

.description {
  margin: 6px 0 0;
  color: var(--muted);
  line-height: 1.5;
}

.meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  padding: 10px 0 4px;
  border-top: 1px dashed var(--border);
  border-bottom: 1px dashed var(--border);
}

.label {
  margin: 0 0 4px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.value {
  margin: 0;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

button {
  border: none;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
}

button.ghost {
  background: rgba(28, 27, 24, 0.08);
}

button.danger {
  background: rgba(196, 81, 45, 0.16);
  color: var(--accent-2);
}
</style>