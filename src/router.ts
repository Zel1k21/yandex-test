import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import MovieView from './views/MovieView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/movie/:id', component: MovieView, props: (r) => ({ id: Number(r.params.id) }) },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
