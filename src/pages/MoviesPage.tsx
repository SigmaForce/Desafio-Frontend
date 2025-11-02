import { MovieList } from "../components/MovieList";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function MoviesPage() {
  return (
    <div className="flex-1 container mx-auto">
      <div className="flex justify-end items-center gap-4 py-6">
        <Input placeholder="Pesquise por filmes" variant="md" />
        <Button variant="secondary">Filtros</Button>
        <Button variant="primary">Adicionar Filme</Button>
      </div>
      <MovieList />
    </div>
  );
}
