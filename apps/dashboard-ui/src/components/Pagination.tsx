export interface PaginationProps {
  currentPageNumber: number;
  handlePageChange: (newPage: number) => void;
  isLoading: boolean;
  participants: any;
}

export const Pagination = ({
  currentPageNumber,
  handlePageChange,
  isLoading,
  participants,
}: PaginationProps) => (
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
        disabled={isLoading || !participants.data.nextPage}
        className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => handlePageChange(currentPageNumber + 1)}
      >
        Next
      </button>
    </div>
  </div>
);
