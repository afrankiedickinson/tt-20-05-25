import { DashboardContext } from "@/context/DashboardContext";
import { useParticipantPages } from "@/hooks/useParticipantPages";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";

export const useDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { region, studyType, ageRange, dateRange, currentPageNumber } =
    useContext(DashboardContext);

  const { isLoading } = useParticipantPages({
    numberOfRows: "50",
    currentPageNumber: currentPageNumber.toString(),
    region,
    studyType,
    ageRange,
    dateRange,
  });

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number, next: boolean) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  // Return all the state and functions needed by the UI
  return {
    handleFilterChange,
    handlePageChange,
    currentPageNumber,
    isLoading,
  };
};
