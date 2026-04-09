<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section class="section surface">
    <div class="panel-header">
      <div>
        <h2 v-if="title">{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </div>
    <div class="panel-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="panel-footer">
      <slot name="footer" />
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 22px 26px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.panel-header h2 {
  margin: 0 0 6px;
  font-size: 1.4rem;
}

.panel-header p {
  margin: 0;
  color: var(--muted);
}

.panel-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel-footer {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px dashed var(--border);
  color: var(--muted);
  font-size: 0.9rem;
}
</style>
