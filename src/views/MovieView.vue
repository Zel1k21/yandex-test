<script setup lang="ts">
import { computed } from 'vue'
import MovieCard from '../components/MovieCard.vue'
import { getMovie, similar } from '../movies'

const props = defineProps<{ id: number }>()

const movie = computed(() => getMovie(props.id))
const related = computed(() => (movie.value ? similar(movie.value) : []))
</script>

<template>
  <main v-if="movie" class="page movie">
    <div class="left">
      <img class="poster" :src="movie.poster" :alt="movie.title" />
      <h3>Похожие фильмы</h3>
      <div class="related">
        <MovieCard v-for="m in related" :key="m.id" :movie="m" />
      </div>
    </div>

    <div class="info">
      <h1>{{ movie.title }}</h1>
      <p class="muted">{{ movie.original }}, {{ movie.year }}</p>
      <p class="ratings">
        <b>Кинопоиск {{ movie.kp }}</b> · IMDb {{ movie.imdb }}
      </p>
      <p>{{ movie.genres.join(', ') }}</p>
      <p class="muted">
        {{ movie.countries.join(', ') }} · {{ movie.runtime }} мин
        <template v-if="movie.age"> · {{ movie.age }}</template>
      </p>
      <p><b>Режиссёр:</b> {{ movie.directors.join(', ') }}</p>
      <p><b>В ролях:</b> {{ movie.cast.join(', ') }}</p>
      <p>{{ movie.synopsis }}</p>
      <p><b>Настроение:</b> {{ movie.mood }}</p>
      <a v-if="movie.trailer" class="trailer" :href="movie.trailer" target="_blank" rel="noopener">
        Смотреть трейлер
      </a>
    </div>
  </main>

  <main v-else class="page">
    <h1>Фильм не найден</h1>
    <RouterLink to="/">На главную</RouterLink>
  </main>
</template>

<style scoped>
.movie {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 48px;
  padding-top: 16px;
}

.poster {
  display: block;
  width: 100%;
  max-height: 560px;
  object-fit: contain;
  border-radius: 16px;
  background: #e4e9f5;
}

.related {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.related :deep(.card) {
  width: 100%;
}

h1 {
  margin-top: 0;
  font-size: 28px;
}

.muted {
  color: #666;
}

.trailer {
  display: inline-block;
  padding: 12px 28px;
  border-radius: 10px;
  background: #1f3fbf;
  color: #fff;
}

@media (max-width: 800px) {
  .movie {
    grid-template-columns: 1fr;
  }
}
</style>
