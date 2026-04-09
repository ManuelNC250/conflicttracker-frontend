<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="app">
    <header class="hero">
      <div class="container hero-inner">
        <div>
          <p class="hero-kicker">The Global Conflict Monitor</p>
          <h1>{{ title }}</h1>
          <p class="hero-subtitle">{{ subtitle }}</p>
        </div>
        <slot name="actions" />
      </div>
    </header>
    <main class="container">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.hero {
  padding: 36px 0 12px;
}

.hero-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.hero-kicker {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--muted);
  margin: 0 0 8px;
}

h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  margin: 0 0 8px;
}

.hero-subtitle {
  margin: 0;
  color: var(--muted);
  max-width: 560px;
  line-height: 1.5;
}
</style>
