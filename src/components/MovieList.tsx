import type { MovieFilters } from "../hooks/useMovieFilters";
import { useMoviesQuery } from "../hooks/useMoviesQuery";
import { Pagination } from "./Pagination";
import { MovieCard } from "./ui/movieCard";

interface MovieListProps {
  filters: MovieFilters;
  onPageChange?: (page: number) => void;
}

export function MovieList({ filters, onPageChange }: MovieListProps) {
  const { data, isLoading, isError, error } = useMoviesQuery(filters);

  const handlePageChange = (page: number) => {
    if (onPageChange) onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-muted-foreground">Carregando filmes...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 font-medium">{error.message}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Tente novamente mais tarde
          </p>
        </div>
      </div>
    );
  }

  if (data?.movies.length === 0) {
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
          {data?.movies.map((movie) => (
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
      {data?.pagination && data?.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center py-6">
          <Pagination
            currentPage={data?.pagination.currentPage}
            totalPages={data?.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
