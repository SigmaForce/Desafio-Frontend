"use client";

import ChevronLeft from "../assets/icons/chevron-left.png";
import ChevronRight from "../assets/icons/chevron-right.png";
import { Button } from "./ui/button";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= halfMaxPagesToShow + 1) {
        pages.push(...[1, 2, 3, 4, 5, "...", totalPages]);
      } else if (currentPage >= totalPages - halfMaxPagesToShow) {
        pages.push(
          ...[
            1,
            "...",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
          ]
        );
      } else {
        pages.push(
          ...[
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
          ]
        );
      }
    }

    return pages.map((page, index) => (
      <Button
        key={index}
        variant="primary"
        size="icon"
        onClick={() => typeof page === "number" && onPageChange(page)}
        disabled={typeof page !== "number"}
        className={` ${
          page === currentPage ? "bg-[#EBEAF8]/8" : typeof page === "number"
        }`}
      >
        {page}
      </Button>
    ));
  };

  return (
    <div className="flex items-center lg:space-x-4 space-x-2">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        variant="primary"
        size="icon"
        className="disabled:bg-[#EBEAF8]/8"
        disabled={currentPage === 1}
      >
        <img src={ChevronLeft} aria-label="Anterior" />
      </Button>
      <div className="flex items-center lg:space-x-2 space-x-1 lg:text-base text-sm bg-white/10 ">
        {renderPageNumbers()}
      </div>
      <Button
        variant="primary"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:bg-[#EBEAF8]/8"
      >
        <img src={ChevronRight} aria-label="Próximo" />
      </Button>
    </div>
  );
}
