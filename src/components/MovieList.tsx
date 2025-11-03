import { useEffect, useState } from "react";
import type { MovieFilters } from "../hooks/useMovieFilters";
import { Pagination } from "./Pagination";
import { MovieCard } from "./ui/movieCard";

interface MovieListProps {
  filters: MovieFilters;
  onPageChange?: (page: number) => void;
}

interface Movie {
  id: string;
  title: string;
  releaseDate: string;
  rating: number;
  durationMinutes: number;
  genres: string[];
  language: string;
  status: string;
  votes: number;
  ageRating: number;
  posterUrl?: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export function MovieList({ filters, onPageChange }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentPage = filters.page || 1;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            params.append(key, String(value));
          }
        });

        if (!params.has("page")) {
          params.append("page", "1");
        }

        const response = await fetch(`/api/movies?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Erro ao buscar filmes");
        }

        const data = await response.json();
        setMovies(data.movies || data.data || []);

        if (data.pagination) {
          setPagination({
            currentPage: data.pagination.page || currentPage,
            totalPages: data.pagination.totalPages || 1,
            totalItems: data.pagination.total || 0,
            itemsPerPage: data.pagination.limit || 10,
          });
        } else {
          setPagination({
            currentPage,
            totalPages: 1,
            totalItems: data.data?.length ?? 0,
            itemsPerPage: 10,
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        console.error("Erro ao buscar filmes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [filters, currentPage]);

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-muted-foreground">Carregando filmes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 font-medium">{error}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Tente novamente mais tarde
          </p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">
            Nenhum filme encontrado com os filtros aplicados.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Tente ajustar os filtros ou realizar uma nova busca
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full bg-[#EBEAF8]/8 backdrop-blur-xs p-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center-safe">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              genres={movie.genres}
              image={movie.posterUrl!}
              rating={movie.rating}
              title={movie.title}
            />
          ))}
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center py-6">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
