import { useMemo, useState } from "react";
import { ITEMS_PER_PAGE } from "../constants/extension";

interface PaginationManager {
  totalLinks: number;
}

const usePaginationManager = ({ totalLinks }: PaginationManager) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = useMemo(
    () => (currentPage - 1) * ITEMS_PER_PAGE,
    [currentPage]
  );
  const endIndex = useMemo(() => currentPage * ITEMS_PER_PAGE, [currentPage]);
  const totalPages = useMemo(
    () => Math.ceil(totalLinks / ITEMS_PER_PAGE),
    [totalLinks]
  );

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);
  const visiblePages = useMemo(() => {
    return pages.filter((page) => {
      if (totalPages <= 5) return true;
      if (page == 1 || page == totalPages) return true;
      if (page >= currentPage - 1 && page <= currentPage + 1) return true;
      return false;
    });
  }, [currentPage, pages, totalPages]);

  return {
    startIndex,
    endIndex,
    currentPage,
    totalPages,
    setCurrentPage,
    goToNextPage,
    goToPrevPage,
    visiblePages,
  };
};

export default usePaginationManager;
