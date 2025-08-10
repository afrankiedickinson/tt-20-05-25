import { DashboardContext } from "@/context/DashboardContext";
import { useParticipantPages } from "@/hooks/useParticipantPages";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    region,
    studyType,
    ageRange,
    dateRange,
    currentPageNumber,
    currentPage,
    setCurrentPage,
  } = useContext(DashboardContext);

  // Data fetching logic
  const { data: participants, isLoading } = useParticipantPages({
    numberOfRows: "50",
    currentPageNumber: currentPageNumber.toString(),
    region,
    studyType,
    ageRange,
    dateRange,
  });

  const firstParticipantExists = participants?.data.currentPage?.length > 0;

  const currentPageExists = currentPage?.length > 0;

  const loadingNewPage =
    firstParticipantExists &&
    currentPageExists &&
    currentPage[0].participantId !==
      participants.data.currentPage[0].participantId;

  const showLoading = isLoading && loadingNewPage;

  useEffect(() => {
    if (participants && (loadingNewPage || !currentPage)) {
      setCurrentPage(participants?.data.currentPage);
    }
  }, [participants, isLoading]);

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", "1"); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  // Handler to update URL param for page navigation
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);

    setCurrentPage(participants.data.nextPage);
  };

  // Return all the state and functions needed by the UI
  return {
    showLoading,
    handleFilterChange,
    handlePageChange,
    currentPage,
    currentPageNumber,
  };
};
