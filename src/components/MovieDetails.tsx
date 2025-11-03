import { useAuth } from "../context/AuthContext";
import {
  formatCurrencyShort,
  formatDateToUS,
  formatDuration,
} from "../lib/utils";
import type { Movie } from "../pages/MovieDetailsPage";
import { EditMovieForm } from "./EditMovieForm";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const { user } = useAuth();

  return (
    <div className="lg:relative container mx-auto flex-1  mt-8 text-white">
      <img
        src={movie.posterUrl}
        alt="Bumblebee poster"
        className="w-full lg:h-[542px]  object-cover rounded-lg shadow-2xl lg:hidden block px-4"
      />
      <div className="flex lg:flex-row flex-col-reverse lg:justify-between lg:items-center px-8 py-4 ">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-[#EEEEF0] font-bold font-mono">
            {movie.title}
          </h1>
          <p className="text-base font-mono text-[#EEEEF0]">
            Título original: {movie.originalTitle}
          </p>
        </div>
        {user?.id === movie.userId && (
          <div className="flex gap-3 mb-3 lg:mb-0">
            <Button size="lg" variant="secondary">
              Deletar
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="lg" variant="primary" className="flex-1">
                  Editar Filme
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle> Editar Filme</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                  <EditMovieForm movie={movie} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>

      <img
        src={movie.backdropUrl}
        alt="Bumblebee backdrop"
        className="absolute top-0 -z-20 w-full h-[600px] object-cover lg:block hidden"
      />

      <div className="absolute inset-0 bg-linear-to-r h-[600px] from-black via-black/70 to-transparent -z-10 hidden lg:block"></div>

      <div className="px-8 pb-12 ">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <img
              src={movie.posterUrl}
              alt="Bumblebee poster"
              className="w-full lg:h-[542px] object-cover rounded-lg shadow-2xl hidden lg:block"
            />
          </div>

          <div className="lg:col-span-9 col-span-12">
            <div className="flex lg:flex-row flex-col-reverse justify-start lg:items-center lg:justify-between">
              <p className="text-base text-center lg:text-start mb-2 lg:mb-0 text-[#EEEEF0] font-mono italic">
                {movie.tagline}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 space-y-2 bg-mauve-dark-800/75  rounded-sm">
                  <p className="text-xs uppercase font-mono font-bold text-[#B5B2BC]">
                    CLASSIFICAÇÃO INDICATIVA
                  </p>
                  <p className="text-md font-mono font-semibold">
                    {movie.ageRating} anos
                  </p>
                </div>
                <div className="p-4 space-y-2 bg-mauve-dark-800/75  rounded-sm h-full">
                  <p className="text-xs uppercase font-mono font-bold text-[#B5B2BC]">
                    VOTOS
                  </p>
                  <p className="text-md font-mono font-semibold">
                    {movie.votes}
                  </p>
                </div>

                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg
                    className="transform -rotate-90 w-28 h-28"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      stroke="#374151"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      stroke="#FFE000"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 44}`}
                      strokeDashoffset={`${2 * Math.PI * 44 * (1 - 0.67)}`}
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-in-out"
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl text-[#FFE000] font-bold">
                      {parseInt(movie.rating)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="lg:col-span-6 col-span-12">
                <div className="bg-mauve-dark-800/75  rounded-sm p-4">
                  <h2 className="text-base font-mono font-bold mb-3 text-[#B5B2BC]">
                    SINOPSE
                  </h2>
                  <p className="text-base font-mono text-[#EEEEF0] leading-normal mb-6">
                    {movie.synopsis}
                  </p>
                </div>
                <div className="flex-1 p-4 space-y-2 bg-mauve-dark-800/75  rounded-sm mt-4">
                  <p className="text-xs uppercase font-mono font-bold text-[#B5B2BC]">
                    Generos
                  </p>
                  <div className="flex justify-start gap-2 items-center">
                    {movie.genres.map((genre) => (
                      <div className="p-2 bg-[#C150FF]/18 lg:text-base text-xs uppercase rounded-sm">
                        {genre}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 col-span-12 flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                  <div className=" flex-1 p-4 space-y-2 bg-mauve-dark-800/75  rounded-sm">
                    <p className="text-xs uppercase font-mono font-bold text-[#B5B2BC]">
                      Lançamento
                    </p>
                    <p className="text-md font-mono font-semibold">
                      {formatDateToUS(movie.releaseDate)}
                    </p>
                  </div>
                  <div className=" flex-1 p-4 space-y-2 bg-mauve-dark-800/75  rounded-sm">
                    <p className="text-xs uppercase font-mono font-bold text-[#B5B2BC]">
                      Duração
                    </p>
                    <p className="text-md font-mono font-semibold">
                      {formatDuration(parseInt(movie.durationMinutes))}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <div className=" flex-1 p-4 space-y-2 bg-mauve-dark-800/75  rounded-sm">
                    <p className="text-xs uppercase font-mono font-bold text-[#B5B2BC]">
                      Situação
                    </p>
                    <p className="text-md font-mono font-semibold">
                      {movie.status}
                    </p>
                  </div>
                  <div className=" flex-1 p-4 space-y-2 bg-mauve-dark-800/75  rounded-sm">
                    <p className="text-xs uppercase font-mono font-bold text-[#B5B2BC]">
                      Idioma
                    </p>
                    <p className="text-md font-mono font-semibold">
                      {movie.language}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <div className=" flex-1 p-4 space-y-2 bg-mauve-dark-800/75  rounded-sm">
                    <p className="text-xs uppercase font-mono font-bold text-[#B5B2BC]">
                      Orçamento
                    </p>
                    <p className="text-md font-mono font-semibold">
                      {formatCurrencyShort(parseFloat(movie.budget))}
                    </p>
                  </div>
                  <div className=" flex-1 p-4 space-y-2 bg-mauve-dark-800/75  rounded-sm">
                    <p className="text-xs uppercase font-mono font-bold text-[#B5B2BC]">
                      Receita
                    </p>
                    <p className="text-md font-mono font-semibold">
                      {formatCurrencyShort(parseFloat(movie.revenue))}
                    </p>
                  </div>
                  <div className=" flex-1 p-4 space-y-2 bg-mauve-dark-800/75  rounded-sm">
                    <p className="text-xs uppercase font-mono font-bold text-[#B5B2BC]">
                      Lucro
                    </p>
                    <p className="text-md font-mono font-semibold">
                      {formatCurrencyShort(parseFloat(movie.profit))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 lg:px-0 px-4 ">
        <h2 className="text-2xl font-bold mb-6 font-mono">Trailer</h2>
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${
              movie.trailerUrl.split("v=")[1]
            }`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
