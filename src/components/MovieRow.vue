<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Movie } from '../movies'
import MovieCard from './MovieCard.vue'

defineProps<{ title: string; movies: Movie[] }>()

const scroller = ref<HTMLElement>()
const canLeft = ref(false)
const canRight = ref(true)

function updateArrows() {
  const el = scroller.value
  if (!el) return
  canLeft.value = el.scrollLeft > 0
  canRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

function scrollByPage(dir: number) {
  const el = scroller.value
  el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
}

// mouse drag
let pressed = false
let dragged = false
let startX = 0
let startScroll = 0

function onDown(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || e.button !== 0) return
  pressed = true
  dragged = false
  startX = e.clientX
  startScroll = scroller.value!.scrollLeft
}

function onMove(e: PointerEvent) {
  if (!pressed) return
  const dx = e.clientX - startX
  if (!dragged && Math.abs(dx) > 5) {
    dragged = true
    scroller.value!.setPointerCapture(e.pointerId)
  }
  if (dragged) scroller.value!.scrollLeft = startScroll - dx
}

function onUp() {
  pressed = false
}

// a drag must not open the card under the cursor
function onClickCapture(e: MouseEvent) {
  if (dragged) {
    e.preventDefault()
    e.stopPropagation()
    dragged = false
  }
}

onMounted(updateArrows)
</script>

<template>
  <section class="row">
    <h2>{{ title }}</h2>
    <div class="wrap">
      <button v-show="canLeft" class="arrow" aria-label="Влево" @click="scrollByPage(-1)">‹</button>
      <div
        ref="scroller"
        class="scroller"
        @scroll="updateArrows"
        @pointerdown="onDown"
        @pointermove="onMove"
        @pointerup="onUp"
        @pointercancel="onUp"
        @click.capture="onClickCapture"
        @dragstart.prevent
      >
        <MovieCard v-for="m in movies" :key="m.id" :movie="m" />
      </div>
      <button v-show="canRight" class="arrow right" aria-label="Вправо" @click="scrollByPage(1)">
        ›
      </button>
    </div>
  </section>
</template>

<style scoped>
.row {
  margin-top: 32px;
}

h2 {
  margin: 0 0 8px;
  font-size: 20px;
}

.wrap {
  position: relative;
}

.scroller {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;
  cursor: grab;
}

.scroller:active {
  cursor: grabbing;
}

.scroller::-webkit-scrollbar {
  display: none;
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
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  font-size: 26px;
  cursor: pointer;
}

.arrow.right {
  left: auto;
  right: 8px;
}
</style>
