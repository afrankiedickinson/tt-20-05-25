import { DashboardContext } from "@/context/DashboardContext";
import { useParticipantPages } from "@/hooks/useParticipantPages";
import { useContext } from "react";

export interface PaginationProps {
  isLoading: boolean;
  handlePageChange: (newPage: number, next: boolean) => void;
}

export const Pagination = ({
  isLoading,
  handlePageChange,
}: PaginationProps) => {
  const { currentPageNumber, region, studyType, ageRange, dateRange } =
    useContext(DashboardContext);

  const { data: participants } = useParticipantPages(
    {
      numberOfRows: "50",
      currentPageNumber: currentPageNumber.toString(),
      region,
      studyType,
      ageRange,
      dateRange,
    },
    { staleTime: Infinity },
  );

  return (
    <div>
      <div className="flex justify-center p-4">
        <div className="flex items-center gap-x-2">
          <button
            type={"button"}
            className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={(event) => {
              event.preventDefault();
              handlePageChange(currentPageNumber - 1, false);
            }}
            disabled={currentPageNumber === 1}
          >
            Prev
          </button>
          <button
            type={"button"}
            disabled={isLoading || !participants?.data[currentPageNumber + 1]}
            className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={(event) => {
              event.preventDefault();
              handlePageChange(currentPageNumber + 1, true);
            }}
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex justify-center text-gray-700">
        {currentPageNumber} of {participants?.totalPages} Total Pages
      </div>
    </div>
  );
};
