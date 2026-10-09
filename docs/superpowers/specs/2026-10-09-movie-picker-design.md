# Movie picker prototype

Vue 3 + Vite + TS + vue-router. Data from `src/data/movies.json`, posters in `public/posters/`. No backend.

- `/` — header (logo, search with dropdown, profile icon), hero carousel of large posters (3 visible, centre larger),
  rows «Новинки» (year desc), «Эксклюзивы» (no regular Russian theatrical release), «Популярные» (KP votes desc),
  bottom block with «Случайный фильм» button.
- `/movie/:id` — big poster + 4 similar movies (shared genres) on the left; info on the right
  (titles, year, genres, runtime, age, ratings, directors, cast, synopsis, mood, trailer link).
- Out of scope: filters, favourites, auth, Kinopoisk fetching, unit tests.
- Verification: `npm run build` (type-check) and a manual look at both pages.
