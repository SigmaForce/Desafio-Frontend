import { MovieCard } from "./ui/movieCard";

const movies = [
  {
    id: 1,
    title: "BUMBLEBEE",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    rating: 67,
    genres: ["Ação", "Aventura", "Ficção Científica"],
  },
  {
    id: 2,
    title: "THE MATRIX",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    rating: 87,
    genres: ["Ação", "Ficção Científica"],
  },
  {
    id: 3,
    title: "INCEPTION",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    rating: 92,
    genres: ["Ação", "Thriller", "Ficção Científica"],
  },
  {
    id: 41,
    title: "BUMBLEBEE",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    rating: 67,
    genres: ["Ação", "Aventura", "Ficção Científica"],
  },
  {
    id: 42,
    title: "THE MATRIX",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    rating: 87,
    genres: ["Ação", "Ficção Científica"],
  },
  {
    id: 43,
    title: "INCEPTION",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    rating: 92,
    genres: ["Ação", "Thriller", "Ficção Científica"],
  },
  {
    id: 51,
    title: "BUMBLEBEE",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    rating: 67,
    genres: ["Ação", "Aventura", "Ficção Científica"],
  },
  {
    id: 52,
    title: "THE MATRIX",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    rating: 87,
    genres: ["Ação", "Ficção Científica"],
  },
  {
    id: 53,
    title: "INCEPTION",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    rating: 92,
    genres: ["Ação", "Thriller", "Ficção Científica"],
  },
  {
    id: 543,
    title: "INCEPTION",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    rating: 92,
    genres: ["Ação", "Thriller", "Ficção Científica"],
  },
];

export const MovieList = () => {
  return (
    <div className="p-6 bg-[#EBEAF8]/8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          genres={movie.genres}
          image={movie.image}
          rating={movie.rating}
          title={movie.title}
        />
      ))}
    </div>
  );
};
