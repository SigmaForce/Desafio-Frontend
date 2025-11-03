import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";

export interface Movie {
  ageRating: number;
  backdropUrl: string;
  budget: string;
  createdAt: string;
  durationMinutes: string;
  genres: string[];
  id: string;
  language: string;
  originalTitle: string;
  posterUrl: string;
  profit: string;
  rating: string;
  releaseDate: string;
  revenue: string;
  status: string;
  synopsis: string;
  tagline: string;
  title: string;
  trailerUrl: string;
  updatedAt: string;
  userId: string;
  votes: number;
}

export function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(`/api/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar detalhes do filme");
        }

        const data = await response.json();
        console.log(data);
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">
          {error || "Filme não encontrado"}
        </div>
      </div>
    );
  }

  return <MovieDetails movie={movie} />;
}
