import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import type { Movie } from "../pages/MovieDetailsPage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SheetClose } from "./ui/sheet";
import { Textarea } from "./ui/textarea";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const movieFormSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  originalTitle: z.string().min(1, "Título original é obrigatório"),
  tagline: z.string().min(1, "Slogan é obrigatório"),
  synopsis: z.string().min(10, "Sinopse deve ter pelo menos 10 caracteres"),
  language: z.string().min(2, "Idioma é obrigatório"),
  releaseDate: z.string().min(1, "Data de lançamento é obrigatória"),
  durationMinutes: z.coerce.number().min(1, "Duração deve ser maior que 0"),
  status: z.string(),
  budget: z.string(),
  revenue: z.string(),
  profit: z.string(),
  votes: z.coerce.number(),
  rating: z.string(),
  ageRating: z.coerce.number().min(0).max(18),
  trailerUrl: z.url("URL do trailer inválida"),
  genres: z.string().min(1, "Adicione pelo menos um gênero"),
  poster: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      "Tamanho máximo do poster é 10MB"
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Apenas JPEG, PNG, WEBP ou GIF são aceitos"
    ),
  backdrop: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      "Tamanho máximo do backdrop é 10MB"
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Apenas JPEG, PNG, WEBP ou GIF são aceitos"
    ),
});

type MovieFormValues = z.infer<typeof movieFormSchema>;

interface EditMovieFormProps {
  movie: Movie;
}

