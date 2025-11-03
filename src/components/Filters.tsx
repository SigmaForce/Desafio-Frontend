import { useEffect, useState } from "react";
import Filter from "../assets/icons/filter.png";
import { useMovieFilters } from "../hooks/useMovieFilters";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function Filters() {
  const [filters, setFilters] = useMovieFilters();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    status: filters.status || "",

    minRating: filters.minRating?.toString() || "",
    maxRating: filters.maxRating?.toString() || "",
    minYear: filters.minYear?.toString() || "",
    maxYear: filters.maxYear?.toString() || "",
    minDuration: filters.minDuration?.toString() || "",
    maxDuration: filters.maxDuration?.toString() || "",

    orderBy: filters.orderBy || "createdAt",
    order: filters.order || "desc",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        status: filters.status || "",
        minRating: filters.minRating?.toString() || "",
        maxRating: filters.maxRating?.toString() || "",
        minYear: filters.minYear?.toString() || "",
        maxYear: filters.maxYear?.toString() || "",
        minDuration: filters.minDuration?.toString() || "",
        maxDuration: filters.maxDuration?.toString() || "",
        orderBy: filters.orderBy || "createdAt",
        order: filters.order || "desc",
      });
    }
  }, [open, filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFilters({
      status: formData.status || null,
      minRating: formData.minRating ? parseInt(formData.minRating) : null,
      maxRating: formData.maxRating ? parseInt(formData.maxRating) : null,
      minYear: formData.minYear ? parseInt(formData.minYear) : null,
      maxYear: formData.maxYear ? parseInt(formData.maxYear) : null,
      minDuration: formData.minDuration ? parseInt(formData.minDuration) : null,
      maxDuration: formData.maxDuration ? parseInt(formData.maxDuration) : null,
      orderBy: formData.orderBy as any,
      order: formData.order as any,
      page: 1,
    });

    setOpen(false);
  };

  const handleClearFilters = () => {
    const clearedData = {
      status: "",
      minRating: "",
      maxRating: "",
      minYear: "",
      maxYear: "",
      minDuration: "",
      maxDuration: "",
      orderBy: "createdAt",
      order: "desc",
    };

    setFormData(clearedData);

    setFilters({
      status: null,
      minRating: null,
      maxRating: null,
      minYear: null,
      maxYear: null,
      minDuration: null,
      maxDuration: null,
      title: null,
      orderBy: "createdAt",
      order: "desc",
      page: 1,
      limit: 10,
    });

    setOpen(false);
  };

  const activeFiltersCount = [
    filters.status,
    filters.minRating,
    filters.maxRating,
    filters.minYear,
    filters.maxYear,
    filters.minDuration,
    filters.maxDuration,
    filters.title,
  ].filter((value) => value !== null && value !== undefined).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="secondary">
          <div className=" flex items-center gap-2">
            <span>Filtros</span>
            <img src={Filter} aria-label="Filtro" />
          </div>
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-semibold">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Filtros de Filmes</DialogTitle>
            <DialogDescription>
              Configure os filtros para encontrar os filmes desejados.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Input
                  label="Status"
                  id="status"
                  placeholder="Ex: released, upcoming"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Input
                  label="Avaliação Mínima"
                  id="minRating"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="0"
                  value={formData.minRating}
                  onChange={(e) =>
                    setFormData({ ...formData, minRating: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Input
                  label="Avaliação Máxima"
                  id="maxRating"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="100"
                  value={formData.maxRating}
                  onChange={(e) =>
                    setFormData({ ...formData, maxRating: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Input
                  label="De"
                  id="minYear"
                  type="number"
                  placeholder="1900"
                  value={formData.minYear}
                  onChange={(e) =>
                    setFormData({ ...formData, minYear: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Input
                  label="Até"
                  id="maxYear"
                  type="number"
                  placeholder="2025"
                  value={formData.maxYear}
                  onChange={(e) =>
                    setFormData({ ...formData, maxYear: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Input
                  label="Duração Mínima (min)"
                  id="minDuration"
                  type="number"
                  placeholder="0"
                  value={formData.minDuration}
                  onChange={(e) =>
                    setFormData({ ...formData, minDuration: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Input
                  label="Duração Máxima (min)"
                  id="maxDuration"
                  type="number"
                  placeholder="300"
                  value={formData.maxDuration}
                  onChange={(e) =>
                    setFormData({ ...formData, maxDuration: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="font-bold text-xs" htmlFor="orderBy">
                  Ordenar Por
                </label>
                <Select
                  value={formData.orderBy}
                  onValueChange={(value) =>
                    setFormData({ ...formData, orderBy: value })
                  }
                >
                  <SelectTrigger id="orderBy">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Título</SelectItem>
                    <SelectItem value="releaseDate">
                      Data de Lançamento
                    </SelectItem>
                    <SelectItem value="rating">Avaliação</SelectItem>
                    <SelectItem value="votes">Votos</SelectItem>
                    <SelectItem value="durationMinutes">Duração</SelectItem>
                    <SelectItem value="createdAt">Data de Criação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="font-bold text-xs" htmlFor="orderBy">
                  Ordenar Por
                </label>
                <Select
                  value={formData.order}
                  onValueChange={(value) =>
                    setFormData({ ...formData, order: value })
                  }
                >
                  <SelectTrigger id="order">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Crescente</SelectItem>
                    <SelectItem value="desc">Decrescente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handleClearFilters}
              className="sm:mr-auto"
            >
              Limpar Filtros
            </Button>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button type="button" size="lg" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button size="lg" type="submit">
                Aplicar Filtros
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
