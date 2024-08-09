import { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDY1ZGJhNTk5YjA3NmFkMDg2NzQwNmYyZjczN2NlOCIsIm5iZiI6MTcyMjk2NDM4My4yMDUzNTksInN1YiI6IjY2YjI1ODFkYTQyZDA1MTQxNzk0MTAzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LwIO4u3dnNzy1umBkD2Ddi3qFL5QdggGsPstjQcsRJU';  // Be sure to replace with your actual access token

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export interface SearchParams {
  query: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
}

const useMovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = async (params: SearchParams) => {
    setLoading(true);
    setError(null);

    const config = {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        accept: 'application/json'
      },
      params
    };

    try {
      const { data } = await axios.get(`${BASE_URL}/search/movie`, config);
      setMovies(data.results);
    } catch (error) {
      setError('Failed to fetch movies. Please try again.');
      console.error('API error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, searchMovies };
};

export default useMovieSearch;
