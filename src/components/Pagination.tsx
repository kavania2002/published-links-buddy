import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  visiblePages: number[];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  goToNextPage,
  goToPrevPage,
  visiblePages,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-1 py-4">
      <button
        onClick={() => goToPrevPage()}
        disabled={currentPage == 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent">
        <ChevronLeft className="h-4 w-4" />
      </button>

      {visiblePages.map((page, index) => {
        const isGap = index > 0 && visiblePages[index - 1] < page - 1;

        return (
          <React.Fragment key={page}>
            {isGap && <span className="px-2 py-1 text-gray-400">...</span>}
            <button
              onClick={() => onPageChange(page)}
              className={`min-w-[2.5rem] h-10 px-4 rounded-lg font-medium transition-colors ${
                currentPage === page
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}>
              {page}
            </button>
          </React.Fragment>
        );
      })}

      <button
        onClick={() => goToNextPage()}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
