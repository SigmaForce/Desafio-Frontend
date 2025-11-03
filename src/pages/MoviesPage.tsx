import { useEffect, useState } from "react";
import { Filters } from "../components/Filters";
import { MovieList } from "../components/MovieList";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { CreateMovieForm } from "../components/CreateMovieForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { useDebounce } from "../hooks/useDebounce";
import { useMovieFilters } from "../hooks/useMovieFilters";

export function MoviesPage() {
  const [filters, setFilters] = useMovieFilters();
  const [searchInput, setSearchInput] = useState(filters.title || "");

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    if (debouncedSearch !== filters.title) {
      setFilters({ title: debouncedSearch || null, page: 1 });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (filters.title !== searchInput && filters.title !== debouncedSearch) {
      setSearchInput(filters.title || "");
    }
  }, [filters.title]);

  const handleClearSearch = () => {
    setSearchInput("");
    setFilters({ title: null, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  return (
    <div className="flex-1 container mx-auto ">
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4  py-6 lg:px-0 px-4">
        <div className="flex flex-col sm:flex-row  sm:items-center gap-3 w-full  sm:w-auto">
          <div className="relative flex-1 sm:min-w-[300px]">
            <Input
              placeholder="Pesquise por filmes"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pr-8"
            />
            {searchInput && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <Filters />
            <Sheet>
              <SheetTrigger asChild>
                <Button size="lg" variant="primary" className="flex-1">
                  Adicionar Filme
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Adicionar Filme</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                  <CreateMovieForm />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <MovieList filters={filters} onPageChange={handlePageChange} />
    </div>
  );
}