export function EditMovieForm({ movie }: EditMovieFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<MovieFormValues>({
    resolver: zodResolver(movieFormSchema) as any,
    defaultValues: {
      title: movie.title,
      originalTitle: movie.originalTitle,
      tagline: movie.tagline,
      synopsis: movie.synopsis,
      language: movie.language,
      releaseDate: movie.releaseDate,
      durationMinutes: parseInt(movie.durationMinutes),
      status: movie.status,
      budget: movie.budget || "",
      revenue: movie.revenue || "",
      profit: movie.profit || "",
      votes: movie.votes || 0,
      rating: movie.rating || "",
      ageRating: movie.ageRating || 0,
      trailerUrl: movie.trailerUrl,
      genres: movie.genres.join(", "),
    },
  });

  const statusValue = watch("status");

  useEffect(() => {
    reset({
      title: movie.title,
      originalTitle: movie.originalTitle,
      tagline: movie.tagline,
      synopsis: movie.synopsis,
      language: movie.language,
      releaseDate: movie.releaseDate,
      durationMinutes: parseInt(movie.durationMinutes),
      status: movie.status,
      budget: movie.budget || "",
      revenue: movie.revenue || "",
      profit: movie.profit || "",
      votes: movie.votes || 0,
      rating: movie.rating || "",
      ageRating: movie.ageRating || 0,
      trailerUrl: movie.trailerUrl,
      genres: movie.genres.join(", "),
    });
  }, [movie, reset]);

  const onSubmit = async (data: MovieFormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("originalTitle", data.originalTitle);
      if (data.tagline) formData.append("tagline", data.tagline);
      formData.append("synopsis", data.synopsis);
      formData.append("language", data.language);
      formData.append("releaseDate", data.releaseDate);
      formData.append("durationMinutes", data.durationMinutes.toString());
      formData.append("status", data.status);
      if (data.budget) formData.append("budget", data.budget);
      if (data.revenue) formData.append("revenue", data.revenue);
      if (data.profit) formData.append("profit", data.profit);
      if (data.votes) formData.append("votes", data.votes.toString());
      if (data.rating) formData.append("rating", data.rating);
      if (data.ageRating)
        formData.append("ageRating", data.ageRating.toString());
      formData.append("trailerUrl", data.trailerUrl);

      const genresArray = data.genres.split(",").map((g) => g.trim());
      formData.append("genres", JSON.stringify(genresArray));

      if (data.poster && data.poster.length > 0) {
        formData.append("poster", data.poster[0]);
      }
      if (data.backdrop && data.backdrop.length > 0) {
        formData.append("backdrop", data.backdrop[0]);
      }

      const response = await fetch(`/api/movie/${movie.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao atualizar filme");
      }

      const result = await response.json();
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informações Básicas</h3>

        <div className="space-y-2">
          <Input
            label="Título"
            id="title"
            placeholder="Ex: O Poderoso Chefão"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            label="Título Original"
            id="originalTitle"
            placeholder="Ex: The Godfather"
            {...register("originalTitle")}
          />
          {errors.originalTitle && (
            <p className="text-sm text-red-500">
              {errors.originalTitle.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            label="Slogan"
            id="tagline"
            placeholder="Ex: Uma oferta que você não pode recusar"
            {...register("tagline")}
          />
          {errors.tagline && (
            <p className="text-sm text-red-500">{errors.tagline.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-xs" htmlFor="synopsis">
            Sinopse
          </label>
          <Textarea
            id="synopsis"
            placeholder="Descreva a história do filme..."
            rows={4}
            {...register("synopsis")}
          />
          {errors.synopsis && (
            <p className="text-sm text-red-500">{errors.synopsis.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            label="Gêneros (separados por vírgula)"
            id="genres"
            placeholder="Ex: Drama, Crime, Suspense"
            {...register("genres")}
          />
          {errors.genres && (
            <p className="text-sm text-red-500">{errors.genres.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Detalhes de Produção</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              label="Idioma"
              id="language"
              placeholder="Ex: pt-BR"
              {...register("language")}
            />
            {errors.language && (
              <p className="text-sm text-red-500">{errors.language.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              label="Data de Lançamento"
              id="releaseDate"
              type="date"
              {...register("releaseDate")}
            />
            {errors.releaseDate && (
              <p className="text-sm text-red-500">
                {errors.releaseDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              label="Duração (minutos)"
              id="durationMinutes"
              type="number"
              placeholder="Ex: 175"
              {...register("durationMinutes")}
            />
            {errors.durationMinutes && (
              <p className="text-sm text-red-500">
                {errors.durationMinutes.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-xs" htmlFor="status">
              Status
            </label>
            <Select
              value={statusValue}
              onValueChange={(value) => setValue("status", value as any)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="released">Lançado</SelectItem>
                <SelectItem value="upcoming">Em breve</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Input
            label="Classificação Etária"
            id="ageRating"
            type="number"
            placeholder="Ex: 16"
            {...register("ageRating")}
          />
          {errors.ageRating && (
            <p className="text-sm text-red-500">{errors.ageRating.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informações Financeiras</h3>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Input
              label="Orçamento"
              id="budget"
              placeholder="Ex: 6000000"
              {...register("budget")}
            />
            {errors.budget && (
              <p className="text-sm text-red-500">{errors.budget.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              label="Receita"
              id="revenue"
              placeholder="Ex: 250000000"
              {...register("revenue")}
            />
            {errors.revenue && (
              <p className="text-sm text-red-500">{errors.revenue.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              label="Lucro"
              id="profit"
              placeholder="Ex: 244000000"
              {...register("profit")}
            />
            {errors.profit && (
              <p className="text-sm text-red-500">{errors.profit.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Avaliações</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              type="number"
              label="Nota"
              id="rating"
              placeholder="Ex: 92"
              {...register("rating")}
            />
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              label="Votos"
              id="votes"
              type="number"
              placeholder="Ex: 15000"
              {...register("votes")}
            />
            {errors.votes && (
              <p className="text-sm text-red-500">{errors.votes.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Mídia</h3>

        <div className="space-y-2">
          <Input
            label="URL do Trailer"
            id="trailerUrl"
            type="url"
            placeholder="https://youtube.com/..."
            {...register("trailerUrl")}
          />
          {errors.trailerUrl && (
            <p className="text-sm text-red-500">{errors.trailerUrl.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            label="Poster (JPEG, PNG, WEBP, GIF)"
            id="poster"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            {...register("poster")}
          />
          {movie.posterUrl && (
            <p className="text-xs text-gray-500">
              Poster atual: {movie.posterUrl.split("/").pop()}
            </p>
          )}
          <p className="text-xs text-gray-500">
            Deixe em branco para manter o poster atual
          </p>
          {errors.poster && (
            <p className="text-sm text-red-500">{errors.poster.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            label="Backdrop (JPEG, PNG, WEBP, GIF)"
            id="backdrop"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            {...register("backdrop")}
          />
          {movie.backdropUrl && (
            <p className="text-xs text-gray-500">
              Backdrop atual: {movie.backdropUrl.split("/").pop()}
            </p>
          )}
          <p className="text-xs text-gray-500">
            Deixe em branco para manter o backdrop atual
          </p>
          {errors.backdrop && (
            <p className="text-sm text-red-500">{errors.backdrop.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <SheetClose>
          <Button
            type="button"
            size="lg"
            variant="secondary"
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancelar
          </Button>
        </SheetClose>
        <Button
          type="submit"
          size="lg"
          variant="primary"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Atualizando...
            </>
          ) : (
            "Atualizar Filme"
          )}
        </Button>
      </div>
    </form>
  );
}
