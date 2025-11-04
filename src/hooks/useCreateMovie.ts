import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateMovieData {
  formData: FormData;
}

export function useCreateMovie() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ formData }: CreateMovieData) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/movie`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao criar filme");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
  });

  return mutation;
}
