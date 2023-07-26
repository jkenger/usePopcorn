import { useEffect, useState } from "react";

export function useMovies(query, apiKey, handleCloseMovie) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      const api = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(api, { signal: controller.signal });
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie Not Found");
          }
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie?.();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query, apiKey]
  );

  return { movies, isLoading, error };
}
