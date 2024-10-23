import { useEffect } from "react";

export const usePagination = (
  items,
  itemsPerPage,
  currentPage,
  setCurrentPage
) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [currentPage, itemsPerPage, totalPages, setCurrentPage]);

  return { currentItems, totalPages };
};
