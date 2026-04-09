<script setup>
defineProps({
  title: {
    type: String,
    default: 'Nothing here yet'
  },
  message: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="empty">
    <div class="badge">No data</div>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.empty {
  text-align: center;
  padding: 32px 20px;
  border-radius: 18px;
  border: 1px dashed var(--border);
  background: rgba(255, 255, 255, 0.7);
}

.badge {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(42, 107, 95, 0.16);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

h3 {
  margin: 12px 0 6px;
}

p {
  margin: 0;
  color: var(--muted);
}
</style>
