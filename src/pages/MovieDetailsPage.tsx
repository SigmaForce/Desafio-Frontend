import { useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";
import { Unauthorized } from "../components/Unauthorized";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../hooks/useMovie";

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
  const { user } = useAuth();
  const { data: movie, isLoading, error } = useMovie(id!);

  if (isLoading) {
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
          {error?.message || "Filme não encontrado"}
        </div>
      </div>
    );
  }

  if (user?.id !== movie.userId) {
    return <Unauthorized />;
  }

  return <MovieDetails movie={movie} />;
}
