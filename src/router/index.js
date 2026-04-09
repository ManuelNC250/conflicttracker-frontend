import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConflictDetailView from '../views/ConflictDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/conflicts/:id', name: 'conflict-detail', component: ConflictDetailView, props: true }
  ]
})

export default router
