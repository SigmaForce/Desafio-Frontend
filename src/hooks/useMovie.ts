import { useQuery } from "@tanstack/react-query";
import type { Movie } from "../pages/MovieDetailsPage";

export function useMovie(id: string) {
  const query = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await fetch(`/api/movie/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao carregar detalhes do filme");
      }

      const data: Movie = await response.json();
      return data;
    },
    enabled: !!id,
  });

  return query;
}
