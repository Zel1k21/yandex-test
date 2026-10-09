<script setup lang="ts">
import type { Movie } from '../movies'

defineProps<{ movie: Movie }>()
</script>

<template>
  <RouterLink :to="`/movie/${movie.id}`" class="card" :title="movie.title">
    <img :src="movie.poster" :alt="movie.title" loading="lazy" />
    <span class="rating">★ {{ movie.kp }}</span>
  </RouterLink>
</template>

<style scoped>
.card {
  position: relative;
  display: block;
  flex: none;
  width: 200px;
  aspect-ratio: 2 / 3;
  border-radius: 16px;
  overflow: hidden;
  background: #d9d9d9;
  transition: transform 0.15s;
}

.card:hover {
  transform: translateY(-4px);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rating {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 2px 8px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  font-size: 13px;
}
</style>
