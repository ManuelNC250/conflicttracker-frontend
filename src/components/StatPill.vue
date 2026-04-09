<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  tone: {
    type: String,
    default: 'neutral'
  }
})
</script>

<template>
  <div class="pill" :class="tone">
    <p class="value">{{ value }}</p>
    <p class="label">{{ label }}</p>
  </div>
</template>

<style scoped>
.pill {
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.7);
}

.value {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
}

.label {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.pill.active {
  border-color: rgba(42, 107, 95, 0.4);
}

.pill.frozen {
  border-color: rgba(196, 81, 45, 0.4);
}

.pill.resolved {
  border-color: rgba(70, 82, 111, 0.4);
}
</style>
