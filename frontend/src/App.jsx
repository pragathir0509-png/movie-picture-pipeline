import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/movies';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error('The movie service returned an error.');
        return response.json();
      })
      .then((data) => {
        if (active) setMovies(data);
      })
      .catch(() => {
        if (active) setError('Could not load movies. Check that the backend API is running.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">MOVIE PICTURE PIPELINE</p>
        <h1>Stories worth watching.</h1>
        <p className="subtitle">A simple movie catalogue delivered through a CI/CD pipeline.</p>
      </header>
      <section aria-labelledby="movies-heading" className="content">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2 id="movies-heading">Featured movies</h2>
          </div>
          <span className="count">{movies.length} titles</span>
        </div>
        {loading && <p role="status">Loading movies…</p>}
        {error && <p role="alert" className="error">{error}</p>}
        {!loading && !error && (
          <div className="grid">
            {movies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <div className="poster" aria-hidden="true">{String(movie.title).slice(0, 1)}</div>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.year} <span>·</span> {movie.genre}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <footer>Movie Picture Pipeline · DevOps for ATCI</footer>
    </main>
  );
}
