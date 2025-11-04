import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditMovieData {
  id: string;
  formData: FormData;
}

export function useEditMovie() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, formData }: EditMovieData) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/movie/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao atualizar filme");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
      queryClient.invalidateQueries({
        queryKey: ["movie"],
      });
    },
  });

  return mutation;
}
