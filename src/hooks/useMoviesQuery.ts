import { useQuery } from "@tanstack/react-query";

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

interface MoviesResponse {
  data: Movie[];
  pagination: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };
}

export function useMoviesQuery(filters: Record<string, any>) {
  const currentPage = filters.page || 1;

  return useQuery({
    queryKey: ["movies", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          params.append(key, String(value));
        }
      });

      if (!params.has("page")) {
        params.append("page", "1");
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/movies?${params.toString()}`
      );
      if (!res.ok) throw new Error("Erro ao buscar filmes");

      const data: MoviesResponse = await res.json();

      const movies = data.data || [];
      const pagination: PaginationInfo = data.pagination
        ? {
            currentPage: data.pagination.page || currentPage,
            totalPages: data.pagination.totalPages || 1,
            totalItems: data.pagination.total || 0,
            itemsPerPage: data.pagination.limit || 10,
          }
        : {
            currentPage,
            totalPages: 1,
            totalItems: movies.length,
            itemsPerPage: 10,
          };

      return { movies, pagination };
    },
    staleTime: 1000 * 60,
  });
}
