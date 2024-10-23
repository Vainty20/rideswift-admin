import { Button, Pagination } from "react-daisyui";

export default function PaginationFilter({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <Pagination className="mt-4 w-fit flex justify-between items-center">
      <Button
        color="primary"
        className="text-white"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        color="primary"
        className="text-white"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Pagination>
  );
}
