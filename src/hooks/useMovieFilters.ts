import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useMovieFilters() {
  return useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),

    title: parseAsString,
    language: parseAsString,
    status: parseAsString,
    genre: parseAsString,

    minRating: parseAsInteger,
    maxRating: parseAsInteger,
    minYear: parseAsInteger,
    maxYear: parseAsInteger,
    minDuration: parseAsInteger,
    maxDuration: parseAsInteger,
    ageRating: parseAsInteger,

    userId: parseAsString,

    orderBy: parseAsString.withDefault("createdAt"),
    order: parseAsString.withDefault("desc"),
  });
}

export type MovieFilters = ReturnType<typeof useMovieFilters>[0];
