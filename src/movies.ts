import raw from './data/movies.json'

export interface Movie {
  id: number
  title: string
  original: string
  year: number
  genres: string[]
  countries: string[]
  runtime: number
  age: string
  directors: string[]
  cast: string[]
  logline: string
  synopsis: string
  mood: string
  kp: number
  imdb: number
  kpVotes: number
  trailer: string
  poster: string
  regularRelease: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const movies: Movie[] = (raw.movies as any[]).map((m) => ({
  id: m.identification.kinopoisk_id,
  title: m.identification.title_ru,
  original: m.identification.title_original,
  year: m.identification.year,
  genres: m.details.genres ?? [],
  countries: m.details.countries ?? [],
  runtime: m.details.runtime_minutes,
  age: m.details.age_ratings?.[0]?.rating ?? '',
  directors: m.creators.directors ?? [],
  cast: (m.cast ?? []).slice(0, 6).map((c: { name_ru: string }) => c.name_ru),
  logline: m.content.logline,
  synopsis: m.content.synopsis,
  mood: m.content.mood,
  kp: m.ratings.kinopoisk.value,
  imdb: m.ratings.imdb.value,
  kpVotes: m.ratings.kinopoisk.votes,
  trailer: m.links.official_trailer?.url ?? '',
  poster: '/' + m.poster.path,
  regularRelease: m.release?.russian_premiere?.release_type === 'theatrical_release',
}))

export const getMovie = (id: number) => movies.find((m) => m.id === id)

export const newest = [...movies].sort((a, b) => b.year - a.year)
export const exclusive = movies.filter((m) => !m.regularRelease)
export const popular = [...movies].sort((a, b) => b.kpVotes - a.kpVotes)

export function similar(movie: Movie, count = 4): Movie[] {
  const score = (m: Movie) => m.genres.filter((g) => movie.genres.includes(g)).length
  return movies
    .filter((m) => m.id !== movie.id)
    .sort((a, b) => score(b) - score(a))
    .slice(0, count)
}

export function search(query: string): Movie[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return movies.filter((m) => `${m.title} ${m.original}`.toLowerCase().includes(q))
}
