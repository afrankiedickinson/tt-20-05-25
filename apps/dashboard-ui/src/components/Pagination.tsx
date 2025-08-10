import { DashboardContext } from "@/context/DashboardContext";
import { useContext } from "react";

export interface PaginationProps {
  isLoading: boolean;
  handlePageChange: (newPage: number) => void;
}

export const Pagination = ({
  isLoading,
  handlePageChange,
}: PaginationProps) => {
  const { currentPageNumber, currentPage } = useContext(DashboardContext);

  // Handler to update URL param for page navigation
  return (
    <div className="flex justify-center p-4">
      <div className="flex items-center gap-x-2">
        <button
          className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handlePageChange(currentPageNumber - 1)}
          disabled={currentPageNumber === 1}
        >
          Prev
        </button>
        <button
          disabled={isLoading || !currentPage}
          className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handlePageChange(currentPageNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
