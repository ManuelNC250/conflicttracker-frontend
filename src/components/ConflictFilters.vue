<script setup>
import { useI18n } from '../i18n'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'ALL'
  }
})

const emit = defineEmits(['update:modelValue', 'update:status'])
const { t } = useI18n()
</script>

<template>
  <form class="filters" @submit.prevent>
    <label class="field">
      <span>{{ t.filters.search }}</span>
      <input
        type="search"
        :placeholder="t.filters.searchPlaceholder"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      />
    </label>
    <label class="field">
      <span>{{ t.filters.status }}</span>
      <select :value="status" @change="emit('update:status', $event.target.value)">
        <option value="ALL">{{ t.filters.allStatuses }}</option>
        <option value="ACTIVE">{{ t.statusNames.ACTIVE }}</option>
        <option value="FROZEN">{{ t.statusNames.FROZEN }}</option>
        <option value="RESOLVED">{{ t.statusNames.RESOLVED }}</option>
      </select>
    </label>
  </form>
</template>

<style scoped>
.filters {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.field {
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
  background: #fff;
}
</style>
