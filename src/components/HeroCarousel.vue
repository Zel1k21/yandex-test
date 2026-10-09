<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Movie } from '../movies'

const props = defineProps<{ movies: Movie[] }>()

const router = useRouter()
const index = ref(0)
const n = computed(() => props.movies.length)

// position of each slide relative to the active one, wrapped to [-n/2, n/2)
function offsetOf(i: number) {
  const half = Math.floor(n.value / 2)
  return ((((i - index.value + half) % n.value) + n.value) % n.value) - half
}

const step = (d: number) => (index.value = (index.value + d + n.value) % n.value)

function onSlideClick(movie: Movie, offset: number) {
  if (offset === 0) router.push(`/movie/${movie.id}`)
  else if (Math.abs(offset) === 1) step(offset)
}
</script>

<template>
  <div class="hero">
    <button class="arrow" aria-label="Назад" @click="step(-1)">‹</button>
    <a
      v-for="(movie, i) in movies"
      :key="movie.id"
      :href="`/movie/${movie.id}`"
      class="slide"
      :class="{ active: offsetOf(i) === 0, hidden: Math.abs(offsetOf(i)) > 1 }"
      :style="{ '--o': offsetOf(i) }"
      @click.prevent="onSlideClick(movie, offsetOf(i))"
    >
      <img :src="movie.poster" :alt="movie.title" />
      <div class="caption">
        <b>{{ movie.title }}</b>
        <span>{{ movie.logline }}</span>
      </div>
    </a>
    <button class="arrow right" aria-label="Вперёд" @click="step(1)">›</button>
  </div>
</template>

<style scoped>
.hero {
  --w: min(55vw, 600px);
  position: relative;
  height: 340px;
  overflow: hidden;
}

.slide {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--w);
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
  background: #d9d9d9;
  opacity: 0.7;
  transform: translateX(calc(-50% + var(--o) * (var(--w) * 0.9 + 12px))) scale(0.8);
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.slide.active {
  z-index: 1;
  opacity: 1;
  transform: translateX(-50%);
}

.slide.hidden {
  opacity: 0;
  pointer-events: none;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
}

.caption {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 40px 20px 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: #fff;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.active .caption {
  opacity: 1;
}

.caption b {
  font-size: 22px;
}

.caption span {
  font-size: 14px;
}

.arrow {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 8px;
  width: 40px;
  height: 40px;
  transform: translateY(-50%);
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  font-size: 26px;
  cursor: pointer;
}

.arrow.right {
  left: auto;
  right: 8px;
}
</style>
