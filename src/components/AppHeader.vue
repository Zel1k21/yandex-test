<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { search } from '../movies'

const router = useRouter()
const query = ref('')
const results = computed(() => search(query.value))

function open(id: number) {
  query.value = ''
  router.push(`/movie/${id}`)
}
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="logo" title="На главную">🎞</RouterLink>

    <div class="search">
      <input v-model="query" placeholder="Что вы хотите посмотреть сегодня ?" />
      <ul v-if="query.trim()" class="results">
        <li v-for="m in results" :key="m.id" @mousedown.prevent="open(m.id)">
          {{ m.title }} <span>{{ m.year }}</span>
        </li>
        <li v-if="!results.length" class="empty">Ничего не найдено</li>
      </ul>
    </div>

    <div class="profile" title="Профиль">👤</div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 32px;
}

.logo,
.profile {
  font-size: 28px;
  width: 40px;
}

.profile {
  text-align: right;
}

.search {
  position: relative;
  width: min(480px, 50%);
}

input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d5dbe8;
  border-radius: 10px;
  background: #fff;
  font-size: 14px;
}

.results {
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  margin: 4px 0 0;
  padding: 4px 0;
  list-style: none;
  background: #fff;
  border: 1px solid #d5dbe8;
  border-radius: 10px;
}

.results li {
  padding: 8px 14px;
  cursor: pointer;
}

.results li:hover {
  background: #eef3ff;
}

.results span,
.empty {
  color: #888;
}
</style>
