<script setup lang="ts">
import { useRouter } from 'vue-router'
import HeroCarousel from '../components/HeroCarousel.vue'
import MovieRow from '../components/MovieRow.vue'
import { exclusive, movies, newest, popular } from '../movies'

const router = useRouter()

function randomMovie() {
  const m = movies[Math.floor(Math.random() * movies.length)]!
  router.push(`/movie/${m.id}`)
}
</script>

<template>
  <main class="page">
    <HeroCarousel :movies="popular" />
    <MovieRow title="Новинки" :movies="newest" />
    <MovieRow title="Эксклюзивы" :movies="exclusive" />
    <MovieRow title="Популярные" :movies="popular" />

    <section class="random">
      <h2>Не знаете, что выбрать?</h2>
      <p>Доверьтесь случаю — подберём фильм на сегодняшний вечер.</p>
      <button @click="randomMovie">Случайный фильм</button>
    </section>
  </main>
</template>

<style scoped>
.random {
  margin-top: 40px;
  padding: 64px 24px;
  border-radius: 16px;
  background: #d9e4ff;
  text-align: center;
}

.random h2 {
  margin: 0;
  font-size: 28px;
}

button {
  padding: 12px 28px;
  border: 0;
  border-radius: 10px;
  background: #1f3fbf;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
</style>
