import { useState } from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  genres: string;
}

export function MovieCard({
  id,
  title,
  image,
  rating,
  genres,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/movies/${id}`}
      className="relative w-full rounded-sm cursor-pointer lg:h-[360px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-[360px] object-cover rounded-sm"
      />

      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isHovered ? "opacity-100 scale-100 " : "opacity-0 scale-50"
        }`}
      >
        <div className="relative w-32 h-32 backdrop-blur-xs rounded-full">
          <svg className="w-full h-full -rotate-90 ">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="#333"
              strokeWidth="10"
              fill="none"
            />

            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="#FFE000"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 58}`}
              strokeDashoffset={`${2 * Math.PI * 58 * (1 - rating / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-[#FFE000]">
              {parseInt(rating + "")}%
            </span>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h3 className="text-white text-base font-bold font-mono mb-2">
          {title}
        </h3>
        <p className="text-[#EBEAF8] font-mono text-sm">{genres}</p>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <h3 className="text-white text-xl font-bold">{title}</h3>
      </div>
    </Link>
  );
}
