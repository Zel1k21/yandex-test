import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import MovieView from './views/MovieView.vue'

export const router = createRouter({
  // hash mode: GitHub Pages has no server-side fallback, so page reloads work only this way
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/movie/:id', component: MovieView, props: (r) => ({ id: Number(r.params.id) }) },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
